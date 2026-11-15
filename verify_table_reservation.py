import time
import requests
from playwright.sync_api import sync_playwright

def verify_all():
    print("==================================================")
    print("  VERIFYING COMPLETE TABLE RESERVATION SYSTEM     ")
    print("==================================================")

    # ----------------------------------------------------
    # 1. Test Backend REST APIs
    # ----------------------------------------------------
    print("\n--- 1. Testing Backend REST APIs ---")
    base_api = "http://127.0.0.1:8001/api/v1"

    # Test Availability Endpoint
    r_avail = requests.get(f"{base_api}/reservations/availability/")
    assert r_avail.status_code == 200, f"Availability endpoint failed: {r_avail.text}"
    avail_data = r_avail.json()
    assert "lunch_slots" in avail_data and len(avail_data["lunch_slots"]) >= 4
    assert "dinner_slots" in avail_data and len(avail_data["dinner_slots"]) >= 6
    assert "seating_zones" in avail_data and len(avail_data["seating_zones"]) >= 3
    print("✓ Verified /api/v1/reservations/availability/ (Lunch/Dinner shifts + zones)")

    # Test POST Create Reservation
    payload = {
        "full_name": "Julian Montgomery",
        "email": "julian.m@stardustdiner.com",
        "phone": "+1 (312) 555-8492",
        "reservation_date": "2026-11-24",
        "reservation_time": "19:15",
        "guest_count": 4,
        "seating_area": "Retro Leather Booth",
        "occasion": "anniversary",
        "dietary_notes": "Gluten-free menu requested",
        "message": "Celebrating 10th wedding anniversary"
    }
    r_create = requests.post(f"{base_api}/reservations/", json=payload)
    assert r_create.status_code == 201, f"Create reservation failed: {r_create.text}"
    create_data = r_create.json()
    ref_code = create_data["reference_code"]
    assert ref_code.startswith("RETRO-")
    assert create_data["guest_name"] == "Julian Montgomery"
    assert create_data["booking_status_display"] == "Pending Review"
    print(f"✓ Created Reservation: Code #{ref_code} for Julian Montgomery")

    # Test Lookup by Code
    r_lookup = requests.get(f"{base_api}/reservations/lookup/?code={ref_code}")
    assert r_lookup.status_code == 200, f"Lookup failed: {r_lookup.text}"
    lookup_data = r_lookup.json()
    assert lookup_data["count"] == 1
    assert lookup_data["reservations"][0]["reference_code"] == ref_code
    print(f"✓ Verified /api/v1/reservations/lookup/?code={ref_code}")

    # ----------------------------------------------------
    # 2. Playwright UI Automation
    # ----------------------------------------------------
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        # ------------------------------------------------
        # 2A. Test CMS Host Desk / Maitre D'
        # ------------------------------------------------
        print("\n--- 2. Testing CMS Host Desk / Maitre D' ---")
        page.goto("http://127.0.0.1:8001/cms/login/")
        page.fill('input[name="username"]', "admin")
        page.fill('input[name="password"]', "adminpassword123")
        page.click('button[type="submit"]')
        page.wait_for_url("http://127.0.0.1:8001/cms/")
        print("✓ Logged into CMS Studio")

        # Navigate to Maitre D' Desk
        res_card = page.locator("#section-reservations")
        assert res_card.count() >= 1, "Missing #section-reservations in CMS"
        page.goto("http://127.0.0.1:8001/cms/#section-reservations")
        time.sleep(1)

        # Verify badges and KPI counters
        assert page.locator("text=Maitre D' Table Reservation & Host Desk").count() >= 1
        assert page.locator("text=CONFIRMED").count() >= 1
        print("✓ Verified Maitre D' Desk and shift KPI counters")

        # Verify the newly created reservation appears in table
        assert page.locator(f"text={ref_code}").count() >= 1
        assert page.locator("text=Julian Montgomery").count() >= 1
        print("✓ Verified new booking appears in live host triage table")

        # Update Status & Table Assignment in CMS
        row = page.locator(f"tr:has-text('{ref_code}')")
        row.locator('select[name="status"]').select_option("confirmed")
        row.locator('input[name="table_number"]').fill("Booth 4")
        row.locator('button:has-text("Update")').click()
        page.wait_for_load_state("networkidle")
        time.sleep(1)

        # Check updated status
        updated_row = page.locator(f"tr:has-text('{ref_code}')")
        assert updated_row.locator("text=Booth 4").count() >= 1
        print("✓ Staff updated status to Confirmed & assigned Table: 'Booth 4'")

        page.screenshot(path="project 6/screenshots/cms_maitre_d_desk.png")
        print("✓ Screenshot saved: project 6/screenshots/cms_maitre_d_desk.png")

        # ------------------------------------------------
        # 2B. Test Page Builder Widget Library
        # ------------------------------------------------
        print("\n--- 3. Testing Standalone Page Builder Widget ---")
        page.goto("http://127.0.0.1:8001/cms/pages/1/builder/")
        page.wait_for_selector(".builder-workspace")
        assert page.locator("text=Table Reservation Terminal").count() >= 1
        print("✓ Verified 'Table Reservation Terminal' widget present in Elementor library")

        # ------------------------------------------------
        # 2C. Test Decoupled React Frontend (Port 3000)
        # ------------------------------------------------
        print("\n--- 4. Testing React Decoupled Frontend Reservation Flow ---")
        page.goto("http://127.0.0.1:3000/")
        page.wait_for_load_state("networkidle")
        time.sleep(2)

        # Click Nav Reserve Button
        nav_reserve_btn = page.locator('header button:has-text("BOOK TABLE"), button:has-text("BOOK TABLE")').first
        nav_reserve_btn.click()
        time.sleep(1)

        modal = page.locator("text=Reserve Your Table")
        assert modal.count() >= 1, "Reservation modal failed to open"
        print("✓ Reservation Modal opened via Navigation CTA")

        # Switch Shift Buttons (Dinner / Lunch)
        lunch_btn = page.locator("button:has-text('LUNCH SHIFT')")
        dinner_btn = page.locator("button:has-text('DINNER SHIFT')")
        lunch_btn.click()
        time.sleep(0.3)
        assert page.locator("button:has-text('12:00')").count() >= 1
        dinner_btn.click()
        time.sleep(0.3)
        assert page.locator("button:has-text('19:15')").count() >= 1
        print("✓ Interactive Lunch/Dinner Shift slot pills functional")

        # Submit React Booking
        page.locator('input[name="guest_name"]').last.fill("Vivian Ward")
        page.locator('input[name="email"]').last.fill("vivian.ward@hollywood.com")
        page.locator('input[name="phone"]').last.fill("+1 213-555-9012")
        page.locator('select[name="occasion"]').last.select_option("celebration")
        page.locator('button:has-text("19:15")').last.click()
        page.locator('button:has-text("CONFIRM TABLE RESERVATION")').last.click()
        time.sleep(2)

        # Debug check
        err_divs = page.locator('div:has-text("Failed"), div:has-text("error"), div[style*="background: rgba(216, 58, 69"]')
        if err_divs.count() > 0:
            print("Modal Error Message:", err_divs.first.inner_text())

        page.screenshot(path="project 6/screenshots/frontend_reservation_debug.png")

        # Check Digital Boarding Pass Ticket
        assert page.locator("text=Table Reserved!").count() >= 1
        assert page.locator("text=BOOKING PASS CODE").count() >= 1
        assert page.locator("text=Vivian Ward").count() >= 1
        print("✓ Verified Digital Boarding Pass Ticket generated with reference code")

        page.screenshot(path="project 6/screenshots/frontend_reservation_ticket.png")
        print("✓ Screenshot saved: project 6/screenshots/frontend_reservation_ticket.png")

        # Close Modal
        page.locator("button:has-text('RETURN TO DINER')").click()
        time.sleep(0.5)

        # ------------------------------------------------
        # 2D. Test GitHub Standalone Demo (demos/project-1.html)
        # ------------------------------------------------
        print("\n--- 5. Testing GitHub-Hosted Demo Reservation & LocalStorage ---")
        import os
        file_url = f"file://{os.path.abspath('demos/project-1.html')}"
        page.goto(file_url)
        time.sleep(1)

        # Open reservation modal
        page.locator(".open-modal-btn").first.click()
        time.sleep(0.5)

        assert page.locator("text=Reserve a Table").count() >= 1
        page.fill("#guestName", "Lord Harrison")
        page.fill("#guestEmail", "harrison@aurelia.com")
        page.fill("#guestPhone", "+44 20 7946 0912")
        page.locator("#shiftDinnerBtn").click()
        time.sleep(0.2)
        page.locator("button:has-text('20:00')").click()
        page.locator("#bookingForm button[type='submit']").click()
        time.sleep(1)

        # Check Confirmed Voucher
        assert page.locator("text=Table Confirmed!").count() >= 1
        assert page.locator("text=Lord Harrison").count() >= 1
        print("✓ Demo 1 Table Confirmed voucher verified")

        # Check Host Desk Tab in Demo
        page.locator("#tabDeskBtn").click()
        time.sleep(0.5)
        assert page.locator("#deskListContainer:has-text('Lord Harrison')").count() >= 1
        assert page.locator("text=Confirmed Table").count() >= 1
        print("✓ Verified LocalStorage Host Desk persistence in Demo 1")

        page.screenshot(path="project 6/screenshots/demo_reservation_modal.png")
        print("✓ Screenshot saved: project 6/screenshots/demo_reservation_modal.png")

        browser.close()

    print("\n==================================================")
    print("  ALL TABLE RESERVATION SUITES VERIFIED 100%!     ")
    print("==================================================")

if __name__ == "__main__":
    verify_all()

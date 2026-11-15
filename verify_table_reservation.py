import time
import os
import requests
from playwright.sync_api import sync_playwright

def verify_all():
    print("==================================================")
    print("  VERIFYING TWO-STAGE REQUEST & APPROVAL SYSTEM   ")
    print("==================================================")

    base_api = "http://127.0.0.1:8001/api/v1"

    # ----------------------------------------------------
    # 1. Test Backend REST APIs
    # ----------------------------------------------------
    print("\n--- 1. Testing Backend REST APIs ---")

    # Test Availability Endpoint
    r_avail = requests.get(f"{base_api}/reservations/availability/")
    assert r_avail.status_code == 200, f"Availability endpoint failed: {r_avail.text}"
    avail_data = r_avail.json()
    assert "lunch_slots" in avail_data and len(avail_data["lunch_slots"]) >= 4
    assert "dinner_slots" in avail_data and len(avail_data["dinner_slots"]) >= 6
    assert "seating_zones" in avail_data and len(avail_data["seating_zones"]) >= 3
    print("✓ Verified /api/v1/reservations/availability/ (Lunch/Dinner shifts + zones)")

    # Test POST Create Reservation Request
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
    assert "pending" in create_data["booking_status"].lower()
    print(f"✓ Created Reservation Request: Code #{ref_code} for Julian Montgomery (Status: Pending Approval)")

    # Test Initial Lookup (Should be Pending)
    r_lookup = requests.get(f"{base_api}/reservations/lookup/?code={ref_code}")
    assert r_lookup.status_code == 200, f"Lookup failed: {r_lookup.text}"
    lookup_data = r_lookup.json()
    assert lookup_data["count"] == 1
    assert lookup_data["reservations"][0]["reference_code"] == ref_code
    assert lookup_data["reservations"][0]["status"] == "pending"
    print(f"✓ Verified /api/v1/reservations/lookup/ confirms 'pending' status for #{ref_code}")

    # ----------------------------------------------------
    # 2. Playwright UI Automation
    # ----------------------------------------------------
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        # ------------------------------------------------
        # 2A. Test CMS Host Desk: 1-Click Approve
        # ------------------------------------------------
        print("\n--- 2. Testing CMS Host Desk (1-Click Approval) ---")
        page.goto("http://127.0.0.1:8001/cms/login/")
        page.fill('input[name="username"]', "admin")
        page.fill('input[name="password"]', "adminpassword123")
        page.click('button[type="submit"]')
        page.wait_for_url("http://127.0.0.1:8001/cms/")
        print("✓ Logged into CMS Studio")

        page.goto("http://127.0.0.1:8001/cms/#section-reservations")
        time.sleep(1)

        # Verify incoming request row
        row = page.locator(f"tr:has-text('{ref_code}')")
        assert row.count() >= 1, f"Row for {ref_code} not found in CMS"
        assert row.locator("text=Julian Montgomery").count() >= 1
        print(f"✓ Request #{ref_code} visible in CMS Host Desk table")

        # Click the 1-Click Approve Button
        approve_btn = row.locator('button:has-text("APPROVE")')
        assert approve_btn.count() >= 1, "Missing 1-click Approve button"
        approve_btn.click()
        page.wait_for_load_state("networkidle")
        time.sleep(1)

        # Verify row updated to Confirmed
        updated_row = page.locator(f"tr:has-text('{ref_code}')")
        assert updated_row.locator("text=CONFIRMED").count() >= 1
        print(f"✓ Clicked [✓ APPROVE]: Request #{ref_code} successfully approved & confirmed by restaurant!")

        page.screenshot(path="project 6/screenshots/cms_approval_workflow.png")
        print("✓ Screenshot saved: project 6/screenshots/cms_approval_workflow.png")

        # ------------------------------------------------
        # 2B. Test Guest Verification after Approval
        # ------------------------------------------------
        print("\n--- 3. Testing Guest Verification API After Approval ---")
        r_lookup_after = requests.get(f"{base_api}/reservations/lookup/?code={ref_code}")
        assert r_lookup_after.status_code == 200
        approved_item = r_lookup_after.json()["reservations"][0]
        assert approved_item["status"] == "confirmed"
        print(f"✓ Guest lookup now returns confirmed status: {approved_item['status_display']}")

        # ------------------------------------------------
        # 2C. Test Decoupled React Frontend (Port 3000)
        # ------------------------------------------------
        print("\n--- 4. Testing React Frontend (Request & Lookup Tabs) ---")
        page.goto("http://127.0.0.1:3000/")
        page.wait_for_load_state("networkidle")
        time.sleep(2)

        # Open Modal
        nav_reserve_btn = page.locator('header button:has-text("BOOK TABLE"), button:has-text("BOOK TABLE")').first
        nav_reserve_btn.click()
        time.sleep(1)

        assert page.locator("text=Request a Table Reservation").count() >= 1
        print("✓ Opened 'Request a Table Reservation' modal on React frontend")

        # Submit a new guest request
        page.locator('input[name="guest_name"]').last.fill("Vivian Ward")
        page.locator('input[name="email"]').last.fill("vivian.ward@hollywood.com")
        page.locator('input[name="phone"]').last.fill("+1 213-555-9012")
        page.locator('select[name="occasion"]').last.select_option("celebration")
        page.locator('button:has-text("19:15")').last.click()
        page.locator('button:has-text("SUBMIT RESERVATION REQUEST")').last.click()
        time.sleep(2)

        # Verify Pending Voucher
        assert page.locator("text=Reservation Request Submitted!").count() >= 1
        assert page.locator("text=PENDING APPROVAL").count() >= 1
        assert page.locator("text=Vivian Ward").count() >= 1
        print("✓ Guest received request voucher with 'PENDING APPROVAL'")

        page.screenshot(path="project 6/screenshots/frontend_request_voucher.png")

        # Test Track/Lookup Tab with the previously approved booking
        lookup_tab = page.locator('button:has-text("TRACK APPROVAL STATUS"), button:has-text("LOOKUP EXISTING BOOKING")').first
        lookup_tab.click()
        time.sleep(0.5)

        page.locator('input[placeholder*="Reference Code"]').fill(ref_code)
        page.locator('button[type="submit"]:has-text("LOOKUP")').click()
        time.sleep(1.5)

        assert page.locator("text=APPROVED BY RESTAURANT!").count() >= 1
        assert page.locator("text=Julian Montgomery").count() >= 1
        assert page.locator("button:has-text('Download Calendar Event')").count() >= 1
        print(f"✓ Guest looked up #{ref_code}: Shows 'APPROVED BY RESTAURANT!' with calendar sync")

        page.screenshot(path="project 6/screenshots/frontend_approved_lookup.png")
        print("✓ Screenshot saved: project 6/screenshots/frontend_approved_lookup.png")

        # ------------------------------------------------
        # 2D. Test GitHub Standalone Demo (demos/project-1.html)
        # ------------------------------------------------
        print("\n--- 5. Testing GitHub-Hosted Demo (Request & Host Desk Approval) ---")
        demo_url = f"file://{os.path.abspath('demos/project-1.html')}"
        page.goto(demo_url)
        time.sleep(1)

        # Open reservation modal
        page.locator(".open-modal-btn").first.click()
        time.sleep(0.5)

        assert page.locator("text=Request Table Reservation").count() >= 1
        page.fill("#guestName", "Lord Harrison")
        page.fill("#guestEmail", "harrison@aurelia.com")
        page.fill("#guestPhone", "+44 20 7946 0912")
        page.locator("#shiftDinnerBtn").click()
        time.sleep(0.2)
        page.locator("button:has-text('20:00')").click()
        page.locator("#bookingForm button[type='submit']").click()
        time.sleep(1)

        # Check Pending Request Voucher
        assert page.locator("text=Reservation Request Submitted!").count() >= 1
        assert page.locator("text=Pending Restaurant Approval").count() >= 1
        print("✓ Demo 1: Request submitted, status is 'Pending Restaurant Approval'")

        # Click Open Host Desk
        page.locator("#btnGoToDesk").click()
        time.sleep(0.5)

        # Verify Lord Harrison is in Host Desk as Pending
        desk_container = page.locator("#deskListContainer")
        assert desk_container.locator("text=Lord Harrison").count() >= 1
        assert desk_container.locator("text=PENDING APPROVAL").count() >= 1
        print("✓ Demo 1 Host Desk: Lord Harrison listed as 'PENDING APPROVAL'")

        # Click "Approve Request"
        approve_req_btn = desk_container.locator(".btn-approve-req").first
        approve_req_btn.click()
        time.sleep(0.5)

        # Verify updated status in Host Desk
        assert desk_container.locator("text=APPROVED").count() >= 1
        print("✓ Demo 1 Host Desk: Clicked [✓ Approve Request], state instantly transitioned to APPROVED!")

        page.screenshot(path="project 6/screenshots/demo_host_approval.png")
        print("✓ Screenshot saved: project 6/screenshots/demo_host_approval.png")

        browser.close()

    print("\n==================================================")
    print("  ALL TWO-STAGE APPROVAL WORKFLOWS VERIFIED 100%! ")
    print("==================================================")

if __name__ == "__main__":
    verify_all()

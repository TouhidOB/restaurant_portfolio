import time
import os
from playwright.sync_api import sync_playwright

def verify_shift_filters():
    print("==================================================")
    print("  VERIFYING TABLE DATA FILTER: LUNCH & DINNER     ")
    print("==================================================")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        # ------------------------------------------------
        # 1. Login to CMS Studio
        # ------------------------------------------------
        print("\n--- 1. Logging into CMS Studio ---")
        page.goto("http://127.0.0.1:8001/cms/login/")
        page.fill('input[name="username"]', "admin")
        page.fill('input[name="password"]', "adminpassword123")
        page.click('button[type="submit"]')
        page.wait_for_url("http://127.0.0.1:8001/cms/")
        print("✓ Logged into CMS Studio")

        page.goto("http://127.0.0.1:8001/cms/#section-reservations")
        time.sleep(1)

        # ------------------------------------------------
        # 2. Check Shift Filter Controls & KPI Badges
        # ------------------------------------------------
        print("\n--- 2. Checking Shift Filter UI & Counters ---")
        assert page.locator("text=SERVICE SHIFT:").count() >= 1
        assert page.locator("text=☀️ 4 LUNCH").count() >= 1
        assert page.locator("text=🌙 16 DINNER").count() >= 1

        all_shift_btn = page.locator('a:has-text("All Shifts")')
        lunch_shift_btn = page.locator('a:has-text("Lunch Shift")')
        dinner_shift_btn = page.locator('a:has-text("Dinner Shift")')

        assert all_shift_btn.count() >= 1
        assert lunch_shift_btn.count() >= 1
        assert dinner_shift_btn.count() >= 1
        print("✓ Verified shift filter buttons (All Shifts, Lunch Shift, Dinner Shift) and header badges")

        # ------------------------------------------------
        # 3. Filter by Lunch Shift
        # ------------------------------------------------
        print("\n--- 3. Testing Filter by Lunch Shift ---")
        lunch_shift_btn.click()
        page.wait_for_load_state("networkidle")
        time.sleep(1)

        assert "shift=lunch" in page.url
        # Eleanor Vance is 12:30 (Lunch)
        assert page.locator("text=Eleanor Vance").count() >= 1
        assert page.locator("text=Marcus Brody").count() >= 1
        # Check lunch badges
        assert page.locator("text=☀️ LUNCH").count() >= 4
        # Dinner-only reservations should be filtered out
        assert page.locator("text=Julian Montgomery").count() == 0
        print("✓ Filtered by Lunch Shift: Table shows ONLY lunch reservations (Eleanor Vance, Marcus Brody, etc.)")

        os.makedirs("project 6/screenshots", exist_ok=True)
        page.screenshot(path="project 6/screenshots/cms_lunch_filter.png")
        print("✓ Screenshot saved: project 6/screenshots/cms_lunch_filter.png")

        # ------------------------------------------------
        # 4. Filter by Dinner Shift
        # ------------------------------------------------
        print("\n--- 4. Testing Filter by Dinner Shift ---")
        dinner_shift_btn = page.locator('a:has-text("Dinner Shift")')
        dinner_shift_btn.click()
        page.wait_for_load_state("networkidle")
        time.sleep(1)

        assert "shift=dinner" in page.url
        assert page.locator("text=🌙 DINNER").count() >= 1
        assert page.locator("text=Julian Montgomery").count() >= 1
        # Lunch-only reservations (Marcus Brody, Dr. Aris Thorne) must be filtered out
        assert page.locator("text=Marcus Brody").count() == 0
        assert page.locator("text=Dr. Aris Thorne").count() == 0
        print("✓ Filtered by Dinner Shift: Table shows ONLY dinner reservations (Marcus Brody & Aris Thorne filtered out)")

        page.screenshot(path="project 6/screenshots/cms_dinner_filter.png")
        print("✓ Screenshot saved: project 6/screenshots/cms_dinner_filter.png")

        # ------------------------------------------------
        # 5. Combined Filter: Lunch + Pending
        # ------------------------------------------------
        print("\n--- 5. Testing Combined Filter: Lunch Shift + Pending Approval ---")
        # Switch back to lunch
        page.locator('a:has-text("Lunch Shift")').click()
        page.wait_for_load_state("networkidle")
        time.sleep(0.5)

        # Click Pending
        page.locator('#section-reservations a:has-text("Pending")').click()
        page.wait_for_load_state("networkidle")
        time.sleep(1)

        assert "shift=lunch" in page.url
        assert "res_filter=pending" in page.url
        # Marcus Brody is Pending Lunch
        assert page.locator("text=Marcus Brody").count() >= 1
        # Eleanor Vance is Confirmed Lunch, so should be filtered out
        assert page.locator("text=Eleanor Vance").count() == 0
        print("✓ Combined Filter (Lunch + Pending): Shows only pending lunch requests!")

        page.screenshot(path="project 6/screenshots/cms_lunch_pending_filter.png")
        print("✓ Screenshot saved: project 6/screenshots/cms_lunch_pending_filter.png")

        # ------------------------------------------------
        # 6. Test GitHub Demo Host Desk Shift Filter
        # ------------------------------------------------
        print("\n--- 6. Testing GitHub Demo Host Desk Shift Filter ---")
        demo_url = f"file://{os.path.abspath('demos/project-1.html')}"
        page.goto(demo_url)
        time.sleep(1)

        # Open reservation modal
        page.locator(".open-modal-btn").first.click()
        time.sleep(0.5)

        # Create a lunch booking
        page.fill("#guestName", "Lady Genevieve")
        page.fill("#guestEmail", "genevieve@aurelia.com")
        page.fill("#guestPhone", "+44 20 7946 0555")
        page.locator("#shiftLunchBtn").click()
        time.sleep(0.2)
        page.locator("button:has-text('12:30')").click()
        page.locator("#bookingForm button[type='submit']").click()
        time.sleep(0.5)

        # Open Host Desk
        page.locator("#btnGoToDesk").click()
        time.sleep(0.5)

        # Verify Shift Filter Buttons exist in Demo Host Desk
        desk_container = page.locator("#deskListContainer")
        assert page.locator(".desk-shift-pill").count() == 3

        # Click Lunch Shift in Demo
        page.locator('.desk-shift-pill[data-shift="lunch"]').click()
        time.sleep(0.3)
        assert desk_container.locator("text=Lady Genevieve").count() >= 1
        print("✓ Demo Host Desk: Filtered by Lunch Shift, shows Lady Genevieve (12:30)")

        # Click Dinner Shift in Demo
        page.locator('.desk-shift-pill[data-shift="dinner"]').click()
        time.sleep(0.3)
        # Lady Genevieve should be filtered out
        assert desk_container.locator("text=Lady Genevieve").count() == 0
        print("✓ Demo Host Desk: Filtered by Dinner Shift, lunch booking filtered out")

        page.screenshot(path="project 6/screenshots/demo_shift_filter.png")
        print("✓ Screenshot saved: project 6/screenshots/demo_shift_filter.png")

        browser.close()

    print("\n==================================================")
    print("  ALL LUNCH & DINNER FILTERS VERIFIED 100%!       ")
    print("==================================================")

if __name__ == "__main__":
    verify_shift_filters()

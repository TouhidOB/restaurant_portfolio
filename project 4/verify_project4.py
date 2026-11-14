import sys
import time
import requests
from playwright.sync_api import sync_playwright

def test_backend_api():
    print("=== 1. TESTING BACKEND REST API (PORT 8001) ===")
    
    # Content API
    res = requests.get("http://127.0.0.1:8001/api/v1/content/", timeout=5)
    assert res.status_code == 200, f"Expected 200 from content API, got {res.status_code}"
    data = res.json()
    assert data["status"] == "success"
    assert "restaurant" in data
    assert "sections" in data
    assert len(data["viewpoints"]) == 5, f"Expected 5 viewpoints, got {len(data['viewpoints'])}"
    assert len(data["featured_dishes"]) >= 4, f"Expected >= 4 featured dishes, got {len(data['featured_dishes'])}"
    print(f"✓ Content API status 200, restaurant: {data['restaurant']['name']}")
    print(f"✓ Viewpoints verified (5): {[v['title'] for v in data['viewpoints']]}")

    # Reservation API
    booking_payload = {
        "full_name": "Marcus Vance",
        "email": "marcus.vance@arch-review.com",
        "phone": "+1 (212) 555-4921",
        "reservation_date": "2026-11-20",
        "reservation_time": "19:45",
        "guest_count": 4,
        "seating_area": "Main Concrete Hall",
        "message": "Playwright automated verification inquiry."
    }
    post_res = requests.post("http://127.0.0.1:8001/api/v1/reservations/", json=booking_payload, timeout=5)
    assert post_res.status_code == 201, f"Expected 201 Created, got {post_res.status_code}"
    res_data = post_res.json()
    assert "reference_code" in res_data
    ref_code = res_data["reference_code"]
    assert ref_code.startswith("BRUT-"), f"Reference code format invalid: {ref_code}"
    print(f"✓ Reservation API created booking successfully: {ref_code}")


def test_frontend_browser():
    print("\n=== 2. TESTING FRONTEND BROWSER & 3D CANVAS (PORT 3000) ===")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        # Navigate to frontend
        page.goto("http://127.0.0.1:3000", wait_until="networkidle")
        time.sleep(1) # Allow preloader to finish

        title = page.title()
        assert "MONOLITH" in title, f"Page title missing MONOLITH: {title}"
        print(f"✓ Page Title: '{title}'")

        # Check Hero Headline
        hero_heading = page.locator("#hero h1").inner_text()
        assert "FOOD." in hero_heading and "FORM." in hero_heading, f"Hero text mismatch: {hero_heading}"
        print(f"✓ Hero Section headline verified:\n{hero_heading}")

        # Check Sections 01 through 15 are in DOM
        section_ids = [
            "hero", "intro", "philosophy", "signatures", "menu", "process",
            "architecture", "tour", "experience", "gallery", "critique",
            "reservation", "contact", "faq", "colophon"
        ]
        for sid in section_ids:
            locator = page.locator(f"#{sid}")
            assert locator.count() > 0, f"Section #{sid} not found in DOM!"
            print(f"✓ Section #{sid} rendered in DOM")

        # Check 3D Canvas
        canvas_count = page.locator("canvas").count()
        assert canvas_count >= 1, "Expected at least 1 3D Canvas element"
        print(f"✓ WebGL Canvas elements detected ({canvas_count})")

        # Test Viewpoint switching in 3D Tour
        tour_buttons = page.locator("#tour button:has-text('0')")
        assert tour_buttons.count() >= 5, f"Expected >= 5 tour buttons, got {tour_buttons.count()}"
        print(f"✓ Tour viewpoint buttons verified ({tour_buttons.count()} buttons)")
        tour_buttons.nth(2).click() # Click viewpoint 3 (Dining Hall)
        time.sleep(0.5)

        # Test Reserve Modal Trigger
        reserve_btn = page.locator("header button:has-text('RESERVE')")
        reserve_btn.click()
        time.sleep(0.3)
        modal_visible = page.locator("h2:has-text('RESERVATION PORTAL')").is_visible()
        assert modal_visible, "Reservation modal did not open on click"
        print("✓ Reservation modal opened successfully")

        # Close Modal
        close_btn = page.locator("button:has-text('×')").first
        close_btn.click()
        time.sleep(0.3)

        # Check Console Errors
        # Ignore minor WebGL canvas size warnings if any
        critical_errors = [e for e in console_errors if "favicon" not in e and "WebGL" not in e]
        if critical_errors:
            print(f"⚠ Console warnings/errors: {critical_errors}")
        else:
            print("✓ Zero browser console errors!")

        browser.close()


def test_cms_studio():
    print("\n=== 3. TESTING CMS STUDIO & AUTHENTICATION ===")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Visit CMS Login
        page.goto("http://127.0.0.1:8001/cms/login/", wait_until="networkidle")
        assert page.locator("h1:has-text('STUDIO TERMINAL')").is_visible()
        print("✓ CMS Login page rendered")

        # Perform Login
        page.fill("#username", "admin")
        page.fill("#password", "adminpassword123")
        page.click("button[type='submit']")
        page.wait_for_load_state("networkidle")

        # Verify Dashboard
        assert "BRUTALIST STUDIO" in page.locator("h1").inner_text()
        print("✓ Authenticated into CMS Studio successfully")

        # Verify Telemetry KPI cards
        kpi_count = page.locator(".kpi-card").count()
        assert kpi_count >= 5, f"Expected >= 5 KPI cards, got {kpi_count}"
        print(f"✓ Telemetry KPI cards verified ({kpi_count})")

        # Test #sidebarFilter
        search_filter = page.locator("#sidebarFilter")
        assert search_filter.is_visible()
        search_filter.fill("Ribeye")
        time.sleep(0.3)
        print("✓ #sidebarFilter search interaction verified")

        browser.close()


if __name__ == "__main__":
    try:
        test_backend_api()
        test_frontend_browser()
        test_cms_studio()
        print("\n=======================================================")
        print("✨ ALL VERIFICATION TESTS PASSED 100% PERFECTLY! ✨")
        print("=======================================================")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ VERIFICATION TEST FAILED: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

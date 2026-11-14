import urllib.request
import json
import sys
from playwright.sync_api import sync_playwright

def test_api():
    print("1. Testing Backend Public API (/api/v1/content/)...")
    req = urllib.request.Request("http://127.0.0.1:8001/api/v1/content/")
    with urllib.request.urlopen(req) as resp:
        assert resp.status == 200, f"Expected 200, got {resp.status}"
        data = json.loads(resp.read().decode('utf-8'))
        assert data["status"] == "success"
        assert "AURA MARINA" in data["settings"]["brand_name"]
        assert len(data["tour_viewpoints"]) == 5, f"Expected 5 tour viewpoints, got {len(data['tour_viewpoints'])}"
        assert len(data["menu_categories"]) >= 5, f"Expected >= 5 categories, got {len(data['menu_categories'])}"
        assert len(data["dining_spaces"]) == 4, f"Expected 4 dining spaces, got {len(data['dining_spaces'])}"
        print("✓ API content validation passed successfully!")

    print("2. Testing Reservation Creation Endpoint (/api/v1/reservations/)...")
    res_payload = json.dumps({
        "guest_name": "Verification Tester",
        "email": "test@auramarina.it",
        "phone": "+39 089 999 111",
        "party_size": 2,
        "reservation_date": "2026-07-15",
        "reservation_time": "20:00",
        "seating_preference": "The Belvedere Sea Terrace",
        "occasion": "Playwright Automated Test",
        "special_requests": "Automated verification test."
    }).encode('utf-8')
    post_req = urllib.request.Request(
        "http://127.0.0.1:8001/api/v1/reservations/",
        data=res_payload,
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(post_req) as post_resp:
        assert post_resp.status == 201, f"Expected 201, got {post_resp.status}"
        res_data = json.loads(post_resp.read().decode('utf-8'))
        ref = res_data["reference_code"]
        assert "MED-" in ref
        print(f"✓ Reservation created successfully with reference: {ref}")

def test_frontend_and_cms():
    print("3. Launching Playwright to test Frontend & CMS...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        print("   - Loading Frontend: http://127.0.0.1:3000/")
        page.goto("http://127.0.0.1:3000/", wait_until="networkidle", timeout=15000)
        page.wait_for_timeout(1000)

        # Check Page Title and Brand
        title = page.title()
        assert "AURA MARINA" in title, f"Unexpected title: {title}"
        print(f"   ✓ Page Title: {title}")

        # Check 3D Canvas presence
        canvases = page.locator("canvas").all()
        assert len(canvases) >= 1, "Expected at least 1 3D Canvas in Hero/Tour"
        print(f"   ✓ Found {len(canvases)} WebGL canvas elements.")

        # Check Sections presence
        for sec_id in ["hero", "story", "tour", "spaces", "signatures", "menu", "philosophy", "team", "events", "gallery", "testimonials", "reservations", "location"]:
            loc = page.locator(f"#{sec_id}")
            assert loc.count() > 0, f"Section #{sec_id} not found"
        print("   ✓ All 13 core editorial sections verified present on page!")

        # Test Dish Modal
        print("   - Testing Dish Modal interaction...")
        first_card = page.locator("#signatures .luxury-card").first
        first_card.click()
        page.wait_for_timeout(500)
        modal_header = page.locator(".modal-content h3")
        assert modal_header.count() > 0, "Dish modal did not appear"
        print(f"   ✓ Dish Detail Modal opened for: {modal_header.inner_text()}")
        # Close modal
        page.locator(".modal-content button").first.click()
        page.wait_for_timeout(300)

        # Test Reservation Modal
        print("   - Testing Reservation Modal interaction...")
        page.locator("header button:has-text('Reserve Table')").click()
        page.wait_for_timeout(500)
        assert page.locator(".modal-content form").count() > 0, "Reservation modal form did not appear"
        print("   ✓ Global Reservation Modal opened successfully!")
        page.locator(".modal-content button").first.click()
        page.wait_for_timeout(300)

        # Test CMS Studio Login & Dashboard
        print("   - Testing CMS Studio Dashboard: http://127.0.0.1:8001/cms/login/")
        page.goto("http://127.0.0.1:8001/cms/login/", wait_until="networkidle")
        page.fill("input[name='username']", "admin")
        page.fill("input[name='password']", "adminpassword123")
        page.click("button[type='submit']")
        page.wait_for_timeout(1000)

        # Verify on dashboard
        assert "/cms/" in page.url and "/login" not in page.url, f"Expected dashboard, got {page.url}"
        assert page.locator("#overview").count() > 0, "Dashboard KPI telemetry grid not found"
        assert page.locator("#tour-section").count() > 0, "Tour viewpoints manager not found"
        assert page.locator("#menu-section").count() > 0, "Menu manager not found"
        print(f"   ✓ CMS Studio Dashboard authenticated and verified: {page.url}")

        # Check for unhandled critical console errors on frontend
        critical_errors = [e for e in console_errors if "favicon" not in e and "status of 404" not in e]
        if critical_errors:
            print(f"   ⚠ Console warnings/errors: {critical_errors}")
        else:
            print("   ✓ Zero frontend console errors!")

        browser.close()
        print("✓ All automated end-to-end tests completed successfully!")

if __name__ == "__main__":
    try:
        test_api()
        test_frontend_and_cms()
        print("\n==========================================")
        print("🎉 ALL VERIFICATION CRITERIA PASSED! 100%")
        print("==========================================")
    except Exception as e:
        print(f"\n❌ Test failed: {e}", file=sys.stderr)
        sys.exit(1)

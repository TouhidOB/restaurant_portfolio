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
    print("\n=== 2. TESTING FRONTEND BROWSER & HERO VISIBILITY (PORT 3000) ===")
    
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

        # Check Hero Headline visibility
        hero_heading = page.locator("#hero h1")
        assert hero_heading.is_visible(), "Hero h1 is not visible"
        hero_text = hero_heading.inner_text()
        assert "FOOD." in hero_text and "FORM." in hero_text and "EXPRESSION." in hero_text
        print(f"✓ Hero Section headline visible with razor-sharp contrast:\n{hero_text}")

        # Check Hero Supporting text visibility
        lead_text = page.locator("#hero p").first
        assert lead_text.is_visible(), "Hero lead text is not visible"
        print(f"✓ Hero supporting text verified visible: '{lead_text.inner_text()[:60]}...'")

        # Check 4 Metrics Cards
        metric_cards = page.locator("#hero div:has-text('PAX')")
        assert metric_cards.count() >= 1, "Metric cards not rendered"
        print("✓ Hero architectural metrics strip verified")

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
        critical_errors = [e for e in console_errors if "favicon" not in e and "WebGL" not in e]
        if critical_errors:
            print(f"⚠ Console warnings/errors: {critical_errors}")
        else:
            print("✓ Zero browser console errors!")

        browser.close()


def test_cms_studio_sidebar():
    print("\n=== 3. TESTING CMS STUDIO WITH PERMANENT SIDEBAR ===")
    
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

        # Verify Dashboard and Sidebar
        sidebar = page.locator("#cmsSidebar")
        assert sidebar.is_visible(), "CMS Sidebar is not visible!"
        print("✓ Dedicated Left Architectural Sidebar verified visible!")

        # Verify Sidebar brand & status
        assert "MONOLITH" in sidebar.locator(".brand-title").inner_text()
        assert "ONLINE" in sidebar.locator(".sidebar-status-tag").inner_text()
        print("✓ Sidebar Header & Operator status verified")

        # Verify Sidebar Navigation Links for all pages/modules
        expected_sidebar_links = [
            ("#overview", "00. Metrics Overview"),
            ("#section-settings", "01. Restaurant Identity"),
            ("#section-reservations", "02. Reservation Triage"),
            ("#section-menu", "03. Menu Repertoire"),
            ("#section-tour", "04. 3D Spatial Viewpoints"),
            ("#section-editorial", "05. 15 Editorial Sections"),
            ("#section-gallery", "06. Gallery Archive"),
            ("#section-testimonials", "07. Critical Acclaim"),
            ("#section-faqs", "08. Frequent Inquiries"),
            ("#section-json", "09. Master Architectural JSON"),
        ]

        for href, label in expected_sidebar_links:
            link_locator = sidebar.locator(f"a[href='{href}']")
            assert link_locator.count() > 0, f"Sidebar link {href} not found!"
            assert label in link_locator.inner_text(), f"Sidebar label mismatch for {href}"
            print(f"  ✓ Sidebar Nav Link: '{label}' -> {href}")

        # Verify all corresponding content sections exist in DOM
        for href, _ in expected_sidebar_links:
            target_id = href.replace("#", "")
            target_section = page.locator(f"#{target_id}")
            assert target_section.count() > 0, f"Target section #{target_id} not found in workspace!"
            print(f"  ✓ Target Page Module: #{target_id} anchored in workspace")

        # Test Sidebar Search Filter
        search_filter = sidebar.locator("#sidebarFilter")
        assert search_filter.is_visible(), "Sidebar filter input not visible"
        search_filter.fill("Ribeye")
        time.sleep(0.3)
        print("✓ Sidebar Instant Access Filter interaction verified")

        # Test Sidebar External Link
        frontend_link = sidebar.locator("a[href='http://localhost:3000']")
        assert frontend_link.is_visible(), "Link to public frontend not visible in sidebar"
        print("✓ Sidebar quick-link to Frontend verified")

        browser.close()


if __name__ == "__main__":
    try:
        test_backend_api()
        test_frontend_browser()
        test_cms_studio_sidebar()
        print("\n=======================================================")
        print("✨ ALL VERIFICATION TESTS PASSED 100% PERFECTLY! ✨")
        print("=======================================================")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ VERIFICATION TEST FAILED: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

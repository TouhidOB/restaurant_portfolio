import os
import sys
import json
import urllib.request
import urllib.parse
from playwright.sync_api import sync_playwright

def test_api():
    print("--- 1. Testing Django Backend Endpoints (Port 8001) ---")
    
    # 1.1 Content Endpoint
    content_url = "http://127.0.0.1:8001/api/v1/content/"
    req = urllib.request.Request(content_url)
    with urllib.request.urlopen(req, timeout=10) as response:
        assert response.status == 200, f"Expected 200, got {response.status}"
        data = json.loads(response.read().decode())
        assert "restaurant" in data, "Missing 'restaurant' in content API"
        assert "sections" in data, "Missing 'sections' in content API"
        assert "categories" in data, "Missing 'categories' in content API"
        assert "viewpoints" in data, "Missing 'viewpoints' in content API"
        assert len(data["viewpoints"]) == 5, f"Expected 5 viewpoints, got {len(data['viewpoints'])}"
        print(f"✓ Content API OK: Restaurant '{data['restaurant']['name']}', {len(data['categories'])} categories, {len(data['viewpoints'])} viewpoints.")

    # 1.2 Reservation POST Endpoint
    res_url = "http://127.0.0.1:8001/api/v1/reservations/"
    payload = json.dumps({
        "guest_name": "Dr. Sophia Vance",
        "email": "sophia.vance@botanical-test.org",
        "phone": "+1 (305) 555-9102",
        "reservation_date": "2026-11-20",
        "reservation_time": "19:00",
        "party_size": 4,
        "preferred_zone": "TERRACE",
        "special_requests": "Verifying Playwright end-to-end reservation injection"
    }).encode('utf-8')
    req = urllib.request.Request(res_url, data=payload, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=10) as response:
        assert response.status == 201, f"Expected 201, got {response.status}"
        res_data = json.loads(response.read().decode())
        assert "reference_code" in res_data, "Missing reference code in response"
        print(f"✓ Reservation API OK: Code '{res_data['reference_code']}', Status '{res_data['status']}'")

def test_cms():
    print("\n--- 2. Testing CMS Studio Dashboard & Permanent Left Sidebar (Port 8001) ---")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Visit CMS Login
        page.goto("http://127.0.0.1:8001/cms/login/")
        page.wait_for_selector("input[name='username']")
        print("✓ CMS Login Page loaded successfully.")

        # Fill Login Credentials (admin / adminpassword123)
        page.fill("input[name='username']", "admin")
        page.fill("input[name='password']", "adminpassword123")
        page.click("button[type='submit']")

        # Wait for Dashboard
        page.wait_for_url("http://127.0.0.1:8001/cms/")
        page.wait_for_selector("#cmsSidebar")
        print("✓ CMS Dashboard loaded successfully.")

        # Verify Permanent Left Architectural Sidebar
        sidebar = page.locator("#cmsSidebar")
        assert sidebar.is_visible(), "CMS Sidebar is not visible"
        
        # Verify Filter Input
        filter_input = page.locator("#sidebarFilter")
        assert filter_input.is_visible(), "Sidebar filter input is not visible"
        print("✓ CMS Left Sidebar & #sidebarFilter verified.")

        # Verify Nav links exist
        nav_links = page.locator("#cmsSidebar nav a").all()
        print(f"✓ Found {len(nav_links)} navigation module anchors in left sidebar.")
        assert len(nav_links) >= 10, "Expected at least 10 sidebar module links"

        # Check Reservations Table contains our seeded/new reservation
        page.wait_for_selector("#section-reservations")
        body_text = page.locator("#section-reservations").inner_text()
        assert "Sophia Vance" in body_text, "Newly created reservation not listed in CMS reservations table"
        print("✓ Verified real-time reservation triage desk reflects new bookings.")

        # Screenshot CMS Dashboard
        os.makedirs("project 5/screenshots", exist_ok=True)
        page.screenshot(path="project 5/screenshots/cms_dashboard.png", full_page=True)
        print("✓ CMS Dashboard screenshot saved to project 5/screenshots/cms_dashboard.png")

        browser.close()

def test_frontend():
    print("\n--- 3. Testing Frontend Experience (Port 3000) ---")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        page.goto("http://127.0.0.1:3000/")
        page.wait_for_load_state("networkidle")

        # Verify Title & Brand
        brand_name = page.locator("header").inner_text()
        assert "VERDANT" in brand_name, "Brand 'VERDANT' not found in header"
        print("✓ Frontend Header & Brand 'VERDANT' confirmed.")

        # Verify Hero Section & 3D Canvas
        hero_heading = page.locator("#hero h1").inner_text()
        print(f"✓ Hero heading: '{hero_heading.replace(chr(10), ' ')}'")
        assert "WHERE" in hero_heading and "TABLE" in hero_heading, "Hero heading text mismatch"

        canvas = page.locator("canvas")
        assert canvas.count() >= 1, "3D Canvas not found on page"
        print(f"✓ Found {canvas.count()} 3D WebGL Canvas elements on page.")

        # Verify Sections exist
        sections = [
            "#hero", "#intro", "#philosophy", "#signatures", "#menu",
            "#story", "#architecture", "#tour", "#experience",
            "#gallery", "#testimonials", "#reservations", "#location",
            "#faqs", "footer"
        ]
        for sec in sections:
            loc = page.locator(sec)
            assert loc.count() > 0, f"Section {sec} missing from DOM"
        print(f"✓ All {len(sections)} page sections present in DOM.")

        # Test Category Switching in Menu Explorer
        category_buttons = page.locator("#menu button").all()
        if len(category_buttons) > 1:
            category_buttons[1].click()
            page.wait_for_timeout(300)
            print("✓ Category tab switching tested successfully.")

        # Test Dish Detail Modal
        first_dish_card = page.locator("#signatures .tropical-card").first
        first_dish_card.click()
        page.wait_for_timeout(400)
        dish_modal = page.locator("div[role='dialog'], [aria-label='Close dish preview']")
        assert dish_modal.count() > 0, "Dish detail modal did not open upon card click"
        print("✓ Dish detail modal triggered successfully.")
        # Close dish modal
        page.keyboard.press("Escape")
        page.wait_for_timeout(300)

        # Test Reservation Modal
        reserve_btn = page.locator("header button:has-text('RESERVE TABLE')")
        reserve_btn.click()
        page.wait_for_timeout(400)
        res_modal = page.locator("[aria-label='Close reservation dialog']")
        assert res_modal.count() > 0, "Reservation modal did not open upon header CTA click"
        print("✓ Reservation modal triggered successfully.")
        page.keyboard.press("Escape")
        page.wait_for_timeout(300)

        # Filter severe console errors (ignore WebGL standard vendor warnings if any)
        critical_errors = [e for e in console_errors if "favicon" not in e and "THREE" not in e and "404" not in e]
        print(f"✓ Console Errors: {len(critical_errors)} critical errors.")
        if critical_errors:
            print("Console error notices:", critical_errors)

        # Screenshot Homepage
        page.screenshot(path="project 5/screenshots/homepage_hero.png")
        print("✓ Homepage Hero screenshot saved to project 5/screenshots/homepage_hero.png")

        # Scroll to Tour and Screenshot
        page.locator("#tour").scroll_into_view_if_needed()
        page.wait_for_timeout(800)
        page.screenshot(path="project 5/screenshots/tour_section.png")
        print("✓ 3D Tour section screenshot saved to project 5/screenshots/tour_section.png")

        browser.close()

if __name__ == "__main__":
    print("==================================================")
    print("  PROJECT 5 VERIFICATION: VERDANT TROPICAL MODERN ")
    print("==================================================")
    try:
        test_api()
        test_cms()
        test_frontend()
        print("\n==================================================")
        print("  ALL VERIFICATION CHECKS PASSED PERFECTLY!       ")
        print("==================================================")
    except Exception as e:
        print(f"\n❌ Verification failed: {e}")
        sys.exit(1)

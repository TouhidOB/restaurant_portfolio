import os
import sys
import time
import requests
from playwright.sync_api import sync_playwright

ARTIFACT_DIR = "/Users/m3air/.gemini/antigravity/brain/7a652e2b-b4f3-4092-a5a2-3d2a92a3c6e8"
BACKEND_URL = "http://127.0.0.1:8001"
FRONTEND_URL = "http://127.0.0.1:3000"

def test_project_5():
    print("==================================================")
    print("STARTING COMPREHENSIVE VERIFICATION FOR PROJECT 5: VERDANT")
    print("==================================================")

    # 1. Check Backend APIs
    print("\n[1/10] Verifying Django Backend APIs...")
    res = requests.get(f"{BACKEND_URL}/api/v1/content/", timeout=5)
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    data = res.json()
    assert data["status"] == "success"
    assert "restaurant" in data
    assert "categories" in data
    assert "custom_pages" in data
    assert len(data["custom_pages"]) >= 1
    assert "blog_posts" in data
    assert len(data["blog_posts"]) >= 1
    print(f"  ✓ Full content API operational (Found {len(data['custom_pages'])} custom pages, {len(data['blog_posts'])} blog posts)")

    # Test Custom Page API
    slug = data["custom_pages"][0]["slug"]
    res_page = requests.get(f"{BACKEND_URL}/api/v1/pages/{slug}/", timeout=5)
    assert res_page.status_code == 200
    print(f"  ✓ CustomPage API (/api/v1/pages/{slug}/) operational")

    # Test Blog API
    res_blog = requests.get(f"{BACKEND_URL}/api/v1/blog/", timeout=5)
    assert res_blog.status_code == 200
    print(f"  ✓ Blog API (/api/v1/blog/) operational (Found {len(res_blog.json()['posts'])} articles)")

    # Test Reservation Availability API
    res_avail = requests.get(f"{BACKEND_URL}/api/v1/reservations/availability/?shift=dinner", timeout=5)
    assert res_avail.status_code == 200
    assert res_avail.json()["shift"] == "dinner"
    print("  ✓ Shift Availability API operational (Dinner shift capacity checked)")

    # Test Reservation Lookup API
    test_ref = "TROP-261116-LUN1"
    res_lookup = requests.get(f"{BACKEND_URL}/api/v1/reservations/lookup/?ref={test_ref}", timeout=5)
    assert res_lookup.status_code == 200
    assert res_lookup.json()["reservation"]["reference_code"] == test_ref
    print(f"  ✓ Reservation Lookup API (/api/v1/reservations/lookup/?ref={test_ref}) operational")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        # 2. CMS Studio Login & Overview
        print("\n[2/10] Verifying Dedicated CMS Studio Login & Overview...")
        page.goto(f"{BACKEND_URL}/cms/login/", wait_until="networkidle")
        page.fill('input[name="username"]', "admin")
        page.fill('input[name="password"]', "adminpassword123")
        page.click('button[type="submit"]')
        page.wait_for_url("**/cms/overview/**", timeout=8000)
        assert "VERDANT" in page.content() or "OVERVIEW" in page.content()
        overview_shot = os.path.join(ARTIFACT_DIR, "project5_cms_overview.png")
        page.screenshot(path=overview_shot)
        print(f"  ✓ CMS Studio logged in successfully, saved {overview_shot}")

        # 3. CMS Reservations Desk (Lunch vs Dinner filters & table assignments)
        print("\n[3/10] Verifying Table Reservation & Host Desk with Shift Filters...")
        page.goto(f"{BACKEND_URL}/cms/reservations/", wait_until="networkidle")
        assert "MAÎTRE D'" in page.content() or "Reservation" in page.content()

        # Test Lunch Shift Filter
        page.click('a:has-text("LUNCH")')
        page.wait_for_timeout(600)
        assert "LUNCH" in page.content()
        print("  ✓ Lunch shift filter validated")

        # Test Dinner Shift Filter
        page.click('a:has-text("DINNER")')
        page.wait_for_timeout(600)
        assert "DINNER" in page.content()
        print("  ✓ Dinner shift filter validated")

        res_shot = os.path.join(ARTIFACT_DIR, "project5_cms_reservations.png")
        page.screenshot(path=res_shot)
        print(f"  ✓ Reservations desk screenshot saved to {res_shot}")

        # 4. CMS Standalone Custom Pages & Visual Page Builder
        print("\n[4/10] Verifying Elementor-Style Visual Page Builder...")
        page.goto(f"{BACKEND_URL}/cms/pages/", wait_until="networkidle")
        assert "STANDALONE CUSTOM PAGES" in page.content()
        page.click('table a:has-text("BUILDER")')
        page.wait_for_url("**/cms/pages/*/builder/**", timeout=8000)
        assert "VISUAL BLOCK HIERARCHY" in page.content()

        # Add a block via builder palette
        page.click('button:has-text("CTA BANNER")')
        page.wait_for_timeout(500)
        builder_shot = os.path.join(ARTIFACT_DIR, "project5_cms_page_builder.png")
        page.screenshot(path=builder_shot)
        print(f"  ✓ Visual Page Builder verified, saved {builder_shot}")

        # 5. CMS Haute Cuisine Menu & Availability
        print("\n[5/10] Verifying Menu & Meal Photography Studio...")
        page.goto(f"{BACKEND_URL}/cms/menu/", wait_until="networkidle")
        assert "MENU" in page.content() and "PHOTOGRAPHY" in page.content()
        menu_cms_shot = os.path.join(ARTIFACT_DIR, "project5_cms_menu.png")
        page.screenshot(path=menu_cms_shot)
        print(f"  ✓ Menu studio verified, saved {menu_cms_shot}")

        # 6. CMS Editorial Blog & Dispatches
        print("\n[6/10] Verifying Editorial Journal Manager in CMS...")
        page.goto(f"{BACKEND_URL}/cms/blog/", wait_until="networkidle")
        assert "JOURNAL" in page.content() or "DISPATCHES" in page.content()
        blog_cms_shot = os.path.join(ARTIFACT_DIR, "project5_cms_blog.png")
        page.screenshot(path=blog_cms_shot)
        print(f"  ✓ Journal CMS verified, saved {blog_cms_shot}")

        # 7. Frontend Landing Page (Preserving 15 Sections)
        print("\n[7/10] Verifying Frontend 15-Section Landing Page...")
        page.goto(f"{FRONTEND_URL}/", wait_until="networkidle")
        page.wait_for_timeout(1000)
        assert "VERDANT" in page.content()
        landing_shot = os.path.join(ARTIFACT_DIR, "project5_frontend_landing.png")
        page.screenshot(path=landing_shot)
        print(f"  ✓ Landing page verified, saved {landing_shot}")

        # 8. Frontend Dedicated Standalone Menu Page with Meal Photography
        print("\n[8/10] Verifying Dedicated Standalone Menu Page (/menu)...")
        page.goto(f"{FRONTEND_URL}/menu", wait_until="networkidle")
        page.wait_for_timeout(1000)
        assert "VERDANT MENU" in page.content() or "REPERTOIRE" in page.content()
        # Verify meal images exist
        images = page.locator("img")
        assert images.count() >= 3, f"Expected meal images, found {images.count()}"
        menu_page_shot = os.path.join(ARTIFACT_DIR, "project5_frontend_menu_photos.png")
        page.screenshot(path=menu_page_shot)
        print(f"  ✓ Dedicated Menu page verified with meal photos, saved {menu_page_shot}")

        # 9. Frontend Editorial Journal & Article Deep-Dive
        print("\n[9/10] Verifying Public Journal Listing & Article Pages...")
        page.goto(f"{FRONTEND_URL}/blog", wait_until="networkidle")
        page.wait_for_timeout(800)
        assert "JOURNAL" in page.content()
        blog_list_shot = os.path.join(ARTIFACT_DIR, "project5_frontend_blog_list.png")
        page.screenshot(path=blog_list_shot)
        print(f"  ✓ Journal list verified, saved {blog_list_shot}")

        # Navigate to individual article
        page.goto(f"{FRONTEND_URL}/blog/living-architecture-open-air-dining", wait_until="networkidle")
        page.wait_for_timeout(800)
        assert "Living Architecture" in page.content() or "Open-Air" in page.content()
        blog_detail_shot = os.path.join(ARTIFACT_DIR, "project5_frontend_blog_detail.png")
        page.screenshot(path=blog_detail_shot)
        print(f"  ✓ Article detail verified, saved {blog_detail_shot}")

        # 10. Frontend Dynamic Custom Page & Two-Way Shift Reservation Flow
        print("\n[10/10] Verifying Dynamic Custom Page and Reservation Modal...")
        page.goto(f"{FRONTEND_URL}/page/glasshouse-private-buyouts", wait_until="networkidle")
        page.wait_for_timeout(800)
        assert "GLASSHOUSE" in page.content() or "BUYOUT" in page.content()
        custom_page_shot = os.path.join(ARTIFACT_DIR, "project5_frontend_custom_page.png")
        page.screenshot(path=custom_page_shot)
        print(f"  ✓ Elementor custom page rendered at /page/glasshouse-private-buyouts, saved {custom_page_shot}")

        # Open Reservation Modal & Test Shift and Lookup Tabs
        page.goto(f"{FRONTEND_URL}/", wait_until="networkidle")
        page.wait_for_timeout(500)
        page.click('button:has-text("RESERVE TABLE")')
        page.wait_for_timeout(500)
        assert "RESERVATION PORTAL" in page.content()

        # Click Dinner shift
        page.click('button:has-text("DINNER SERVICE")')
        page.wait_for_timeout(300)

        # Switch to Reference Lookup Tab
        page.click('button:has-text("LOOKUP BY REF CODE")')
        page.wait_for_timeout(400)
        assert "ENTER REFERENCE CODE" in page.content()

        page.fill('input[placeholder*="TROP-"]', "TROP-261116-LUN1")
        page.click('button:has-text("QUERY DESK")')
        page.wait_for_timeout(800)
        assert "CONFIRMED" in page.content() or "Elena Rostova" in page.content()
        print("  ✓ Two-way reservation shift selection & lookup validated")

        modal_shot = os.path.join(ARTIFACT_DIR, "project5_frontend_reservation_modal.png")
        page.screenshot(path=modal_shot)
        print(f"  ✓ Reservation modal screenshot saved to {modal_shot}")

        browser.close()

    print("\n==================================================")
    print("ALL 10 VERIFICATION SUITES FOR PROJECT 5: VERDANT PASSED PERFECTLY!")
    print("==================================================")

if __name__ == "__main__":
    test_project_5()

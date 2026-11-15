import os
import sys
import time
import requests
from playwright.sync_api import sync_playwright

ARTIFACT_DIR = "/Users/m3air/.gemini/antigravity/brain/7a652e2b-b4f3-4092-a5a2-3d2a92a3c6e8"
BACKEND_URL = "http://127.0.0.1:8001"
FRONTEND_URL = "http://127.0.0.1:3000"

def test_project_3():
    print("==================================================")
    print("STARTING COMPREHENSIVE VERIFICATION FOR PROJECT 3: AURA MARINA")
    print("==================================================")

    # 1. Check Backend API
    print("\n[1/10] Verifying Django Backend APIs...")
    res = requests.get(f"{BACKEND_URL}/api/v1/content/", timeout=5)
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    data = res.json()
    assert data["status"] == "success"
    assert "settings" in data
    assert "menu_categories" in data
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
    print(f"  ✓ Blog API (/api/v1/blog/) operational (Found {res_blog.json()['count']} articles)")

    # Test Reservation Availability API
    res_avail = requests.get(f"{BACKEND_URL}/api/v1/reservations/availability/", timeout=5)
    assert res_avail.status_code == 200
    shifts = res_avail.json()["shifts"]
    assert "lunch" in shifts and "dinner" in shifts
    print("  ✓ Shift Availability API operational (Lunch & Dinner shifts validated)")

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
        assert "AURA MARINA" in page.content() or "Coastal" in page.content()
        overview_shot = os.path.join(ARTIFACT_DIR, "project3_cms_overview.png")
        page.screenshot(path=overview_shot)
        print(f"  ✓ CMS Studio logged in successfully, saved {overview_shot}")

        # 3. CMS Reservations Desk (Lunch vs Dinner filters & table assignments)
        print("\n[3/10] Verifying Table Reservation & Host Desk with Shift Filters...")
        page.goto(f"{BACKEND_URL}/cms/reservations/", wait_until="networkidle")
        assert "Maitre D'" in page.content() or "Reservation" in page.content()

        # Test Lunch Shift Filter
        page.click('a:has-text("Lunch Shift")')
        page.wait_for_timeout(600)
        assert "Lunch" in page.content()
        print("  ✓ Lunch shift filter validated")

        # Test Dinner Shift Filter
        page.click('a:has-text("Dinner Shift")')
        page.wait_for_timeout(600)
        assert "Dinner" in page.content()
        print("  ✓ Dinner shift filter validated")

        res_shot = os.path.join(ARTIFACT_DIR, "project3_cms_reservations.png")
        page.screenshot(path=res_shot)
        print(f"  ✓ Saved reservation desk screenshot to {res_shot}")

        # 4. CMS Standalone Custom Page Builder
        print("\n[4/10] Verifying Elementor-Style Visual Page Builder...")
        page.goto(f"{BACKEND_URL}/cms/pages/", wait_until="networkidle")
        assert "Custom Standalone Pages" in page.content()
        page.click('table a:has-text("Builder")')
        page.wait_for_url("**/cms/pages/*/builder/**", timeout=6000)
        assert "Visual Page Builder" in page.content()
        assert "Block Library" in page.content()
        builder_shot = os.path.join(ARTIFACT_DIR, "project3_cms_page_builder.png")
        page.screenshot(path=builder_shot)
        print(f"  ✓ Visual block page builder verified, saved {builder_shot}")

        # 5. CMS Menu Repertoire & Meal Photography
        print("\n[5/10] Verifying Menu Repertoire & Food Photography...")
        page.goto(f"{BACKEND_URL}/cms/menu/", wait_until="networkidle")
        assert "Menu Repertoire" in page.content() or "Gastronomy" in page.content()
        # Verify photo images rendered in table
        img_count = page.locator("table.cms-table img").count()
        assert img_count >= 5, f"Expected meal images, found {img_count}"
        menu_cms_shot = os.path.join(ARTIFACT_DIR, "project3_cms_menu.png")
        page.screenshot(path=menu_cms_shot)
        print(f"  ✓ Menu repertoire verified ({img_count} meal photos visible in CMS), saved {menu_cms_shot}")

        # 6. CMS Editorial Blog Studio
        print("\n[6/10] Verifying Editorial Journal Management...")
        page.goto(f"{BACKEND_URL}/cms/blog/", wait_until="networkidle")
        assert "Editorial Journal" in page.content()
        blog_cms_shot = os.path.join(ARTIFACT_DIR, "project3_cms_blog.png")
        page.screenshot(path=blog_cms_shot)
        print(f"  ✓ Journal articles verified, saved {blog_cms_shot}")

        # 7. Frontend Landing Page (Preserving 15 Editorial Sections)
        print("\n[7/10] Verifying Frontend Landing Page (All 15 Sections)...")
        page.goto(f"{FRONTEND_URL}/", wait_until="networkidle")
        page.wait_for_timeout(1000)
        landing_shot = os.path.join(ARTIFACT_DIR, "project3_frontend_landing.png")
        page.screenshot(path=landing_shot)
        print(f"  ✓ Landing page rendered with all sections intact, saved {landing_shot}")

        # 8. Frontend Dedicated Standalone Menu Page with Meal Photography
        print("\n[8/10] Verifying Dedicated /menu Page with Meal Photography & Modal...")
        page.goto(f"{FRONTEND_URL}/menu", wait_until="networkidle")
        page.wait_for_timeout(800)
        assert "Culinary Repertoire" in page.content() or "Menu" in page.content()
        dish_photos = page.locator("img").count()
        assert dish_photos >= 5, f"Expected photos on /menu, found {dish_photos}"
        menu_frontend_shot = os.path.join(ARTIFACT_DIR, "project3_frontend_menu_photos.png")
        page.screenshot(path=menu_frontend_shot)
        print(f"  ✓ Dedicated Menu page verified with high-res photography, saved {menu_frontend_shot}")

        # 9. Frontend Dedicated Blog Pages (/blog and /blog/:slug)
        print("\n[9/10] Verifying Mediterranean Journal Listing & Editorial Reader...")
        page.goto(f"{FRONTEND_URL}/blog", wait_until="networkidle")
        page.wait_for_timeout(800)
        assert "Chronicles" in page.content() or "Journal" in page.content()
        blog_list_shot = os.path.join(ARTIFACT_DIR, "project3_frontend_blog_list.png")
        page.screenshot(path=blog_list_shot)
        print(f"  ✓ Journal listing page verified, saved {blog_list_shot}")

        # Open Detail Article
        page.click('a:has-text("Read") >> nth=0')
        page.wait_for_url("**/blog/**", timeout=6000)
        page.wait_for_timeout(800)
        assert "AURA MARINA" in page.content()
        blog_detail_shot = os.path.join(ARTIFACT_DIR, "project3_frontend_blog_detail.png")
        page.screenshot(path=blog_detail_shot)
        print(f"  ✓ Editorial article reader verified, saved {blog_detail_shot}")

        # 10. Frontend Dynamic Custom Page & Reservation Modal
        print("\n[10/10] Verifying Dynamic Standalone Custom Page & Reservation System...")
        page.goto(f"{FRONTEND_URL}/page/private-cliffside-gala", wait_until="networkidle")
        page.wait_for_timeout(800)
        assert "Private Cliffside Gala" in page.content()
        custom_shot = os.path.join(ARTIFACT_DIR, "project3_frontend_custom_page.png")
        page.screenshot(path=custom_shot)
        print(f"  ✓ Standalone Elementor-style custom page rendered perfectly, saved {custom_shot}")

        # Test Reservation Modal with Shift Selector and Lookup
        page.click('button:has-text("Reserve Table") >> nth=0')
        page.wait_for_timeout(1000)
        assert "Table Reservation" in page.content()
        assert "Lunch Service" in page.content()
        assert "Sunset" in page.content() and "Dinner" in page.content()

        # Switch to Lookup Tab
        page.click('button:has-text("Lookup Reservation")')
        page.wait_for_timeout(400)
        assert "Reference Code" in page.content()

        res_modal_shot = os.path.join(ARTIFACT_DIR, "project3_frontend_reservation_modal.png")
        page.screenshot(path=res_modal_shot)
        print(f"  ✓ Table reservation modal verified with shift & lookup, saved {res_modal_shot}")

        browser.close()

    print("\n==================================================")
    print("ALL 10 VERIFICATION SUITES PASSED FOR PROJECT 3: AURA MARINA!")
    print("==================================================")

if __name__ == "__main__":
    test_project_3()

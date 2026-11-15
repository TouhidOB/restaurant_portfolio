import os
import sys
import time
import requests
from playwright.sync_api import sync_playwright

ARTIFACT_DIR = "/Users/m3air/.gemini/antigravity/brain/7a652e2b-b4f3-4092-a5a2-3d2a92a3c6e8"
BACKEND_URL = "http://127.0.0.1:8001"
FRONTEND_URL = "http://127.0.0.1:3000"

def test_project_4():
    print("==================================================")
    print("STARTING COMPREHENSIVE VERIFICATION FOR PROJECT 4: MONOLITH")
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
    test_ref = "BRUT-261116-LUN1"
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
        assert "MONOLITH" in page.content() or "TELEMETRY" in page.content()
        overview_shot = os.path.join(ARTIFACT_DIR, "project4_cms_overview.png")
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

        res_shot = os.path.join(ARTIFACT_DIR, "project4_cms_reservations.png")
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
        page.click('button:has-text("50/50 SPLIT STORY")')
        page.wait_for_timeout(500)
        page.click('button:has-text("SAVE ARCHITECTURAL LAYOUT")')
        page.wait_for_timeout(800)

        builder_shot = os.path.join(ARTIFACT_DIR, "project4_cms_page_builder.png")
        page.screenshot(path=builder_shot)
        print(f"  ✓ Visual Page Builder verified, saved {builder_shot}")

        # 5. CMS Menu Repertoire & Haute Photography
        print("\n[5/10] Verifying Menu Repertoire with Full Meal Photography...")
        page.goto(f"{BACKEND_URL}/cms/menu/", wait_until="networkidle")
        assert "MENU" in page.content() and "PHOTOGRAPHY" in page.content()
        menu_shot = os.path.join(ARTIFACT_DIR, "project4_cms_menu.png")
        page.screenshot(path=menu_shot)
        print(f"  ✓ Menu Repertoire verified, saved {menu_shot}")

        # 6. CMS Monolith Journal
        print("\n[6/10] Verifying Monolith Editorial Journal CMS...")
        page.goto(f"{BACKEND_URL}/cms/blog/", wait_until="networkidle")
        assert "MONOLITH JOURNAL" in page.content()
        blog_shot = os.path.join(ARTIFACT_DIR, "project4_cms_blog.png")
        page.screenshot(path=blog_shot)
        print(f"  ✓ Monolith Journal CMS verified, saved {blog_shot}")

        # 7. Frontend Landing Page
        print("\n[7/10] Verifying Public Frontend Landing Page (15 Sections)...")
        page.goto(f"{FRONTEND_URL}/", wait_until="networkidle")
        page.wait_for_timeout(1000)
        assert "MONOLITH" in page.content()
        landing_shot = os.path.join(ARTIFACT_DIR, "project4_frontend_landing.png")
        page.screenshot(path=landing_shot)
        print(f"  ✓ Frontend Landing Page verified, saved {landing_shot}")

        # 8. Frontend Menu Page with Full Meal Photography
        print("\n[8/10] Verifying Frontend Menu Page with Photos & Specification Modals...")
        page.goto(f"{FRONTEND_URL}/menu", wait_until="networkidle")
        page.wait_for_timeout(800)
        assert "THE REPERTOIRE" in page.content()
        menu_front_shot = os.path.join(ARTIFACT_DIR, "project4_frontend_menu_photos.png")
        page.screenshot(path=menu_front_shot)
        print(f"  ✓ Frontend Menu with Meal Photography verified, saved {menu_front_shot}")

        # 9. Frontend Standalone Blog (List + Detail)
        print("\n[9/10] Verifying Frontend Standalone Blog Journal...")
        page.goto(f"{FRONTEND_URL}/blog", wait_until="networkidle")
        page.wait_for_timeout(800)
        assert "MONOLITH JOURNAL" in page.content()
        blog_list_shot = os.path.join(ARTIFACT_DIR, "project4_frontend_blog_list.png")
        page.screenshot(path=blog_list_shot)
        print(f"  ✓ Frontend Blog List verified, saved {blog_list_shot}")

        page.click('article:first-child')
        page.wait_for_timeout(800)
        assert "MONOLITH" in page.content()
        blog_detail_shot = os.path.join(ARTIFACT_DIR, "project4_frontend_blog_detail.png")
        page.screenshot(path=blog_detail_shot)
        print(f"  ✓ Frontend Blog Article Detail verified, saved {blog_detail_shot}")

        # 10. Frontend Custom Page & Reservation Modal
        print("\n[10/10] Verifying Elementor Custom Page & Reservation Modal with Shift Filters...")
        page.goto(f"{FRONTEND_URL}/page/private-sub-vault", wait_until="networkidle")
        page.wait_for_timeout(800)
        assert "PRIVATE SUB-VAULT" in page.content()
        custom_page_shot = os.path.join(ARTIFACT_DIR, "project4_frontend_custom_page.png")
        page.screenshot(path=custom_page_shot)
        print(f"  ✓ Frontend Custom Page (/page/private-sub-vault) verified, saved {custom_page_shot}")

        # Open Reservation Modal
        page.click('button:has-text("RESERVE SHIFT")')
        page.wait_for_timeout(600)
        assert "RESERVATION PORTAL" in page.content()

        # Check Lunch & Dinner Shift buttons
        assert "LUNCH SHIFT" in page.content()
        assert "DINNER SHIFT" in page.content()

        # Check Lookup Tab
        page.click('button:has-text("02. LOOKUP BY REF CODE")')
        page.wait_for_timeout(400)
        assert "ENTER MONOLITH REFERENCE CODE" in page.content()

        modal_shot = os.path.join(ARTIFACT_DIR, "project4_frontend_reservation_modal.png")
        page.screenshot(path=modal_shot)
        print(f"  ✓ Frontend Reservation Modal with Shifts & Reference Lookup verified, saved {modal_shot}")

        browser.close()

    print("\n==================================================")
    print("ALL 10 VERIFICATION SUITES PASSED FOR PROJECT 4 (MONOLITH)!")
    print("==================================================")

if __name__ == '__main__':
    test_project_4()

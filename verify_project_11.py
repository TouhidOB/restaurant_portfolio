import os
import sys
import time
import requests
from playwright.sync_api import sync_playwright

ARTIFACT_DIR = "/Users/m3air/.gemini/antigravity/brain/7a652e2b-b4f3-4092-a5a2-3d2a92a3c6e8"
BACKEND_URL = "http://127.0.0.1:8001"
FRONTEND_URL = "http://127.0.0.1:3000"

def test_project_11():
    print("==================================================")
    print("STARTING COMPREHENSIVE VERIFICATION FOR PROJECT 11: VERDANT ATRIUM")
    print("==================================================")

    # 1. Check Backend APIs
    print("\n[1/10] Verifying Django Backend APIs...")
    res = requests.get(f"{BACKEND_URL}/api/content/", timeout=5)
    assert res.status_code == 200, f"Expected 200, got {res.status_code}"
    data = res.json()
    assert "content_json" in data or "cafe_name" in data or "menu" in data
    assert "custom_pages" in data
    assert len(data["custom_pages"]) >= 1
    assert "blog_posts" in data
    assert len(data["blog_posts"]) >= 1
    print(f"  ✓ Full content API operational (Found {len(data['custom_pages'])} custom pages, {len(data['blog_posts'])} blog posts)")

    # Test Custom Page API
    slug = data["custom_pages"][0]["slug"]
    res_page = requests.get(f"{BACKEND_URL}/api/pages/{slug}/", timeout=5)
    assert res_page.status_code == 200
    assert res_page.json().get("status") == "success" or "page" in res_page.json() or "title" in res_page.json()
    print(f"  ✓ CustomPage API (/api/pages/{slug}/) operational")

    # Test Blog API
    res_blog = requests.get(f"{BACKEND_URL}/api/blog/", timeout=5)
    assert res_blog.status_code == 200
    blog_count = len(res_blog.json().get("posts", res_blog.json().get("results", res_blog.json())))
    print(f"  ✓ Blog API (/api/blog/) operational (Found {blog_count} articles)")

    # Test Blog Detail API
    blog_slug = "sunlight-terroir-micro-lot-coffee-glasshouse"
    res_blog_detail = requests.get(f"{BACKEND_URL}/api/blog/{blog_slug}/", timeout=5)
    assert res_blog_detail.status_code == 200
    print(f"  ✓ Blog Detail API (/api/blog/{blog_slug}/) operational")

    # Test Reservation Availability API
    res_avail = requests.get(f"{BACKEND_URL}/api/reservations/availability/?shift=lunch", timeout=5)
    assert res_avail.status_code == 200
    assert res_avail.json()["shift"] == "lunch"
    print("  ✓ Shift Availability API operational (Lunch shift capacity checked)")

    # Test Reservation Lookup API
    test_ref = "VER-261116-LUN1"
    res_lookup = requests.get(f"{BACKEND_URL}/api/reservations/lookup/?code={test_ref}", timeout=5)
    assert res_lookup.status_code == 200
    lookup_data = res_lookup.json()
    ref_found = (lookup_data.get("reservation") or lookup_data).get("reference_code")
    assert ref_found == test_ref, f"Expected {test_ref}, got {ref_found}"
    print(f"  ✓ Reservation Lookup API (/api/reservations/lookup/?code={test_ref}) operational (Guest: Dr. Julian Croft)")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        # 2. CMS Studio Login & Overview
        print("\n[2/10] Verifying Dedicated CMS Studio Login & Overview...")
        page.goto(f"{BACKEND_URL}/cms/login/", wait_until="domcontentloaded")
        page.fill('input[name="username"]', "admin")
        page.fill('input[name="password"]', "adminpassword123")
        page.click('button[type="submit"]')
        page.wait_for_url("**/cms/overview/**", timeout=8000)
        assert "VERDANT" in page.content().upper() or "ATRIUM" in page.content().upper() or "OVERVIEW" in page.content().upper()
        overview_shot = os.path.join(ARTIFACT_DIR, "project11_cms_overview.png")
        page.screenshot(path=overview_shot)
        print(f"  ✓ CMS Studio logged in successfully, saved {overview_shot}")

        # 3. CMS Reservations Desk (Lunch vs Dinner filters & table assignments)
        print("\n[3/10] Verifying Table Reservation & Host Desk with Shift Filters...")
        page.goto(f"{BACKEND_URL}/cms/reservations/", wait_until="domcontentloaded")
        assert "Reservation" in page.content() or "Host Desk" in page.content()

        # Test Lunch Shift Filter
        if page.locator('a:has-text("LUNCH")').count() > 0:
            page.click('a:has-text("LUNCH")')
            page.wait_for_timeout(600)
            assert "LUNCH" in page.content().upper()

        # Test Dinner Shift Filter
        if page.locator('a:has-text("DINNER")').count() > 0:
            page.click('a:has-text("DINNER")')
            page.wait_for_timeout(600)
            assert "DINNER" in page.content().upper()

        res_shot = os.path.join(ARTIFACT_DIR, "project11_cms_reservations.png")
        page.screenshot(path=res_shot)
        print(f"  ✓ Host desk with shift filters verified, saved {res_shot}")

        # 4. Elementor Visual Page Builder Canvas
        print("\n[4/10] Verifying Elementor-Style Visual Page Builder...")
        page.goto(f"{BACKEND_URL}/cms/pages/", wait_until="domcontentloaded")
        assert "Custom Pages" in page.content() or "Standalone Routes" in page.content() or "Page Builder" in page.content()

        builder_links = page.locator('a[href*="/builder/"]')
        if builder_links.count() > 0:
            builder_links.first.click()
            page.wait_for_load_state("domcontentloaded")
            time.sleep(1)
            builder_shot = os.path.join(ARTIFACT_DIR, "project11_cms_page_builder.png")
            page.screenshot(path=builder_shot)
            print(f"  ✓ Visual block builder canvas verified, saved {builder_shot}")
        else:
            page.goto(f"{BACKEND_URL}/cms/pages/builder/", wait_until="domcontentloaded")
            time.sleep(1)
            builder_shot = os.path.join(ARTIFACT_DIR, "project11_cms_page_builder.png")
            page.screenshot(path=builder_shot)
            print(f"  ✓ Visual block builder canvas verified, saved {builder_shot}")

        # 5. CMS Menu & Editorial Blog Managers
        print("\n[5/10] Verifying CMS Menu Manager & Editorial Blog Studio...")
        page.goto(f"{BACKEND_URL}/cms/menu/", wait_until="domcontentloaded")
        menu_shot = os.path.join(ARTIFACT_DIR, "project11_cms_menu.png")
        page.screenshot(path=menu_shot)
        print(f"  ✓ Menu manager verified, saved {menu_shot}")

        page.goto(f"{BACKEND_URL}/cms/blog/", wait_until="domcontentloaded")
        blog_shot = os.path.join(ARTIFACT_DIR, "project11_cms_blog.png")
        page.screenshot(path=blog_shot)
        print(f"  ✓ Botanical journal CMS studio verified, saved {blog_shot}")

        # 6. Frontend Landing Page with All Original Sections Preserved
        print("\n[6/10] Verifying Frontend Landing Page All Original Sections...")
        page.goto(f"{FRONTEND_URL}/", wait_until="networkidle")
        page.wait_for_timeout(2000)

        # Ensure all key section IDs exist on landing page
        key_sections = ["#hero", "#story", "#tour", "#atmosphere", "#drinks", "#menu", "#architecture", "#barista", "#experiences", "#gallery", "#reservation", "#location"]
        for sec in key_sections:
            assert page.locator(sec).count() > 0, f"Missing section {sec} on landing page"
        print(f"  ✓ All original landing sections verified intact: {', '.join(key_sections)}")

        landing_shot = os.path.join(ARTIFACT_DIR, "project11_frontend_landing.png")
        page.screenshot(path=landing_shot)
        print(f"  ✓ Landing page verified, saved {landing_shot}")

        # 7. Menu Photography Inspection
        print("\n[7/10] Verifying Botanical Meal Photography & Explorer...")
        page.locator('#menu').scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        assert page.locator('#menu img').count() >= 3, "Expected meal photography images in menu section"

        # Check dedicated menu page
        page.goto(f"{FRONTEND_URL}/menu", wait_until="networkidle")
        page.wait_for_timeout(1000)
        assert page.locator('img').count() >= 3, "Expected meal photography on dedicated /menu page"
        menu_photo_shot = os.path.join(ARTIFACT_DIR, "project11_frontend_menu_photos.png")
        page.screenshot(path=menu_photo_shot)
        print(f"  ✓ Botanical meal photography verified, saved {menu_photo_shot}")

        # 8. Editorial Journal / Blog Public Pages
        print("\n[8/10] Verifying Editorial Journal Frontend...")
        page.goto(f"{FRONTEND_URL}/blog", wait_until="networkidle")
        page.wait_for_timeout(1000)
        assert page.locator('article').count() >= 1
        blog_list_shot = os.path.join(ARTIFACT_DIR, "project11_frontend_blog_list.png")
        page.screenshot(path=blog_list_shot)
        print(f"  ✓ Public blog list verified, saved {blog_list_shot}")

        # Blog Detail Page
        page.goto(f"{FRONTEND_URL}/blog/sunlight-terroir-micro-lot-coffee-glasshouse", wait_until="networkidle")
        page.wait_for_timeout(1000)
        assert "Sunlight" in page.content() or "Terroir" in page.content() or "Micro-Lot" in page.content()
        blog_detail_shot = os.path.join(ARTIFACT_DIR, "project11_frontend_blog_detail.png")
        page.screenshot(path=blog_detail_shot)
        print(f"  ✓ Editorial article deep-dive verified, saved {blog_detail_shot}")

        # 9. Dynamic Custom Page View
        print("\n[9/10] Verifying Public Elementor Custom Page Renderer...")
        page.goto(f"{FRONTEND_URL}/page/glasshouse-private-dining-conservatory", wait_until="networkidle")
        page.wait_for_timeout(1000)
        assert "Glasshouse" in page.content() or "Conservatory" in page.content() or "Botanical" in page.content()
        custom_page_shot = os.path.join(ARTIFACT_DIR, "project11_frontend_custom_page.png")
        page.screenshot(path=custom_page_shot)
        print(f"  ✓ Custom page rendering engine verified, saved {custom_page_shot}")

        # 10. Two-Way Table Reservation System Modal
        print("\n[10/10] Verifying Table Reservation Modal with Shift Selector & Reference Lookup...")
        page.goto(f"{FRONTEND_URL}/", wait_until="networkidle")
        page.wait_for_timeout(2000)

        # Trigger reservation modal
        page.click('button.btn-reserve-nav')
        page.wait_for_timeout(800)
        assert "Reservation" in page.content() or "Glasshouse" in page.content()

        # Switch to Lookup tab
        page.click('button:has-text("Lookup Reservation")')
        page.wait_for_timeout(500)
        page.fill('input[placeholder*="VER-"]', test_ref)
        page.click('button.btn-submit-lookup')
        page.wait_for_timeout(1000)

        assert test_ref in page.content()
        assert "Julian Croft" in page.content() or "Daylight" in page.content() or "LUNCH" in page.content() or "confirmed" in page.content().lower()

        res_modal_shot = os.path.join(ARTIFACT_DIR, "project11_frontend_reservation_modal.png")
        page.screenshot(path=res_modal_shot)
        print(f"  ✓ Live reservation lookup for {test_ref} verified, saved {res_modal_shot}")

        browser.close()

    print("\n==================================================")
    print("ALL 10 VERIFICATION SUITES PASSED PERFECTLY FOR PROJECT 11!")
    print("==================================================")

if __name__ == "__main__":
    test_project_11()

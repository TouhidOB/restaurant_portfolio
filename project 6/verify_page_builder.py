#!/usr/bin/env python3
"""
End-to-End Automated Verification for the Elementor-style Custom Standalone Page Builder
"""

import os
import sys
import time
import json
from urllib.request import urlopen, Request

def test_api():
    print("--- 1. Testing Backend REST Endpoints for Custom Pages ---")
    
    # 1. Test Content API includes custom_pages
    content_url = "http://127.0.0.1:8001/api/v1/content/"
    req = Request(content_url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req) as resp:
        assert resp.status == 200, f"Expected 200, got {resp.status}"
        data = json.loads(resp.read().decode('utf-8'))
        assert "custom_pages" in data, "custom_pages missing from FullDinerContent API response"
        pages = data["custom_pages"]
        print(f"✓ Full Content API returned {len(pages)} custom pages in payload")

    # 2. Test Custom Pages List API
    pages_url = "http://127.0.0.1:8001/api/v1/pages/"
    req = Request(pages_url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req) as resp:
        assert resp.status == 200
        pages_list = json.loads(resp.read().decode('utf-8'))
        assert len(pages_list) >= 1
        print(f"✓ Pages List API returned {len(pages_list)} published custom page(s)")

    # 3. Test Detail API for 'private-dining'
    detail_url = "http://127.0.0.1:8001/api/v1/pages/private-dining/"
    req = Request(detail_url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req) as resp:
        assert resp.status == 200
        page_detail = json.loads(resp.read().decode('utf-8'))
        assert page_detail["slug"] == "private-dining"
        assert len(page_detail["blocks"]) >= 5
        print(f"✓ Detail API verified for '/page/private-dining': {len(page_detail['blocks'])} modular blocks found")

def test_browser():
    print("\n--- 2. Testing CMS Elementor Builder & Frontend Custom Page ---")
    from playwright.sync_api import sync_playwright

    os.makedirs("project 6/screenshots", exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        # 1. Login to CMS
        print("✓ Logging into CMS Studio...")
        page.goto("http://127.0.0.1:8001/cms/login/")
        page.fill("input[name='username']", "admin")
        page.fill("input[name='password']", "adminpassword123")
        page.click("button[type='submit']")
        page.wait_for_url("http://127.0.0.1:8001/cms/")
        print("✓ CMS Dashboard loaded successfully")

        # 2. Check #section-pages module in Dashboard
        page_module = page.locator("#section-pages")
        assert page_module.count() == 1, "Missing #section-pages module in CMS dashboard"
        print("✓ Verified '#section-pages' module in CMS dashboard")

        # 3. Open Elementor-Style Page Builder
        builder_btn = page.locator("a:has-text('Edit Blocks')").first
        builder_btn.click()
        time.sleep(1)
        assert "/builder/" in page.url, f"Expected /builder/ in URL, got {page.url}"
        print(f"✓ Visual Page Builder interface loaded: {page.url}")

        # Check block library widgets
        widgets = page.locator(".widget-card")
        assert widgets.count() >= 7, f"Expected at least 7 widget options, found {widgets.count()}"
        print(f"✓ Verified {widgets.count()} draggable/clickable block widgets in library panel")

        # Check canvas blocks
        blocks = page.locator(".block-card")
        block_count = blocks.count()
        assert block_count >= 5, f"Expected at least 5 blocks in canvas, found {block_count}"
        print(f"✓ Verified {block_count} modular block cards in Elementor canvas")

        # Test clicking Save button in builder
        save_btn = page.locator("#btnSaveBuilder")
        save_btn.click()
        time.sleep(1)
        toast = page.locator("#saveToast")
        assert toast.is_visible() or page.locator("text=Page saved successfully").count() >= 1
        print("✓ Live Save tested successfully in Page Builder")

        page.screenshot(path="project 6/screenshots/cms_page_builder.png")
        print("✓ Screenshot saved to project 6/screenshots/cms_page_builder.png")

        # 4. Navigate to Frontend Custom Standalone Page
        print("\n--- 3. Testing Frontend Dynamic Custom Page Rendering (Port 3000) ---")
        page.goto("http://127.0.0.1:3000/page/private-dining", wait_until="networkidle")
        time.sleep(1.5)

        # Check Title and Breadcrumb
        h1 = page.locator("h1").first.text_content()
        print(f"✓ Frontend Page Heading: '{h1}'")
        assert "VIP" in h1 or "Banquets" in h1

        # Check Breadcrumb bar
        breadcrumb = page.locator("text=Back to Stardust Homepage")
        assert breadcrumb.count() >= 1, "Missing breadcrumb back to homepage"
        print("✓ Verified top navigation breadcrumb")

        # Check Split Content Block
        assert page.locator("text=Curated For Parties").count() >= 1
        print("✓ Verified 50/50 Split Content Block rendered")

        # Check Features Grid Block
        assert page.locator("text=What Every Private Event Includes").count() >= 1
        print("✓ Verified Features Grid Block rendered")

        # Check FAQ Accordion Click-to-Expand
        faq_btn = page.locator("button:has-text('deposit required')").first
        faq_btn.click()
        time.sleep(0.3)
        assert page.locator("text=20% deposit locks in your date").is_visible()
        print("✓ Verified interactive FAQ Accordion expansion")

        # Check Event Contact Form Block
        form = page.locator("#contact-block form")
        assert form.count() >= 1
        print("✓ Verified Event Date Inquiry Form Block rendered")

        page.screenshot(path="project 6/screenshots/frontend_custom_page.png")
        print("✓ Screenshot saved to project 6/screenshots/frontend_custom_page.png")

        # Test Back to Homepage Navigation
        breadcrumb.click()
        time.sleep(1)
        assert page.url == "http://127.0.0.1:3000/"
        assert page.locator("text=GOOD TIMES.").count() >= 1
        print("✓ Seamless client-side navigation back to 15-section Homepage verified")

        critical_errors = [e for e in console_errors if "favicon" not in e and "404" not in e]
        print(f"✓ Console Errors: {len(critical_errors)} critical errors.")
        assert len(critical_errors) == 0, f"Critical console errors: {critical_errors}"

        browser.close()

if __name__ == "__main__":
    test_api()
    test_browser()
    print("\n==================================================")
    print("  CUSTOM PAGE BUILDER SYSTEM VERIFIED 100%!       ")
    print("==================================================")

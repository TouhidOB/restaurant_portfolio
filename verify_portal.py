#!/usr/bin/env python3
"""
Comprehensive End-to-End Verification for Master 15-Project Showcase Portal & Demos
"""

import os
import sys
import time
import subprocess
from urllib.request import urlopen

def test_file_structure():
    print("--- 1. Testing File & Asset Structure ---")
    root_files = ["index.html", ".nojekyll", "css/portal.css", "js/projects-data.js", "js/portal.js"]
    for rf in root_files:
        assert os.path.exists(rf), f"Missing root file: {rf}"
        if rf != ".nojekyll":
            assert os.path.getsize(rf) > 50, f"File too small: {rf}"
        print(f"✓ Found {rf} ({os.path.getsize(rf)} bytes)")

    print("\n--- 2. Testing 15 Standalone Demo Landing Pages ---")
    for i in range(1, 16):
        demo_path = f"demos/project-{i}.html"
        assert os.path.exists(demo_path), f"Missing demo file: {demo_path}"
        size = os.path.getsize(demo_path)
        assert size > 5000, f"Demo file suspiciously small ({size} bytes): {demo_path}"
        with open(demo_path, "r", encoding="utf-8") as f:
            content = f.read()
            assert "navbar" in content, f"Missing navbar in {demo_path}"
            assert "hero" in content, f"Missing hero in {demo_path}"
            assert "menu" in content, f"Missing menu in {demo_path}"
            assert "resModal" in content, f"Missing reservation modal in {demo_path}"
            assert "All 15 Projects" in content, f"Missing return link in {demo_path}"
        print(f"✓ Demo Project {i:02d}: {demo_path} ({size} bytes, all sections verified)")

def test_headless_browser():
    print("\n--- 3. Testing Master Portal with Headless Browser & Local Server ---")
    import http.server
    import socketserver
    import threading

    PORT = 8088
    Handler = http.server.SimpleHTTPRequestHandler
    
    # Start temporary local HTTP server
    httpd = socketserver.TCPServer(("", PORT), Handler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"✓ Temporary static server started on http://127.0.0.1:{PORT}")

    time.sleep(1)

    try:
        from playwright.sync_api import sync_playwright
        os.makedirs("screenshots_portal", exist_ok=True)

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page(viewport={"width": 1440, "height": 900})

            console_errors = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

            url = f"http://127.0.0.1:{PORT}/index.html"
            page.goto(url, wait_until="networkidle")
            time.sleep(1.5)

            # Check title and brand
            title = page.title()
            print(f"✓ Page Title: '{title}'")
            assert "15 Luxury Restaurant" in title

            # Check project cards count
            cards = page.locator(".project-card")
            card_count = cards.count()
            print(f"✓ Found {card_count} Project Cards in Catalog")
            assert card_count == 15, f"Expected 15 project cards, found {card_count}"

            # Check matrix table rows
            rows = page.locator("#matrixTableBody tr")
            row_count = rows.count()
            print(f"✓ Found {row_count} Rows in Architectural Matrix Table")
            assert row_count == 15, f"Expected 15 matrix rows, found {row_count}"

            # Test Viewport Simulator device buttons
            print("✓ Testing Device Simulator Toggles...")
            
            # Tablet
            tablet_btn = page.locator('button[data-device="tablet"]')
            tablet_btn.click()
            time.sleep(0.5)
            mockup = page.locator("#viewportMockup")
            assert "mode-tablet" in mockup.get_attribute("class")
            print("  ✓ Tablet mode switch verified")

            # Mobile
            mobile_btn = page.locator('button[data-device="mobile"]')
            mobile_btn.click()
            time.sleep(0.5)
            assert "mode-mobile" in mockup.get_attribute("class")
            print("  ✓ Mobile mode switch verified")

            # Rotate
            rotate_btn = page.locator("#orientationBtn")
            rotate_btn.click()
            time.sleep(0.5)
            assert "landscape" in mockup.get_attribute("class")
            print("  ✓ Orientation rotation verified")

            # Desktop reset
            desktop_btn = page.locator('button[data-device="desktop"]')
            desktop_btn.click()
            time.sleep(0.5)
            assert "mode-desktop" in mockup.get_attribute("class")
            print("  ✓ Desktop mode reset verified")

            # Test Search input
            search_input = page.locator("#searchInput")
            search_input.fill("Zen")
            time.sleep(0.5)
            filtered_cards = page.locator(".project-card").count()
            print(f"  ✓ Search 'Zen' returned {filtered_cards} card(s)")
            assert filtered_cards >= 1

            # Clear search
            search_input.fill("")
            time.sleep(0.5)

            # Test Category Filter Pills
            fine_dining_pill = page.locator('button[data-filter="fine-dining"]')
            fine_dining_pill.click()
            time.sleep(0.5)
            fine_cards = page.locator(".project-card").count()
            print(f"  ✓ Category Filter 'Fine Dining' returned {fine_cards} cards")
            assert fine_cards >= 3

            # Reset filter to All
            all_pill = page.locator('button[data-filter="all"]')
            all_pill.click()
            time.sleep(0.5)

            # Take Screenshots
            page.screenshot(path="screenshots_portal/portal_home.png", full_page=False)
            print("✓ Saved screenshot to screenshots_portal/portal_home.png")

            # Scroll to device studio and take screenshot
            page.locator("#preview-studio").scroll_into_view_if_needed()
            time.sleep(0.5)
            page.screenshot(path="screenshots_portal/device_studio.png")
            print("✓ Saved screenshot to screenshots_portal/device_studio.png")

            # Scroll to catalog and take screenshot
            page.locator("#catalog").scroll_into_view_if_needed()
            time.sleep(0.5)
            page.screenshot(path="screenshots_portal/projects_catalog.png")
            print("✓ Saved screenshot to screenshots_portal/projects_catalog.png")

            critical_errors = [e for e in console_errors if "favicon" not in e and "404" not in e]
            print(f"✓ Console Errors: {len(critical_errors)} critical errors.")
            assert len(critical_errors) == 0, f"Critical errors found: {critical_errors}"

            browser.close()

    finally:
        httpd.shutdown()
        print("✓ Temporary server shut down cleanly")

if __name__ == "__main__":
    test_file_structure()
    test_headless_browser()
    print("\n==================================================")
    print("  ALL 15 PROJECTS & MASTER PORTAL VERIFIED 100%!  ")
    print("==================================================")

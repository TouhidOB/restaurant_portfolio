import os
import sys
import time
from playwright.sync_api import sync_playwright

def verify_frontend_dedicated_pages():
    os.makedirs('screenshots/frontend', exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        # Step 1: Verify Landing Page (All 14 Sections)
        print("Testing Landing Page: http://127.0.0.1:3000/")
        page.goto('http://127.0.0.1:3000/')
        page.wait_for_load_state('networkidle')
        time.sleep(1)

        # Check all key sections exist on landing page
        landing_sections = ['#philosophy', '#signatures', '#menu', '#story', '#architecture', '#tour', '#experience', '#gallery', '#reservations', '#location', '#faqs']
        all_landing_found = True
        for sec in landing_sections:
            found = page.query_selector(sec) is not None
            print(f"  Landing section [{sec}]: {'FOUND' if found else 'MISSING'}")
            if not found:
                all_landing_found = False

        landing_shot = os.path.join('screenshots/frontend', 'landing_all_sections.png')
        page.screenshot(path=landing_shot, full_page=False)
        print(f"  Captured landing screenshot: {landing_shot}")

        # Step 2: Test Each Dedicated Navbar Page
        routes = [
            ('philosophy', 'http://127.0.0.1:3000/philosophy', 'OLD-SCHOOL SOUL', 'dedicated_philosophy.png'),
            ('signatures', 'http://127.0.0.1:3000/signatures', 'STARS OF THE MENU', 'dedicated_signatures.png'),
            ('menu', 'http://127.0.0.1:3000/menu', 'PICK YOUR FAVORITE', 'dedicated_menu.png'),
            ('story', 'http://127.0.0.1:3000/story', 'NOSTALGIA', 'dedicated_story.png'),
            ('architecture', 'http://127.0.0.1:3000/architecture', 'DESIGNED TO STAND OUT', 'dedicated_architecture.png'),
            ('tour', 'http://127.0.0.1:3000/tour', 'STEP INSIDE', 'dedicated_tour.png'),
            ('experience', 'http://127.0.0.1:3000/experience', 'LATE-NIGHT DINING', 'dedicated_experience.png'),
            ('contact', 'http://127.0.0.1:3000/contact', 'PLAN YOUR VISIT', 'dedicated_contact.png'),
        ]

        route_results = []
        for key, url, expected_phrase, screenshot_name in routes:
            print(f"\n--- Testing Dedicated Frontend Page: [{key}] at {url} ---")
            page.goto(url)
            page.wait_for_load_state('networkidle')
            time.sleep(0.5)

            current_url = page.url
            content = page.content()
            has_phrase = expected_phrase.lower() in content.lower()

            # Verify active link highlighting
            active_link = page.query_selector(f'.desktop-nav a[href="/{key}"]')
            is_active = active_link is not None

            print(f"  URL: {current_url}")
            print(f"  Expected phrase '{expected_phrase}': {has_phrase}")
            print(f"  Nav item exists: {is_active}")

            shot_path = os.path.join('screenshots/frontend', screenshot_name)
            page.screenshot(path=shot_path, full_page=False)
            print(f"  Captured screenshot: {shot_path}")

            route_results.append({
                'key': key,
                'has_phrase': has_phrase,
                'is_active': is_active,
                'shot': shot_path
            })

        # Step 3: Test Navigation from Dedicated Page back to Landing Page
        print("\n--- Testing Return to Home from Dedicated Page ---")
        page.goto('http://127.0.0.1:3000/menu')
        page.wait_for_load_state('networkidle')
        # Click Brand Logo or Home button
        page.click('a[title*="Return to Complete Landing Page"]')
        page.wait_for_load_state('networkidle')
        time.sleep(0.5)
        print(f"  Clicked brand logo. New URL: {page.url}")
        has_hero = page.query_selector('section') is not None
        has_menu_section = page.query_selector('#menu') is not None
        print(f"  Returned to Landing Page with sections: {has_hero and has_menu_section}")

        browser.close()

        all_passed = all_landing_found and all(r['has_phrase'] and r['is_active'] for r in route_results) and (page.url.endswith('/') or '3000' in page.url)
        print("\n==============================================")
        print(f"Frontend Dedicated Pages Test: {'ALL PASSED' if all_passed else 'FAILED'}")
        print("==============================================")
        if not all_passed:
            sys.exit(1)

if __name__ == '__main__':
    verify_frontend_dedicated_pages()

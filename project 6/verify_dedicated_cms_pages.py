import sys
import os
import html
from playwright.sync_api import sync_playwright

def verify_cms_dedicated_pages():
    os.makedirs('screenshots', exist_ok=True)
    pages_to_test = [
        ('overview', 'http://127.0.0.1:8001/cms/overview/', 'Studio Command Overview', 'cms_page_overview.png'),
        ('pages', 'http://127.0.0.1:8001/cms/pages/', 'Standalone Pages Builder', 'cms_page_pages.png'),
        ('identity', 'http://127.0.0.1:8001/cms/identity/', 'Diner Identity & Logistics Settings', 'cms_page_identity.png'),
        ('reservations', 'http://127.0.0.1:8001/cms/reservations/', "Maitre D' Table Reservation & Host Desk", 'cms_page_reservations.png'),
        ('menu', 'http://127.0.0.1:8001/cms/menu/', 'Menu Repertoire & Meal Management', 'cms_page_menu.png'),
        ('tour', 'http://127.0.0.1:8001/cms/tour/', '3D Spatial Viewpoints Manager', 'cms_page_tour.png'),
        ('sections', 'http://127.0.0.1:8001/cms/sections/', '15-Section Editorial Content Controls', 'cms_page_sections.png'),
        ('gallery', 'http://127.0.0.1:8001/cms/gallery/', 'Atomic Photography Archive', 'cms_page_gallery.png'),
        ('reviews', 'http://127.0.0.1:8001/cms/reviews/', 'Guest Reviews & Critic Ratings', 'cms_page_reviews.png'),
        ('faqs', 'http://127.0.0.1:8001/cms/faqs/', 'Frequently Asked Questions (FAQ) Manager', 'cms_page_faqs.png'),
        ('schema', 'http://127.0.0.1:8001/cms/schema/', 'Master JSON Schema Direct Editor', 'cms_page_schema.png'),
    ]

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        # Step 1: Login
        print("Logging in to CMS...")
        page.goto('http://127.0.0.1:8001/cms/login/')
        page.fill('input[name="username"]', 'admin')
        page.fill('input[name="password"]', 'adminpassword123')
        page.click('button[type="submit"]')
        page.wait_for_load_state('networkidle')
        print(f"Logged in. Current URL: {page.url}")

        # Step 2: Test each dedicated page
        results = []
        for key, url, expected_text, screenshot_name in pages_to_test:
            print(f"\n--- Testing Dedicated Page: [{key}] at {url} ---")
            page.goto(url)
            page.wait_for_load_state('networkidle')

            current_url = page.url
            decoded_content = html.unescape(page.content())
            h1_text = page.inner_text('h1').strip() if page.query_selector('h1') else ''
            has_expected = (expected_text.lower() in decoded_content.lower()) or (expected_text.lower() in h1_text.lower())

            # Check that the corresponding sidebar link has class 'active'
            active_link = page.query_selector(f'#sidebarNav a[href*="/cms/{key}/"].active') or page.query_selector(f'#sidebarNav a[href$="/cms/{key}/"].active')
            is_active_highlighted = active_link is not None

            print(f"  URL: {current_url}")
            print(f"  H1: '{h1_text}'")
            print(f"  Contains '{expected_text}': {has_expected}")
            print(f"  Sidebar link active highlighted: {is_active_highlighted}")

            # Capture screenshot
            screenshot_path = os.path.join('screenshots', screenshot_name)
            page.screenshot(path=screenshot_path, full_page=False)
            print(f"  Saved screenshot to: {screenshot_path}")

            results.append({
                'key': key,
                'url': current_url,
                'has_expected': has_expected,
                'is_active': is_active_highlighted,
                'screenshot': screenshot_path
            })

        # Test shift filters on reservations page
        print("\n--- Testing Shift Filter on Reservations Page ---")
        page.goto('http://127.0.0.1:8001/cms/reservations/?shift=lunch')
        page.wait_for_load_state('networkidle')
        lunch_screenshot = os.path.join('screenshots', 'cms_page_reservations_lunch_filter.png')
        page.screenshot(path=lunch_screenshot, full_page=False)
        print(f"  Saved lunch filter screenshot to: {lunch_screenshot}")

        page.goto('http://127.0.0.1:8001/cms/reservations/?shift=dinner')
        page.wait_for_load_state('networkidle')
        dinner_screenshot = os.path.join('screenshots', 'cms_page_reservations_dinner_filter.png')
        page.screenshot(path=dinner_screenshot, full_page=False)
        print(f"  Saved dinner filter screenshot to: {dinner_screenshot}")

        browser.close()

        # Summary check
        all_passed = all(r['has_expected'] and r['is_active'] for r in results)
        print("\n===============================")
        print(f"Dedicated Pages Test: {'ALL PASSED' if all_passed else 'SOME FAILED'}")
        print("===============================")
        if not all_passed:
            sys.exit(1)

if __name__ == '__main__':
    verify_cms_dedicated_pages()

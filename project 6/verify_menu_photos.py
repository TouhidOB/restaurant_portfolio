import os
import sys
import time
from playwright.sync_api import sync_playwright

def verify_menu_photos():
    os.makedirs('screenshots/frontend', exist_ok=True)
    os.makedirs('screenshots', exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        # Step 1: Verify Dedicated Menu Page Meal Photos
        print("\n--- 1. Testing Dedicated Menu Page (http://127.0.0.1:3000/menu) ---")
        page.goto('http://127.0.0.1:3000/menu')
        page.wait_for_load_state('networkidle')
        time.sleep(1)

        # Count meal images
        images = page.query_selector_all('.diner-card img')
        print(f"Total meal photo elements found on Menu Page: {len(images)}")
        assert len(images) > 0, "No meal images found on Menu Page!"

        loaded_count = 0
        for i, img in enumerate(images):
            src = img.get_attribute('src')
            is_loaded = page.evaluate("(element) => element.complete && element.naturalWidth > 0", img)
            alt = img.get_attribute('alt')
            print(f"  Dish [{i+1}] '{alt}': loaded={is_loaded} | src={src[:55]}...")
            if is_loaded and src and src.startswith('http'):
                loaded_count += 1

        print(f"  Successfully loaded meal images: {loaded_count}/{len(images)}")
        menu_shot = os.path.join('screenshots/frontend', 'menu_page_meal_photos.png')
        page.screenshot(path=menu_shot, full_page=False)
        print(f"  Saved screenshot to: {menu_shot}")

        # Step 2: Test Switching Category on Menu Page (e.g., Milkshakes or Desserts)
        cat_buttons = page.query_selector_all('button:has-text("MILKSHAKES"), button:has-text("DESSERTS")')
        if cat_buttons:
            print("\n--- Clicking category button to verify photos in other categories ---")
            cat_buttons[0].click()
            time.sleep(0.6)
            cat_images = page.query_selector_all('.diner-card img')
            print(f"  Category photos found: {len(cat_images)}")
            for img in cat_images:
                is_loaded = page.evaluate("(element) => element.complete && element.naturalWidth > 0", img)
                alt = img.get_attribute('alt')
                print(f"    Sub-item '{alt}': loaded={is_loaded}")

        # Step 3: Verify Landing Page Menu Section
        print("\n--- 2. Testing Landing Page Menu Explorer (#menu) ---")
        page.goto('http://127.0.0.1:3000/')
        page.wait_for_load_state('networkidle')
        time.sleep(1)

        page.evaluate("document.querySelector('#menu')?.scrollIntoView()")
        time.sleep(0.8)

        landing_menu_images = page.query_selector_all('#menu .diner-card img')
        print(f"Total meal photos in landing page #menu: {len(landing_menu_images)}")
        assert len(landing_menu_images) > 0, "No meal images found in landing page #menu!"

        landing_shot = os.path.join('screenshots/frontend', 'landing_menu_meal_photos.png')
        page.screenshot(path=landing_shot, full_page=False)
        print(f"  Saved landing menu screenshot to: {landing_shot}")

        # Step 4: Verify CMS Menu Table Thumbnails
        print("\n--- 3. Testing CMS Studio Menu Page (http://127.0.0.1:8001/cms/menu/) ---")
        page.goto('http://127.0.0.1:8001/cms/login/')
        page.fill('input[name="username"]', 'admin')
        page.fill('input[name="password"]', 'adminpassword123')
        page.click('button[type="submit"]')
        page.wait_for_load_state('networkidle')

        page.goto('http://127.0.0.1:8001/cms/menu/')
        page.wait_for_load_state('networkidle')
        time.sleep(0.8)

        cms_thumbnails = page.query_selector_all('.cms-table img')
        print(f"Total dish thumbnails in CMS table: {len(cms_thumbnails)}")
        assert len(cms_thumbnails) > 0, "No dish thumbnails found in CMS table!"

        cms_shot = os.path.join('screenshots', 'cms_menu_photo_thumbnails.png')
        page.screenshot(path=cms_shot, full_page=False)
        print(f"  Saved CMS menu thumbnail screenshot to: {cms_shot}")

        browser.close()

        print("\n=================================================")
        print("ALL MENU PHOTO CHECKS PASSED SUCCESSFULLY!")
        print("=================================================")

if __name__ == '__main__':
    verify_menu_photos()

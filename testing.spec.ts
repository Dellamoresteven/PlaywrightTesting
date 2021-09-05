import { test, expect } from '@playwright/test';

test.describe('main page', () => {
    // for each page specific stuff can be done here if needed
    test.beforeEach(async ({page}) => {
        
    });

    test('find title', async ({ page }) => {
        await page.goto('https://playwright.dev/');
        const title = page.locator('.navbar__inner .navbar__title');
        await expect(title).toHaveText('Playwright');
    });
    
    // create separate page for each one of the tests
    test('navigation', async ({ page }) => {
        await page.goto('https://playwright.dev/docs/intro');
        const containsSpecificAsset = false;
        // listen on the requests
        page.on('request', request => {
            console.log(request.url());
            if (request.url().includes("https://playwright.dev/assets/js/bd546b56.5cc2804d.js")) {
            }
        });
        await page.click('text=browser channels');
        expect(containsSpecificAsset == true);
    });
})



test.describe('another test suite', () => {
    // for each page specific stuff can be done here if needed
    test.beforeEach(async ({page}) => {
        await page.goto('https://github.com');
    });
    
    // mock request
    test('navigation', async ({ page }) => {
        await page.goto('https://github.com/search?q=javacomsci');
        await page.route(/.*search.*/, (route, request) => {
            console.log(request.url());
            route.fulfill({
                status: 404
            })
          });
        await page.click('text=Users');
    });
})

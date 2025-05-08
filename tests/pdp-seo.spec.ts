import { test, expect } from '@playwright/test';
import { PDPPage } from '../pages/pdp.page';

const PDP_URL = 'https://www.creativefabrica.com/product/christmas-tree-lantern-bundle/';
const expectedTitle = 'Christmas Tree Lantern Bundle';
const expectedPriceSinglePurchase = '3.00'; //better to get value from DB based on country; need to check format of local currency
const expectedCurrecySymbol = '$';

test.describe('Product Detail Page (PDP) - SEO', () => {
    // todo - locators needs to be moved to page object; more tests need to be added

    test.beforeEach(async ({ page }) => {
        await page.goto(PDP_URL);
        await page.waitForLoadState('domcontentloaded');
    });

    test('Validate <title> tag includes product name', async ({ page }) => {
        const pageTitle = await page.title();
        expect(pageTitle.toLowerCase()).toContain(expectedTitle.toLowerCase());
    });

    test('Validate meta description is present and non-empty', async ({ page }) => {
        const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
        expect(metaDescription).toBeTruthy();
        expect(metaDescription?.length).toBeGreaterThan(50); // minimum decent length
        expect(metaDescription?.toLowerCase()).toContain('christmas');
    });

    test('Validate canonical URL tag', async ({ page }) => {
        const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute('href');
        expect(canonicalHref).toBeTruthy();
        expect(canonicalHref).toBe(PDP_URL);
    });

    test('Validate <h1> heading contains product title', async ({ page }) => {
        const h1 = await page.locator('h1').textContent();
        expect(h1?.toLowerCase()).toContain(expectedTitle.toLowerCase());
    });

    test('Validate robots meta tag allows indexing', async ({ page }) => {
        const robotsContent = await page.locator('meta[name="robots"]').getAttribute('content');
        if (robotsContent) {
            const contentLower = robotsContent.toLowerCase();
            expect(contentLower).not.toContain('noindex');
            expect(contentLower).not.toContain('nofollow');
        }
    });

    test('Validate Open Graph meta tags are present and valid', async ({ page }) => {
        const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
        const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
        const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
        const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    
        expect(ogTitle).toBeTruthy();
        expect(ogDesc).toBeTruthy();
        expect(ogImage).toMatch(/^https?:\/\//);
        expect(ogUrl).toBe(PDP_URL);
      });

      test('Validate Twitter card meta tags are present', async ({ page }) => {
        const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
        const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
        const twitterDesc = await page.locator('meta[name="twitter:description"]').getAttribute('content');
        const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');
    
        expect(twitterCard).toBeTruthy();
        expect(twitterTitle).toBeTruthy();
        expect(twitterDesc).toBeTruthy();
        expect(twitterImage).toMatch(/^https?:\/\//);
      }); 

      test('Validate clean and descriptive URL structure', async ({ page }) => {
        const currentURL = page.url();
        expect(currentURL).toBe(PDP_URL);
        expect(currentURL).not.toContain('?');
        expect(currentURL).not.toContain('=');
        expect(currentURL).toMatch(/\/product\/christmas-tree-lantern-bundle\/?$/);
      });
    
});

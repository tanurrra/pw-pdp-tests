import { test, expect } from '@playwright/test';
import { PDPPage } from '../pages/pdp.page';

const PDP_URL = 'https://www.creativefabrica.com/product/christmas-tree-lantern-bundle/';
const expectedTitle = 'Christmas Tree Lantern Bundle';
const expectedPriceSinglePurchase = '3.00'; //better to get value from DB based on country; need to check format of local currency
const expectedCurrecySymbol = '$';

test.describe('Product Detail Page (PDP) - SEO', () => {

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
        // It's valid to not have the tag (default is index, follow)
        if (robotsContent) {
            const contentLower = robotsContent.toLowerCase();
            expect(contentLower).not.toContain('noindex');
            expect(contentLower).not.toContain('nofollow');
        }
    });
});

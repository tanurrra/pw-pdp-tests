import { test, expect } from '@playwright/test';
import { PDPPage } from '../pages/pdp.page';

const PDP_URL = 'https://www.creativefabrica.com/product/christmas-tree-lantern-bundle/';
const expectedTitle = 'Christmas Tree Lantern Bundle';
const expectedPriceSinglePurchase = '3.00'; //better to get value from DB based on country; need to check format of local currency
const expectedCurrecySymbol = '$';

test.describe('Product Detail Page (PDP) - Functional Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(PDP_URL);
        await page.waitForLoadState('domcontentloaded');
    });

    test('1. Product title and description are visible', async ({ page }) => {
        const pdpPage = new PDPPage(page);
        const title = await pdpPage.productTitle.textContent();
        expect(title?.toLowerCase()).toContain(expectedTitle.toLowerCase());
        await expect(pdpPage.productDescription).toBeVisible();
        await expect(pdpPage.productDescription).not.toHaveText('');
    });

    test('2. Verify product images and preview', async ({ page }) => {
        const pdpPage = new PDPPage(page);
        await expect(pdpPage.fotoramaFrame).toBeVisible();
        await expect(pdpPage.fotoramaFrame.locator('img')).toHaveAttribute('src', /https?:\/\//);
        const count = await pdpPage.thumbnails.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const image = pdpPage.thumbnails.nth(i).locator('img');
            await expect(image).toBeVisible();
            await expect(image).toHaveAttribute('src', /https?:\/\//);
            // check for zoom/preview modal here
        }
    });

    test('3. PDP shows Price and Free trial information for guest user without subscription', async ({ page }) => {
        const pdpPage = new PDPPage(page);
        // Check if free trial is visible 
        await expect.soft(pdpPage.productDetailBoxFreeTrialAccess).toBeVisible();
        const priceText = await pdpPage.productDetailBoxFreeTrialAccess.first().textContent();
        expect.soft(priceText).toContain('Free');

        // single purchase price should be visible
        await pdpPage.singlePurchasePriceContainer.scrollIntoViewIfNeeded();
        await expect.soft(pdpPage.singlePurchasePriceContainer).toBeVisible();
        await expect.soft(pdpPage.singlePurchasePriceContainer).toContainText('Product is available as single purchase for');
        // use regexp to  keep only numbers and dots; need to check price format as well based on the country
        const actualSinglePurchasePrice = (await pdpPage.singlePurchasePrice.innerText()).match(/[\d,.]+/);
        expect.soft(actualSinglePurchasePrice ? actualSinglePurchasePrice[0] : '').toBe(expectedPriceSinglePurchase);
        await expect.soft(pdpPage.singlePurchaseCurrencySymbol).toHaveText(expectedCurrecySymbol); // currency symbol should be based on the country
    });

    test('4. Verify Download/Free trial Button is visible for guest user without subscription', async ({ page }) => {
        const pdpPage = new PDPPage(page);
        // download button on product detail box (dissapearing modal)
        await pdpPage.productDetailBoxDownloadBtn.isVisible();
        const href = await pdpPage.productDetailBoxDownloadBtn.getAttribute('href');
        expect(href || '').toContain('/free-trial');

        // Option: simulate click and assert redirect
    });

});

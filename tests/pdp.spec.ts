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

    test('1. Verify product title and description', async ({ page }) => {
        const title = await page.locator('#product-title').textContent();
        expect(title?.toLowerCase()).toContain(expectedTitle.toLowerCase());

        const description = page.locator('#single-product-description');
        await expect(description).toBeVisible();
        await expect(description).not.toHaveText('');
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
            // Optionally check for zoom/preview modal here
        }
    });

    test('3. PDP shows Price and Free trial information for guest user without subscription', async ({ page }) => {
        // Check if free trial is visible 
        const pdpPage = new PDPPage(page);
        await expect.soft(pdpPage.productDetailBoxFreeTrialAccess).toBeVisible();
        const priceText = await pdpPage.productDetailBoxFreeTrialAccess.textContent();
        expect.soft(priceText).toContain('Free');

        // single purchase price should be visible
        await pdpPage.singlePurchasePriceContainer.scrollIntoViewIfNeeded();
        await expect(pdpPage.singlePurchasePriceContainer).toBeVisible();
        await expect(pdpPage.singlePurchasePriceContainer).toContainText('Product is available as single purchase for');
        // use regexp to  keep only numbers and dots; need to check price format as well based on the country
        const actualSinglePurchasePrice = (await pdpPage.singlePurchasePrice.innerText()).match(/[\d,.]+/);
        expect(actualSinglePurchasePrice ? actualSinglePurchasePrice[0] : '').toBe(expectedPriceSinglePurchase);
        await expect(pdpPage.singlePurchaseCurrencySymbol).toHaveText(expectedCurrecySymbol); // currency symbol should be based on the country
    });

    test('4. Verify Download/Free trial Button Functionality for guest user without subscription', async ({ page }) => {
        const pdpPage = new PDPPage(page);
        // download button on product detail box (dissapearing modal)
        await pdpPage.productDetailBoxDownloadBtn.isVisible();
        const href = await pdpPage.productDetailBoxDownloadBtn.getAttribute('href');
        expect(href || '').toContain('/p/free-trial');

        // Option: simulate click and assert redirect
    });

});

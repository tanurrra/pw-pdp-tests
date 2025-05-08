import { Locator, Page } from "@playwright/test";


export class PDPPage {
    page: Page;
    readonly pdpContainer: Locator;
    readonly productDetailBoxDownloadBtn: Locator;
    readonly singlePurchasePriceContainer: Locator;
    readonly singlePurchaseCurrencySymbol: Locator;
    readonly productDetailBoxFreeTrialAccess: Locator;
    readonly singlePurchasePrice: Locator;
    readonly thumbnails: Locator;
    readonly fotoramaFrame: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pdpContainer = page.locator('#js-show-modal-when-dissapear');

        this.fotoramaFrame = page.locator('//div[contains(@class, "fotorama__stage__frame") and contains(@class, "active")]');
        this.thumbnails = page.locator('div.fotorama__nav__frame');

        this.singlePurchasePriceContainer = page.locator('#product-price-usd');
        this.singlePurchaseCurrencySymbol = page.locator('#product-price-usd').locator('.woocommerce-Price-currencySymbol');
        this.singlePurchasePrice = page.locator('#product-price-usd').locator('.woocommerce-Price-amount.amount');
        
        this.productDetailBoxDownloadBtn = page.locator('#js-show-modal-when-dissapear').locator('a:has-text("Download")');
        this.productDetailBoxFreeTrialAccess = page.locator('//div[@id="js-show-modal-when-dissapear"]//div[@class= "col-sm-6"]');
    }
}
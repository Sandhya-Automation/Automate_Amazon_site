
import { expect } from "@playwright/test";
export class HomePage{

    constructor(page){

        this.searchBox= page.getByPlaceholder("Search Amazon.co.uk")
        this.amazonLogo=page.locator("//a[@id='nav-logo-sprites']");
        this.accountAndLists=page.locator("//div[@class='nav-line-1-container']")
        this.ruturnsAndOrders=page.locator("//a[@id='nav-orders']")
        this.cart=page.locator("//div[@id='nav-cart-text-container']")
        this.signInBtn=page.locator("//span[contains(text(),'Sign in') and @class='nav-action-inner']")
        this.searchBtn=page.locator("#nav-search-submit-button")
        this.rejectCookies=page.locator("#sp-cc-rejectall-link")
        this.viewCart=page.locator("//div[@id='nav-tools']//a[@id='nav-cart']")
    }
    async validateSearchBoxElement(){
        await expect(this.searchBox).toBeVisible(); 
    }
    async validateAmazonLogoElement(){
        await expect(this.amazonLogo).toBeVisible(); 
    }
    async validateAccountAndListsElement(){
        await expect(this.accountAndLists).toBeVisible(); 
    }
    async validateReturnsAndOrdersElement(){
        await expect(this.ruturnsAndOrders).toBeVisible(); 
    }
    async validateCartElement(){
        await expect(this.cart).toBeVisible(); 
    }
    async clickToSignIn(){
        await this.accountAndLists.hover()
        await expect(this.signInBtn).toBeVisible()
        await this.signInBtn.click();
    }
    async searchProduct(productName){
            await this.searchBox.fill(productName)
            await this.searchBtn.click();
    }
    async sortCookies(){
            await this.rejectCookies.click()
    }
    async clickOnCart(){
        await this.viewCart.click()

    }


}
import { expect } from "playwright/test";

export class ProductPage{
constructor(page){
    this.addToCartBtn=page.locator("//input[@name='submit.add-to-cart']")
    this.goToBasketBtn=page.locator("//div[@id='sw-atc-buy-box']//a[contains(text(),'Go to basket')]")
    
}
async addToCart(){
        await this.addToCartBtn.click()

    }
async goToBasket(){
    await this.goToBasketBtn.click()
}
    

}
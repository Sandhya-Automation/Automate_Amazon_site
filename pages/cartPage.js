import { expect } from "playwright/test";

export class CartPage{
constructor(page){
    this.addToCartBtn=page.locator("//input[@name='submit.add-to-cart']")
    this.page=page
    this.productNameList=page.locator("//ul[@data-name='Active Items']//span[@class='a-truncate-full a-offscreen']")

}
    async verifyProductName(productName){
        let count;
        await console.log(productName)
        count=await this.productNameList.count()
        console.log("Number of items in this list are:",count)
        for(let i=0;i<count;i++)
        {
            let text=await this.productNameList.nth(i).innerText();
            console.log("text is",text)
            console.log("pname:",productName)
            await expect(text).toContain(productName)

        
        }
    }


}
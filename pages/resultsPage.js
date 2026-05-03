import { expect } from "playwright/test";

export class ResultsPage{

    constructor(page){
        this.brandName=page.locator("//div[@data-component-type='s-search-result']//span[@class='a-size-medium a-color-base']")

        //this.parentProduct=(productName)=>page.locator(`//div[@data-cy='title-recipe']//span[contains(text(),'${productName}')]/ancestor::div[@data-cy='title-recipe']/parent::div`)

        this.productName=page.locator("//div[@data-cy='title-recipe']//span[contains(text(),'iPhone 17 Pro Max 256 GB')]")
       // this.productName=(product)=>page.locator(`//div[@id='${product}']/h1/span`)
        this.iphoneOrange=page.locator("//h2[@aria-label='iPhone 17 Pro Max 256 GB: 6.9-inch Display with ProMotion, A19 Pro Chip, Best Battery Life in Any iPhone Ever, Pro Fusion Camera System, Center Stage Front Camera; Deep Blue']/ancestor::div[@class='a-section a-spacing-small a-spacing-top-small']//a[@aria-label='Cosmic Orange']/span")
        //this.addToCartBtn=page.locator("//h2[@aria-label='iPhone 17 Pro Max 256 GB: 6.9-inch Display with ProMotion, A19 Pro Chip, Best Battery Life in Any iPhone Ever, Pro Fusion Camera System, Center Stage Front Camera; Deep Blue']/ancestor::div[@class='a-section a-spacing-small a-spacing-top-small']//button[@name='submit.addToCart']")
    //to provide dynamic data to the locator we can use template literals- ${variable}
        this.productPrice=page.locator("//div[@data-cy='title-recipe']//span[contains(text(),'iPhone 17 Pro Max 256 GB: 6.9-inch Display with ProMotion, A19 Pro Chip, Best Battery Life in Any iPhone Ever, Pro Fusion Camera System, Center Stage Front Camera; Deep Blue')]/ancestor::div[@data-cy='title-recipe']/following-sibling::div[@class='puisg-row puis-desktop-list-row']//span[@class='a-offscreen']")
        this.addToCartBtn=page.locator("//div[@data-cy='title-recipe']//span[contains(text(),'iPhone 17 Pro Max 256 GB: 6.9-inch Display with ProMotion, A19 Pro Chip, Best Battery Life in Any iPhone Ever, Pro Fusion Camera System, Center Stage Front Camera; Deep Blue')]/ancestor::div[@data-cy='title-recipe']/following-sibling::div[@class='puisg-row puis-desktop-list-row']//button[@name='submit.addToCart']")

    }
    async findTheOddProduct(productName){
        const count=await this.brandName.count()
        console.log("total count:",count)
        console.log("Products other than Apple are:")
        for(let i=0;i<count;i++){
            const text=await this.brandName.nth(i).textContent()
            //console.log("Brand name:", text)
            if(text!='Apple')
                console.log(text)
        }
    }
    async selectTheRightProduct(){
        await this.iphoneOrange.scrollIntoViewIfNeeded();
        await this.iphoneOrange.click()

    }
    async getTheProductName(){
        const pname=await this.productName.nth(0).innerText()
        console.log("from get method-",pname)
        return pname
    }
    async addToCart(){
        await this.addToCartBtn.first().click()

    }

    
}
import { expect } from "playwright/test";

export class LoginPage{

    constructor(page){
        this.page = page;
        this.username=page.locator("#ap_email")
        this.password=page.locator("#ap_password")
        this.continueBtn=page.locator("//span[@class='a-button-inner']/input")
        this.signinBtn=page.locator("#signInSubmit")
        this.errorAlert=page.locator("//div[@class='a-alert-content']").first()
        this.errorMessage=page.locator("//div[@class='a-box-inner']//h4")
        this.verifyMessage=page.locator("//*[contains(text(),'Verify using WhatsApp instead')]")


    }
    
    async loginToAmazon(username, password){
        await this.username.fill(username)
        await this.continueBtn.click()
        await this.password.type(password)
        await this.signinBtn.click();
    }

    // Helper methods for negative testing
    async enterEmail(email){
        await this.username.fill(email)
    }
    async verifyMessageAfterLogin(){
        const text = await this.verifyMessage.textContent()
        console.log(text)
        await expect(this.verifyMessage).toContainText("Verify")
    }
    async clickContinue(){
        await this.continueBtn.click()
    }

    async enterPassword(password){
        await this.password.fill(password)
    }

    async clickSignIn(){
        await this.signinBtn.click()
    }

    async getErrorMessage(){
        try{
            await this.errorAlert.waitFor({state: 'visible', timeout: 3000})
            return await this.errorAlert.textContent()
        } catch(e){
            return null
        }
    }

    async isErrorVisible(){
        await this.errorAlert.toBeVisible()
        return true  
        // try{
        //     await this.errorAlert.waitFor({state: 'visible', timeout: 4000})
        //     return true
        // } catch(e){
        //     return false
        // }
    }

    async clearEmailField(){
        await this.username.clear()
    }

    async clearPasswordField(){
        await this.password.clear()
    }
}
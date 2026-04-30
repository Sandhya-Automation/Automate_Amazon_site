import {LoginPage} from "../pages/loginPage.js"
import {HomePage} from "../pages/homePage.js"
import {test,expect} from "@playwright/test"
import fs from 'fs';

const filePath="testData/creds.json"
const data=JSON.parse(fs.readFileSync(filePath,'utf-8'))
//fs is file syatem, 

test.describe("Login page- positive test cases", async() =>{
    test.skip('login to amazon', async({page})=>{
        await page.goto('https://www.amazon.co.uk/');
        const home = new HomePage(page);
        await page.waitForTimeout(5000)
        home.clickToSignIn();
        await page.waitForTimeout(5000)
        const login=new LoginPage(page)
        await login.loginToAmazon(data.username, data.password);
        console.log(data.products.productname)
        await page.waitForTimeout(5000)


    })
})

test.describe("Login Page - Negative Test Cases", async() => {

    test.beforeEach(async({page}) => {
        await page.goto('https://www.amazon.co.uk/');
        const home = new HomePage(page);
        await page.waitForTimeout(2000)
        await home.clickToSignIn();
        await page.waitForTimeout(2000)
    })

    // TC1: Empty email field
    test.skip('TC1 - Should display error when email field is empty', async({page})=>{
        const login = new LoginPage(page)
        await login.clickContinue();
        await page.waitForTimeout(3000)
        await expect(page.locator("//*[contains(text(),'Enter your e-mail address')]")).toContainText("Enter your e-mail address or mobile phone")
        // await expect(
        //     page.getByText("Enter your e-mail address or mobile phone")
        //     ).toBeVisible();
    })

    // TC2: Invalid email format - no @ symbol
    test.skip('TC2 - Should display error for invalid email format (no @ symbol)', async({page})=>{
        const login = new LoginPage(page)
        await login.enterEmail("invalidemail")
        await login.clickContinue();
        await page.waitForTimeout(1500)
        await expect(page.locator("//*[contains(text(),'Invalid e-mail address')]")).toContainText("Wrong or Invalid e-mail address")
    })

    // TC3: Invalid email format - missing domain
    test.skip('TC3 - Should display error for invalid email format (missing domain)', async({page})=>{
        const login = new LoginPage(page)
        await login.enterEmail("test@")
        await login.clickContinue();
        await page.waitForTimeout(1500)
        await expect(page.locator("//*[contains(text(),'Invalid e-mail address')]")).toContainText("Wrong or Invalid e-mail address")
    })

    // TC4: Invalid email format - missing username
    test.skip('TC4 - Should display error for invalid email format (missing username)', async({page})=>{
        const login = new LoginPage(page)
        await login.enterEmail("@example.com")
        await login.clickContinue();
        await page.waitForTimeout(1500)
        await expect(page.locator("//*[contains(text(),'Invalid e-mail address')]")).toContainText("Wrong or Invalid e-mail address")
    })

    // TC5: Email with spaces
    test.skip('TC5 - Should display error for email with spaces', async({page})=>{
        const login = new LoginPage(page)
        await login.enterEmail("test email@example.com")
        await login.clickContinue();
        await page.waitForTimeout(1500)
        await expect(page.locator("//*[contains(text(),'Invalid e-mail address')]")).toContainText("Wrong or Invalid e-mail address")
    })

    // TC6: Non-existent email (valid format)
    test.skip('TC6 - Should display error for non-existent email account', async({page})=>{
        const login = new LoginPage(page)
        await login.enterEmail("nonexistentuser12345@example.com")
        await login.clickContinue();
        await page.waitForTimeout(2000)
       
        await expect(page.locator("//*[contains(text(),'account with that e-mail address')]")).toContainText("We cannot find an account with that e-mail address")
    })

    // // TC7: Email with leading whitespace
    // test('TC7 - Should handle email with leading whitespace', async({page})=>{
    //     const login = new LoginPage(page)
    //     await login.enterEmail("  test@example.com")
    //     await login.clickContinue();
    //     await page.waitForTimeout(1500)
    //     // Amazon should either trim or reject the email
    //    await expect(page.locator("//*[contains(text(),'Invalid e-mail address')]")).toContainText("Wrong or Invalid e-mail address")
    // })

    // TC8: Email with multiple @ symbols
    test.skip('TC8 - Should display error for email with multiple @ symbols', async({page})=>{
        const login = new LoginPage(page)
        await login.enterEmail("test@@example.com")
        await login.clickContinue();
        await page.waitForTimeout(1500)
        await expect(page.locator("//*[contains(text(),'Invalid e-mail address')]")).toContainText("Wrong or Invalid e-mail address")
    })

    // TC9: Email with special characters
    test.skip('TC9 - Should display error for email with special characters', async({page})=>{
        const login = new LoginPage(page)
        await login.enterEmail("test<script>@example.com")
        await login.clickContinue();
        await page.waitForTimeout(1500)
        await expect(page.locator("//*[contains(text(),'Invalid e-mail address')]")).toContainText("Wrong or Invalid e-mail address")
    })

    // TC10: Very long email
    test.skip('TC10 - Should handle very long email input', async({page})=>{
        const login = new LoginPage(page)
        const longEmail = "a".repeat(250) + "@example.com"
        await login.enterEmail(longEmail)
        await login.clickContinue();
        await page.waitForTimeout(3000)
        console.log("tc10",await page.locator("//*[contains(text(),'account with that e-mail address')]").textContent())
        await expect(page.locator("//*[contains(text(),'account with that e-mail address')]")).toContainText("We cannot find an account with that e-mail address")
    })

    // TC11: SQL Injection attempt in email
    test.skip('TC11 - Should handle SQL injection attempt in email', async({page})=>{
        const login = new LoginPage(page)
        await login.enterEmail("admin' OR '1'='1@example.com")
        await login.clickContinue();
        await page.waitForTimeout(3000)
        await expect(page.locator("//*[contains(text(),'Invalid e-mail address')]")).toContainText("Wrong or Invalid e-mail address")
    })

    // TC12: Empty password field (valid email entered)
    test.skip('TC12 - Should display error when password field is empty', async({page})=>{
       const login = new LoginPage(page)
       await login.enterEmail("abc@gmail.com")
        await login.clickContinue();
        await page.waitForTimeout(3000)
        await login.clickSignIn()
        console.log("tc10",await page.locator("//*[contains(text(),'Enter your password')]").textContent())
        await expect(page.locator("//*[contains(text(),'Enter your password')]")).toContainText("Enter your password")
        // This test requires a valid email that exists or use a test account
        // For now, we'll skip this as it requires valid credentials
        //test.skip()
    })

    // TC14: Email with numeric only domain
    test.skip('TC14 - Should handle email with numeric domain', async({page})=>{
        const login = new LoginPage(page)
        await login.enterEmail("test@12345.com")
        await login.clickContinue();
        await page.waitForTimeout(2000)
        // Should show non-existent account error as this domain likely doesn't have the account
        const errorMsg = await page.locator("//div[@class='a-alert-content']").first().textContent()
        expect(errorMsg).toBeDefined()
    })

    // TC15: Email with hyphen in domain
    test.skip('TC15 - Should handle email with hyphen in domain', async({page})=>{
        const login = new LoginPage(page)
        await login.enterEmail("test@test-domain.com")
        await login.clickContinue();
        await page.waitForTimeout(2000)
        await expect(page.locator("//*[contains(text(),'account with that e-mail address')]")).toContainText("We cannot find an account with that e-mail address")
    })


    // TC17: Empty email with special character handling
    test.skip('TC17 - Should display error when only spaces are entered', async({page})=>{
        const login = new LoginPage(page)
        await login.enterEmail("    ")
        await login.clickContinue();
        await page.waitForTimeout(1500)
        await expect(page.locator("//*[contains(text(),'Enter your e-mail address')]")).toContainText("Enter your e-mail address or mobile phone")
    })

    // TC18: Tab character in email
    test.skip('TC18 - Should handle tab character in email field', async({page})=>{
        const login = new LoginPage(page)
        await login.username.fill("test\t@example.com")
        await login.clickContinue();
        await page.waitForTimeout(1500)
        await expect(page.locator("//*[contains(text(),'Invalid e-mail address')]")).toContainText("Wrong or Invalid e-mail address")
    })

    // TC19: Newline character in email
    test.skip('TC19 - Should handle newline character in email field', async({page})=>{
        const login = new LoginPage(page)
        await login.username.fill("test\n@example.com")
        await login.clickContinue();
        await page.waitForTimeout(1500)
        await expect(page.locator("//*[contains(text(),'Invalid e-mail address')]")).toContainText("Wrong or Invalid e-mail address")
    })


    // TC20: Email with consecutive dots
    test.skip('TC20 - Should display error for email with consecutive dots', async({page})=>{
        const login = new LoginPage(page)
        await login.enterEmail("test..user@example.com")
        await login.clickContinue();
        await page.waitForTimeout(1500)
        await expect(page.locator("//*[contains(text(),'account with that e-mail address')]")).toContainText("We cannot find an account with that e-mail address")
    })

    // TC21: Very short email format
    test.skip('TC21 - Should handle very short email', async({page})=>{
        const login = new LoginPage(page)
        await login.enterEmail("a@b")
        await login.clickContinue();
        await page.waitForTimeout(1500)
       await expect(page.locator("//*[contains(text(),'Invalid e-mail address')]")).toContainText("Wrong or Invalid e-mail address")

    })

})

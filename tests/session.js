import {test as setup} from "@playwright/test"
import {LoginPage} from "../pages/loginPage.js"
import {HomePage} from "../pages/homePage.js"
import fs from 'fs';



const authFile="testData/cookies.json"
setup.use({browserName:'firefox'})
setup('Login Authencator', async({page})=>{
        // Read credentials from JSON file
        const filePath="testData/creds.json"
        const data=JSON.parse(fs.readFileSync(filePath,'utf-8'))

        // Navigate to Amazon and sort cookies
        await page.goto('https://www.amazon.co.uk/');
        const home = new HomePage(page);
        await home.sortCookies();
        await page.waitForTimeout(3000)

        // Click on Sign In
        home.clickToSignIn();
        await page.waitForTimeout(3000)
        const login=new LoginPage(page)

        // Perform login using credentials from JSON
        await login.loginToAmazon(data.username, data.password);
        console.log(data.products.productname)
        await page.waitForTimeout(3000)

        // Verify login and save storage state
        await login.verifyMessageAfterLogin()
        await page.context().storageState({path: authFile})
    })
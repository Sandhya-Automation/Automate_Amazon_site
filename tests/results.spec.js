import {LoginPage} from "../pages/loginPage.js"
import {HomePage} from "../pages/homePage.js"
import {ResultsPage} from "../pages/resultsPage.js"

import {test} from "@playwright/test"

test("search for a product which are not apple", async({page})=> {
        await page.goto('https://www.amazon.co.uk/');
        const home = new HomePage(page);
        home.sortCookies();
        await home.searchProduct("iphone 17 pro max");
        const resultsObj=new ResultsPage(page);
        await page.waitForTimeout(8000)
        await resultsObj.findTheOddProduct("Apple")
        await page.waitForTimeout(10000)

    })
    //h2[@aria-label='iPhone 17 Pro Max 256 GB: 6.9-inch Display with ProMotion, A19 Pro Chip, Best Battery Life in Any iPhone Ever, Pro Fusion Camera System, Center Stage Front Camera; Deep Blue']/ancestor::div[@class='a-section a-spacing-small a-spacing-top-small']//a[@aria-label='Cosmic Orange']/span

    test("find product and add to cart",async({page})=>{
        await page.goto('https://www.amazon.co.uk/');
        const home = new HomePage(page);
        home.sortCookies();
        await home.searchProduct("iphone 17 pro max");
        const resultsObj=new ResultsPage(page);
        await page.waitForTimeout(8000)
        await resultsObj.selectTheRightProduct();
        await page.waitForTimeout(5000)

    })
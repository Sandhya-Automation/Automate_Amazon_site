import {LoginPage} from "../pages/loginPage.js"
import {HomePage} from "../pages/homePage.js"
import {ResultsPage} from "../pages/resultsPage.js"
import {ProductPage} from "../pages/productPage.js"
import {CartPage} from "../pages/cartPage.js"
import {test} from "@playwright/test"

test("verify the product in cart", async({page})=>{
    await page.goto('https://www.amazon.co.uk/');
    const home = new HomePage(page);
    await home.sortCookies();
    await home.searchProduct("iphone 17 pro max");
    const resultsObj=new ResultsPage(page);
    await page.waitForTimeout(8000)
    await resultsObj.selectTheRightProduct();
    const productName=await resultsObj.getTheProductName()
    const productObj=new ProductPage(page)
    console.log("Product Name is:",productName)
    productObj.addToCart()
    await page.waitForTimeout(5000)
    productObj.goToBasket()
    await page.waitForTimeout(5000)
    const cartObj=new CartPage(page)
    cartObj.verifyProductName(productName)
    await page.waitForTimeout(10000)

})
import {LoginPage} from "../pages/loginPage.js"
import {HomePage} from "../pages/homePage.js"
import {ResultsPage} from "../pages/resultsPage.js"
import {ProductPage} from "../pages/productPage.js"
import {test} from "@playwright/test"

test("add the product to cart", async({page})=>{
    await page.goto('https://www.amazon.co.uk/');
    const home = new HomePage(page);
    home.sortCookies();
    await home.searchProduct("iphone 17 pro max");
    const resultsObj=new ResultsPage(page);
    await page.waitForTimeout(8000)
    const productName=await resultsObj.getTheProductName()
    await resultsObj.selectTheRightProduct();
    const productObj=new ProductPage(page)
    await console.log("Product Name is:",productName)
    productObj.addToCart()
    await page.waitForTimeout(5000)
    productObj.goToBasket();
    await page.waitForTimeout(10000)


})
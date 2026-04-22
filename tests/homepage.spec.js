import {test,expect} from '@playwright/test';
import { HomePage } from '../pages/homePage';

//test.describe.configure({mode:'parallel'})
//or
//test.describe.configure({mode:'serial'})
test.describe('Homepage tests', () => {
    test('validate home page elements', async ({page}) =>{
        await page.goto('https://www.amazon.co.uk/');
        const home = new HomePage(page);
        await page.waitForTimeout(5000)
        await home.validateSearchBoxElement();
        await home.validateAmazonLogoElement();
        await home.validateAccountAndListsElement();
        await home.validateReturnsAndOrdersElement();
        await home.validateCartElement();
        await page.waitForTimeout(2000)

    })
    test.skip('hover to sign in', async({page}) =>{

        await page.goto('https://www.amazon.co.uk/');
        const home = new HomePage(page);
        await page.waitForTimeout(5000)
        home.clickToSignIn();
        await page.waitForTimeout(5000)

    })

    


})

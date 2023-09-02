import { browser, $ } from '@wdio/globals'
import { expect } from 'chai'
import LoginPage from '../pageobjects/login.page.js';

describe('Valid Login', () => {
    it('should allow a user to log in with valid credentials', async () => {
        await browser.url('https://www.saucedemo.com');
        await LoginPage.login('standard_user', 'secret_sauce');

        const currentUrl = await browser.getUrl();
        // Check if the URL contains '/inventory.html'
        expect(currentUrl).to.include('/inventory.html');
        expect(await $('.inventory_list').isDisplayed()).to.be.true;
        expect(await $('.shopping_cart_container').isDisplayed()).to.be.true;
    });
});

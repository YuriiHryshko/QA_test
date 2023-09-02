import { browser, $, $$ } from '@wdio/globals';
import { expect } from 'chai';
import LoginPage from '../pageobjects/login.page.js';

describe('Logout', () => {
    it('should log the user out and redirect to the login page', async () => {
        // Ensure that the user is logged in
        await browser.url('https://www.saucedemo.com');
        await LoginPage.login('standard_user', 'secret_sauce');
        
        // Ensure that the menu is not visible
        const menuButton = await $('.bm-burger-button');
        await menuButton.click();
        
        const menuItems = await $$('.bm-item');
        expect(menuItems.length).to.equal(4); // Check that the menu is expanded and contains 4 items
        
        // Log out of the account
        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.click();
        
        // Check if the user is redirected to the login page
        expect(await browser.getUrl()).to.equal('https://www.saucedemo.com/');
        
        // Check if the "Username" and "Password" fields are empty
        expect(await $('#user-name').getValue()).to.equal('');
        expect(await $('#password').getValue()).to.equal('');
    });
});

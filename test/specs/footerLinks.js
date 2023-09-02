import { browser } from '@wdio/globals';
import { expect } from 'chai';
import LoginPage from '../pageobjects/login.page.js';

describe('Footer Links', () => {
    let originalWindowHandle; // Store a reference to the original window

    before(async () => {
        // Preconditions: User is logged in and on the inventory page
        await browser.url('https://www.saucedemo.com');
        await LoginPage.login('standard_user', 'secret_sauce');
        originalWindowHandle = await browser.getWindowHandle();
    });

    it('should open Twitter link in a new tab', async () => {
        // Click on the "Twitter" link in the footer and open it in a new tab
        const twitterLink = await $('=Twitter');
        await twitterLink.click({ button: 'middle' });
        await browser.switchToWindow((await browser.getWindowHandles())[1]);

        // Ensure that the URL contains "twitter.com"
        const currentURL = await browser.getUrl();
        expect(currentURL).to.include('twitter.com');

        // Close the new tab and return to the original tab
        await browser.closeWindow();
        await browser.switchToWindow(originalWindowHandle);
    });

    it('should open Facebook link in a new tab', async () => {
        // Click on the "Facebook" link in the footer and open it in a new tab
        const facebookLink = await $('=Facebook');
        await facebookLink.click({ button: 'middle' });
        await browser.switchToWindow((await browser.getWindowHandles())[1]);

        // Ensure that the URL contains "facebook.com"
        const currentURL = await browser.getUrl();
        expect(currentURL).to.include('facebook.com');

        // Close the new tab and return to the original tab
        await browser.closeWindow();
        await browser.switchToWindow(originalWindowHandle);
    });

    it('should open Linkedin link in a new tab', async () => {
        // Click on the "LinkedIn" link in the footer and open it in a new tab
        const linkedinLink = await $('=LinkedIn');
        await linkedinLink.click({ button: 'middle' }); // Відкрити у новій вкладці
        await browser.switchToWindow((await browser.getWindowHandles())[1]); // Переключитися на нову вкладку

        // Ensure that the URL contains "linkedin.com"
        const currentURL = await browser.getUrl();
        expect(currentURL).to.include('linkedin.com');

        // Close the new tab and return to the original tab
        await browser.closeWindow();
        await browser.switchToWindow(originalWindowHandle);
    });
});

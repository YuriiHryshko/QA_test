import { browser, $ } from '@wdio/globals'
import { expect } from 'chai'
import LoginPage from '../pageobjects/login.page.js';

describe('Login with invalid password', () => {
    it('should display an error message for an invalid password', async () => {
        await browser.url('https://www.saucedemo.com');
        await LoginPage.login('standard_user', 'invalid_password');

        // Check if the password is displayed as asterisks
        const passwordInput = await $('#password');
        const inputType = await passwordInput.getAttribute('type');
        expect(inputType).to.equal('password');

        // Find all elements with the 'form_group' class
        const formGroups = await $$('.form_group');

        // Check each 'form_group' for the presence of an error icon
        for (const formGroup of formGroups) {
            // Find the input field with an error in the current form_group
            const errorInput = await formGroup.$('.input_error');

            const inputBorderColor = await errorInput.getCSSProperty('border-bottom-color');
                // Check if the border color is red 
            expect(inputBorderColor.parsed.hex).to.equal('#e2231a');

            // Find the error icon in the current form_group
            const errorIcon = await formGroup.$('svg.error_icon');
            
            // Check if the error icon is displayed
            const isIconDisplayed = await errorIcon.isDisplayed();
            expect(isIconDisplayed).to.be.true; // Check if the error icon is displayed
        }

        // Check the error message text
        expect(await $('.error-message-container').getText()).to.equal('Epic sadface: Username and password do not match any user in this service');
    });
});
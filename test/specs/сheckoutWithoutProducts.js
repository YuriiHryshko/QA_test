import { browser } from '@wdio/globals';
import { expect } from 'chai';
import LoginPage from '../pageobjects/login.page.js';

describe('Checkout without products', () => {
    it('should display error message when trying to checkout without adding products', async () => {
        await browser.url('https://www.saucedemo.com');
        await LoginPage.login('standard_user', 'secret_sauce');

        // Click on the "Cart" button in the top right corner
        const cartButton = await $('.shopping_cart_link');
        await cartButton.click();

        // Ensure that the user is redirected to the cart page
        const cartURL = await browser.getUrl();
        expect(cartURL).to.include('cart.html');

        // Click on the "Checkout" button
        const checkoutButton = await $('.checkout_button');
        await checkoutButton.click();
		
        // Click on the "Checkout" button
        const cartStatus = await $('//*[@id="cart_contents_container"]/div/div[1]/div[3]');
        if (cartStatus.getAttribute('class') != 'cart_item'){

			// Ensure that an empty cart error message is displayed
		    const errorMessage = await $('.error-message-container');
			const errorMessageText = await errorMessage.getText();
			expect(errorMessageText).to.include('Cart is empty');
		
		}

    });
});
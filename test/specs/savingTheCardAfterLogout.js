import { browser, $ } from '@wdio/globals';
import { expect } from 'chai';
import LoginPage from '../pageobjects/login.page.js';

describe('Saving the cart after logout', () => {
    it('should save the cart after logout and login again', async () => {
        // Ensure that the user is logged in
        await browser.url('https://www.saucedemo.com');
        await LoginPage.login('standard_user', 'secret_sauce');
        
        // Click on the "Add to cart" button for any product
        const addToCartButton = await $('.btn_primary');
        await addToCartButton.click();
        
        // Ensure that the number next to the cart has increased by 1
        const cartBadge = $('#shopping_cart_container .shopping_cart_badge');
        const cartBadgeText = await cartBadge.getText();
        expect(cartBadgeText).to.equal('1');
        
        // Click on the "Burger" button in the upper left corner
        const menuButton = await $('.bm-burger-button');
        await menuButton.click();
        
        // Ensure that the menu is expanded and contains 4 items
        const menuItems = await $$('.bm-item');
        expect(menuItems.length).to.equal(4);

        // Click on the "Logout" button
        const logoutButton = await $('#logout_sidebar_link');
        await logoutButton.click();
        
        // Ensure that the user is redirected to the login page
        const currentURL = await browser.getUrl();
        expect(currentURL).to.equal('https://www.saucedemo.com/');
        
        // Ensure that the "Username" and "Password" fields are empty
        const usernameInputValue = await $('#user-name').getValue();
        expect(usernameInputValue).to.equal('');
        
        const passwordInputValue = await $('#password').getValue();
        expect(passwordInputValue).to.equal('');
        
        // Log in again with the same username and password
        await LoginPage.login('standard_user', 'secret_sauce');
        
        // Ensure that the user is redirected to the inventory page
        const inventoryURL = await browser.getUrl();
        expect(inventoryURL).to.equal('https://www.saucedemo.com/inventory.html');
        
        // Ensure that the products and cart are displayed
        const isInventoryDisplayed = await $('.inventory_list').isDisplayed();
        expect(isInventoryDisplayed).to.be.true;
        
        const isCartDisplayed = await $('#shopping_cart_container').isDisplayed();
        expect(isCartDisplayed).to.be.true;
        
        // Click on the "Cart" button in the upper right corner
        const cartButton = await $('#shopping_cart_container');
        await cartButton.click();
        
        // Ensure that the cart page is displayed
        const cartURL = await browser.getUrl();
        expect(cartURL).to.equal('https://www.saucedemo.com/cart.html');
        
        // Ensure that the products in the cart are displayed and match what was added
        const cartItems = await $$('.cart_item');
        expect(cartItems.length).to.equal(1);
        const cartItemName = await cartItems[0].$('.inventory_item_name').getText();
        expect(cartItemName).to.equal('Sauce Labs Backpack');
    });
});

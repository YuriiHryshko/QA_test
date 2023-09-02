import { browser, $, $$ } from '@wdio/globals';
import { expect } from 'chai';
import LoginPage from '../pageobjects/login.page.js';

describe('Valid Checkout', () => {
    it('should complete a valid checkout process', async () => {
        // Ensure that the user is logged in
        await browser.url('https://www.saucedemo.com');
        await LoginPage.login('standard_user', 'secret_sauce');
        
        // Click on the "Add to cart" button for any product
        const addToCartButton = await $('.btn_primary');
        await addToCartButton.click();

        // Ensure that the cart badge count increased by 1
        const cartBadge = $('#shopping_cart_container .shopping_cart_badge');
        const cartBadgeText = await cartBadge.getText();
        expect(cartBadgeText).to.equal('1');

        // Click on the "Cart" button in the top right corner
        const cartButton = await $('#shopping_cart_container');
        await cartButton.click();

        // Ensure that the cart page is displayed
        const cartURL = await browser.getUrl();
        expect(cartURL).to.include('cart.html');

        // Ensure that products in the cart are displayed and match the ones added
        const cartItems = await $$('.cart_item');
        expect(cartItems.length).to.equal(1);

        // Click on the "Checkout" button
        const checkoutButton = await $('.checkout_button');
        await checkoutButton.click();

        // Ensure that the checkout form is displayed
        const checkoutURL = await browser.getUrl();
        expect(checkoutURL).to.include('checkout-step-one.html');

        // Fill in the form fields with information
        const firstNameInput = await $('#first-name');
        await firstNameInput.setValue('John');

        const lastNameInput = await $('#last-name');
        await lastNameInput.setValue('Doe');

        const postalCodeInput = await $('#postal-code');
        await postalCodeInput.setValue('12345');

        // Click on the "Continue" button
        const continueButton = await $('.cart_button');
        await continueButton.click();

        // Ensure that the user is redirected to the "Overview" page
        const overviewURL = await browser.getUrl();
        expect(overviewURL).to.include('checkout-step-two.html');

        // Ensure that products are displayed on the "Overview" page
        const overviewItems = await $$('.cart_item');
        expect(overviewItems.length).to.equal(1);

        // Get the text of the total price
        const totalPriceElement = await $('.summary_total_label');
        const totalPriceText = await totalPriceElement.getText();

        // Get all elements with product prices in the cart
        const productPriceElements = await $$('.inventory_item_price');

        // Create a variable to store the total product price
        let totalProductPrice = 0;

        // Create a variable to store the tax amount
        const productTaxElement = await $('.summary_tax_label');
        let totalTax = 0;

        if (productTaxElement) {
            const productTaxText = await productTaxElement.getText();
            const productTax = parseFloat(productTaxText.replace('Tax: $', ''));
            totalTax += productTax;
        }
        
        // Iterate through all elements with prices and add them to the total product price and tax
        for (const productPriceElement of productPriceElements) {
            const productPriceText = await productPriceElement.getText();
            const productPrice = parseFloat(productPriceText.replace('$', ''));
            totalProductPrice += productPrice;
        }

        // Add the tax amount to the total product price
        const totalAmount = totalProductPrice + totalTax;

        // Check if the total price text includes the calculated total amount
        expect(totalPriceText).to.include(`Total: $${totalAmount.toFixed(2)}`);

        // Click on the "Finish" button
        const finishButton = await $('.cart_button');
        await finishButton.click();

        // Ensure that the user is redirected to the "Checkout Complete" page
        const completeURL = await browser.getUrl();
        expect(completeURL).to.include('checkout-complete.html');

        // Ensure that the "Thank you for your order!" message is displayed
        const completeMessage = await $('.complete-header');
        const completeMessageText = await completeMessage.getText();
        expect(completeMessageText).to.equal('Thank you for your order!');

        // Click on the "Back Home" button
        const backHomeButton = await $('#back-to-products');
        await backHomeButton.click();

        // Ensure that the user is redirected to the inventory page
        const inventoryURL = await browser.getUrl();
        expect(inventoryURL).to.include('inventory.html');

        // Ensure that the inventory page is displayed
        const isInventoryDisplayed = await $('.inventory_list').isDisplayed();
        expect(isInventoryDisplayed).to.be.true;

        // Ensure that the cart is empty
        const isCartEmpty = await $('.shopping_cart_badge').isDisplayed();
        expect(isCartEmpty).to.be.false;
    });
});

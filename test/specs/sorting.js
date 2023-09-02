import { browser, $, $$ } from '@wdio/globals';
import { expect } from 'chai'; 
import LoginPage from '../pageobjects/login.page.js';

describe('Sorting Products', () => {
    before(async () => {
        // Ensure that the user is logged in and on the inventory page
        await browser.url('https://www.saucedemo.com');
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    it('should sort products by different criteria', async () => {
        // Create an array for sorting options
        const sortingOptions = [
            'Price (low to high)',
            'Price (high to low)',
            'Name (A to Z)',
            'Name (Z to A)'
        ];

        // Iterate through all sorting options
        for (const option of sortingOptions) {
            // Click on the sorting option
            const sortingDropdown = await $('.product_sort_container');
            await sortingDropdown.selectByVisibleText(option);

            // Get the list of product names after sorting
            const productNames = await $$('.inventory_item_name');
			const productPrices = await $$('.inventory_item_price');

            var isSorted = isSortedDescendingName(productNames);
            // Check if the list of products is sorted based on the selected criteria
			if (option == 'Price (low to high)'){
                isSorted = isSortedAscendingPrice(productPrices)
			}
			else if (option == 'Price (high to low)'){
                isSorted = isSortedDescendingPrice(productPrices)
			}
			else if (option == 'Name (A to Z)'){
                isSorted = isSortedAscendingName(productNames)
			}
			else {
                isSorted = isSortedDescendingName(productNames)
			}

            expect(isSorted, `Products are not sorted correctly for ${option}`).to.be.true;
        }
    });
});

// Function to check ascending sorting by name
function isSortedAscendingName(arr) {
    for (let i = 1; i < arr.length; i++) {
        if ( arr[i - 1].getText().toString().substring(1) >  arr[i].getText().toString().substring(1)) {
            return false;
        }
    }
    return true;
}

// Function to check descending sorting by name
function isSortedDescendingName(arr) {
    for (let i = 1; i < arr.length; i++) {
        if ( arr[i - 1].getText().toString().substring(1) < arr[i].getText().toString().substring(1)) {
            return false;
        }
    }
    return true;
}

// Function to check ascending sorting by price
function isSortedAscendingPrice(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (parseFloat( arr[i - 1].getText().toString().substring(1)) > parseFloat( arr[i].getText().toString().substring(1))) {
            return false;
        }
    }
    return true;
}

// Function to check descending sorting by price
function isSortedDescendingPrice(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (parseFloat( arr[i - 1].getText().toString().substring(1)) < parseFloat( arr[i].getText().toString().substring(1))) {
            return false;
        }
    }
    return true;
}
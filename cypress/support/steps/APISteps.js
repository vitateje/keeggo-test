/* global Given, When, Then, And */

import apiService from '../../integration/api/APIService';

Given('the API base URL is set', () => {
    cy.log('API Base URL is configured in APIService.js');
});

When('a POST request is sent to {string} with the following product details:', (endpoint, dataTable) => {
    const productDetails = dataTable.hashes()[0];
    // Ensure numeric fields are numbers, as per Swagger
    if (productDetails.userId) {
        productDetails.userId = parseInt(productDetails.userId, 10);
    }
    if (productDetails.productId) {
        productDetails.productId = parseInt(productDetails.productId, 10);
    }
    if (productDetails.quantity) {
        productDetails.quantity = parseInt(productDetails.quantity, 10);
    }
    apiService.postRequest(endpoint, productDetails).as('apiResponse');
});

// When('a POST request is sent to {string} with the following checkout details:', (endpoint, dataTable) => {
//     const checkoutDetails = dataTable.hashes()[0];
//     // Ensure mandatory fields from Swagger CheckoutRequest are present in the dataTable
//     // Swagger CheckoutRequest also has 'userId' in properties, though not in the 'required' array.
//     if (checkoutDetails.userId) {
//         checkoutDetails.userId = parseInt(checkoutDetails.userId, 10);
//     }
//     const mandatoryFields = ['firstName', 'lastName', 'address', 'number', 'cep', 'email', 'paymentMethod']; // As per Swagger 'required'
//     mandatoryFields.forEach(field => {
//         if (!checkoutDetails.hasOwnProperty(field)) {
//             cy.log(`Warning: Mandatory checkout field "${field}" is missing in the data table.`);
//         }
//     });
//     apiService.postRequest(endpoint, checkoutDetails).as('apiResponse');
// });

When('a GET request is sent to {string}', (endpoint) => {
    apiService.getRequest(endpoint).as('apiResponse');
});

Then('the API response status code should be {int}', (statusCode) => {
    cy.get('@apiResponse').its('status').should('eq', statusCode);
});

And('the API response body should contain a {string}', (key) => {
    cy.get('@apiResponse').its('body').should('have.property', key);
});

And('the API response body should contain the message {string}', (message) => {
    cy.get('@apiResponse').its('body')
        .should('have.property', 'message') // Ensure the 'message' property exists
        .and('include', message);
});

// And('the API response body should confirm product {string} with quantity {int} is correctly reflected in the cart data', (expectedProductId, expectedQuantity) => {
//     cy.get('@apiResponse').its('body').then((body) => {
//         // WARNING: Swagger's CarrinhoResponse ({id, message}) does NOT define an 'items' array.
//         // This step will LIKELY FAIL if the API strictly follows Swagger.
//         // If your API *does* return items, this logic might be okay, but it contradicts the provided Swagger.
//         // Example expected structure: { cartId: "...", items: [{ productId: "...", quantity: ... }, ...] }
//         const numericExpectedProductId = parseInt(expectedProductId, 10);

//         expect(body).to.have.property('items').and.to.be.an('array');
//         const productInCart = body.items.find(item => item.productId === expectedProductId);

//         expect(productInCart, `Product with ID ${expectedProductId} should be in the cart items`).to.not.be.undefined;
//         if (productInCart) {
//             expect(productInCart.quantity, `Quantity for product ${expectedProductId} should match`).to.equal(expectedQuantity);
//         }
//         cy.log(`Attempted to confirm: Product ${expectedProductId} with quantity ${expectedQuantity} in cart data. This may fail if API follows Swagger strictly (no 'items' array).`);
//     });
// });

// And('the API response should confirm checkout success with a message', () => {
//     cy.get('@apiResponse').its('body').then((body) => {
//         // WARNING: Swagger's CheckoutResponse ({id, orderNumber}) does NOT define a 'message' field.
//         // This step will LIKELY FAIL if the API strictly follows Swagger.
//         // Consider removing or adapting this step to infer success from status code and presence of 'id'/'orderNumber'.
//         // Example expected structure: { orderId: "...", message: "Checkout successful!" }
//         expect(body).to.have.property('message');
//         // You can make this assertion more specific, e.g., checking for exact text or keywords.
//         expect(body.message.toLowerCase()).to.include('success'); // Example: "Checkout successful", "Order placed successfully"
//         cy.log(`Attempted to confirm checkout success message: "${body.message}". This may fail if API follows Swagger strictly (no 'message' field).`);
//     });
// });

And('the API response body should contain {string}', (propertyName) => {
    cy.get('@apiResponse').its('body').should('have.property', propertyName);
});

And('the API response business rule for cart items is met', (docString) => {
    cy.log(`Validating business rule: ${docString}`);
    // WARNING: Swagger's CarrinhoResponse ({id, message}) does NOT define an 'items' array.
    // This step will LIKELY FAIL if the API strictly follows Swagger.
    cy.get('@apiResponse').its('body').then((body) => {
        // Example business rule: items array should exist and not be empty
        // Check if 'items' property exists and is an array
        expect(body).to.have.property('products').and.to.be.an('array');
        // If the test expects items, add the not.to.be.empty check
        // expect(body.items).to.not.be.empty; //
        cy.log(`Attempted to validate business rule for cart items. This may fail if API follows Swagger strictly (no 'items' array).`);
        // Add more specific validations based on your API's contract
        // e.g., expect(body.items[0]).to.have.property('productId', 'PROD123');
    });
});

// Given('a user with ID {string} exists for API tests', (userId) => {
//     // Ensure userId is treated as a number if it's used in contexts expecting an integer.
//     const numericUserId = parseInt(userId, 10);
//     // This is a placeholder step to signify that a user context is needed.
//     // In a real test, you might create a user via API here or use a known test user ID.
//     cy.wrap(numericUserId).as('currentUserId');
//     cy.log(`Assuming user with ID ${numericUserId} (integer) exists for API tests.`);
// });

And('each product in the response should have {string}', (propertiesString) => {
    // Split the properties string into an array, trim whitespace, and remove "and" if present
    const expectedProperties = propertiesString
        .replace(/, and /g, ', ') // Replace ", and " with just ", "
        .split(',')
        .map(prop => prop.trim().replace(/"/g, '')); // Trim spaces and remove quotes

    cy.get('@apiResponse').its('body').then((body) => {
        expect(body).to.have.property('products').and.to.be.an('array');
        expect(body.products).to.not.be.empty; // Assuming there should be products

        body.products.forEach((product, index) => {
            expectedProperties.forEach((propName) => {
                expect(product, `Product at index ${index} should have property "${propName}"`)
                    .to.have.property(propName);
            });
        });
    });
});

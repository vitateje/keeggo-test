/* global Given, When, Then, And */

import apiService from '../../integration/api/APIService';

Given('the API base URL is set', () => {
    cy.log('API Base URL is configured in APIService.js');
});

When('a POST request is sent to {string} with the following product details:', (endpoint, dataTable) => {
    const productDetails = dataTable.hashes()[0];
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
        .should('have.property', 'message')
        .and('include', message);
});

And('the API response body should contain {string}', (propertyName) => {
    cy.get('@apiResponse').its('body').should('have.property', propertyName);
});

And('the API response business rule for cart items is met', (docString) => {
    cy.get('@apiResponse').its('body').then((body) => {
        expect(body).to.have.property('products').and.to.be.an('array');
    });
});

And('each product in the response should have {string}', (propertiesString) => {
    const expectedProperties = propertiesString
        .replace(/, and /g, ', ')
        .split(',')
        .map(prop => prop.trim().replace(/"/g, '')); 

    cy.get('@apiResponse').its('body').then((body) => {
        expect(body).to.have.property('products').and.to.be.an('array');
        expect(body.products).to.not.be.empty;

        body.products.forEach((product, index) => {
            expectedProperties.forEach((propName) => {
                expect(product, `Product at index ${index} should have property "${propName}"`)
                    .to.have.property(propName);
            });
        });
    });
});

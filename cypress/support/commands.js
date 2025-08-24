/// <reference types="Cypress" />

import CartElements from './elements/CartElements';
const cartElements = new CartElements();

Cypress.Commands.add("accessHomepage", () => {
    cy.visit("https://www.google.com");
})

Cypress.Commands.add("addProductToCart", () => {
    cy.get(cartElements.product1AddToCart()).click();
    cy.get(cartElements.product2AddToCart()).click();
})

Cypress.Commands.add("deleteItemOne", () => {
    cy.visit("/cart.html")

    cy.get('body').then(($body) => {
        if ($body.find(cartElements.cartItemDeleteButton()).length) {
            cy.get(cartElements.cartItemDeleteButton()).click();
        }
    });
})

Cypress.Commands.add("goToCart", () => {
    cy.get(cartElements.cartMenu()).click();
})

Cypress.Commands.add("validateItemIsVisible", (expectedItem) => {
    cy.contains(expectedItem).should("be.visible");
})

Cypress.Commands.add("clickOnCheckoutButton", () => {
    cy.get(cartElements.checkoutButton()).click();
})

Cypress.Commands.add("fillUserName", (userName) => {
    cy.get(cartElements.firstNameInput()).type(userName);
})

Cypress.Commands.add("fillLastName", (userLastName) => {
    cy.get(cartElements.lastNameInput()).type(userLastName);
})

Cypress.Commands.add("fillAddressInformation", (userAddress) => {
    cy.get(cartElements.addressInput()).type(userAddress);
})

Cypress.Commands.add("fillAddressNumber", () => {
    cy.get(cartElements.addressNumberInput()).type("1");
})

Cypress.Commands.add("fillZipCode", () => {
    cy.get(cartElements.zipCodeInput()).type("01305000");
})

Cypress.Commands.add("fillEmailInformation", (user_email) => {
    cy.get(cartElements.emailInput()).type(user_email);
})
Cypress.Commands.add("selectPixPaymentMethod", () => {
    cy.get(cartElements.pixSelect()).click();
})
Cypress.Commands.add("checkConditionTerms", () => {
    cy.get(cartElements.termsCheckbox()).check();
})
Cypress.Commands.add("clickFinishOrderButton", () => {
    cy.get(cartElements.finishOrderButton()).click();
})
Cypress.Commands.add("validateOrderStatusMessage", (userName) => {
    cy.get(cartElements.orderStatusMessage()).invoke('text').then((orderMessage) => {
        expect(orderMessage).to.equal(`Obrigado pelo seu pedido ${userName}.`);
    });
})

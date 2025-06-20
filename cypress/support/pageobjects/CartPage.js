/// <reference types="Cypress" />

import CartElements from '../elements/CartElements';
const cartElements = new CartElements();

class CartPage {
    accessHomepage() {
        cy.visit("/");
    }

    addProductToCart() {
        cy.get(cartElements.product1AddToCart()).click();
        cy.get(cartElements.product2AddToCart()).click();

    }

    deleteItemOne() {
        cy.visit("/cart.html")

        cy.get('body').then(($body) => {
            if ($body.find(cartElements.cartItemDeleteButton()).length) {
                cy.get(cartElements.cartItemDeleteButton()).click();
            }
        });
    }

    goToCart() {
        cy.get(cartElements.cartMenu()).click();
    }

    validateItemIsVisible(expectedItem) {
        cy.contains(expectedItem).should("be.visible");
    }

    clickOnCheckoutButton() {
        cy.get(cartElements.checkoutButton()).click();
    }

    fillUserName(userName) {
        cy.get(cartElements.firstNameInput()).type(userName);
    }

    fillLastName(userLastName) {
        cy.get(cartElements.lastNameInput()).type(userLastName);
    }

    fillAddressInformation(userAddress) {
        cy.get(cartElements.addressInput()).type(userAddress);
    }

    fillAddressNumber() {
        cy.get(cartElements.addressNumberInput()).type("1");
    }

    fillZipCode() {
        cy.get(cartElements.zipCodeInput()).type("01305000");
    }

    fillEmailInformation(user_email) {
        cy.get(cartElements.emailInput()).type(user_email);
    }
    selectPixPaymentMethod() {
        cy.get(cartElements.pixSelect()).click();
    }
    checkConditionTerms() {
        cy.get(cartElements.termsCheckbox()).check();
    }
    clickFinishOrderButton() {
        cy.get(cartElements.finishOrderButton()).click();
    }
    validateOrderStatusMessage(userName) {
        cy.get(cartElements.orderStatusMessage()).invoke('text').then((orderMessage) => {
            expect(orderMessage).to.equal(`Obrigado pelo seu pedido ${userName}.`);
        });
    }
}

export default CartPage;

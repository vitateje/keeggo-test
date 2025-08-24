/* global Given, When, Then, And */
import { faker } from '@faker-js/faker';

const user = {
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    street: faker.location.city(),
    number: faker.location.city(),
    country: faker.location.country(),
    city: faker.location.city(),
    email: faker.internet.email(),
    month: faker.date.month(),
    year: 2030
};

Given("the user is on the QA commerce homepage", () => {
    cy.accessHomepage();
});

Given("the user adds a product in the cart", () => {
    cy.addProductToCart();
});

Given("your cart does not has the product {int}", () => {
    cy.deleteItemOne();
});

Given("a user is on the cart page", () => {
    cy.goToCart();
});

Then("the cart should display {string} item", (expectedItem) => {
    cy.validateItemIsVisible(expectedItem);
});

And("the user is on the checkout page", () => {
    cy.clickOnCheckoutButton();
});

And("the user fills in all required shipping information", () => {
    cy.fillUserName(user.name);
    cy.fillLastName(user.lastName);
    cy.fillAddressInformation(user.street);
    cy.fillAddressNumber();
    cy.fillZipCode();
    cy.fillEmailInformation(user.email);
});

And("the user selects {string} as the payment method", () => {
    cy.selectPixPaymentMethod();
});

And("the user accept the condition terms", () => {
    cy.checkConditionTerms();
});

And("the user clicks the Finalizar Pedido button", () => {
    cy.clickFinishOrderButton();
});

Then("the user should see the order status", () => {
    cy.validateOrderStatusMessage(user.name);
});

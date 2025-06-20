/* global Given, When, Then, And */
import CartPage from '../pageobjects/CartPage';
import { faker } from '@faker-js/faker';

const cartPage = new CartPage();

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
    cartPage.accessHomepage();
});

Given("the user adds a product in the cart", () => {
    cartPage.addProductToCart();
});

Given("your cart does not has the product {int}", () => {
    cartPage.deleteItemOne();
});

Given("a user is on the cart page", () => {
    cartPage.goToCart();
});

Then("the cart should display {string} item", (expectedItem) => {
    cartPage.validateItemIsVisible(expectedItem);
});

And("the user is on the checkout page", () => {
    cartPage.clickOnCheckoutButton();
});

And("the user fills in all required shipping information", () => {
    cartPage.fillUserName(user.name);
    cartPage.fillLastName(user.lastName);
    cartPage.fillAddressInformation(user.street);
    cartPage.fillAddressNumber();
    cartPage.fillZipCode();
    cartPage.fillEmailInformation(user.email);
});

And("the user selects {string} as the payment method", () => {
    cartPage.selectPixPaymentMethod();
});

And("the user accept the condition terms", () => {
    cartPage.checkConditionTerms();
});

And("the user clicks the Finalizar Pedido button", () => {
    cartPage.clickFinishOrderButton();
});

Then("the user should see the order status", () => {
    cartPage.validateOrderStatusMessage(user.name);
});

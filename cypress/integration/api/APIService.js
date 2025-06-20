/// <reference types="Cypress" />

const API_BASE_URL = 'http://localhost:3000'; // As per your requirement

class APIService {

    postRequest(endpoint, payload, headers = {}) {
        return cy.request({
            method: 'POST',
            url: `${API_BASE_URL}${endpoint}`,
            body: payload,
            headers: {
                'Content-Type': 'application/json',
                ...headers, // Allow overriding or adding more headers
            },
            failOnStatusCode: false // Allows us to assert status codes in steps
        });
    }

    getRequest(endpoint, queryParams = {}, headers = {}) {
        return cy.request({
            method: 'GET',
            url: `${API_BASE_URL}${endpoint}`,
            qs: queryParams,
            headers: {
                ...headers,
            },
            failOnStatusCode: false // Allows us to assert status codes in steps
        });
    }

    // Example: Add product to cart
    addProductToCart(productDetails) {
        // Assuming productDetails is an object like { productId: "ID", quantity: 1 }
        return this.postRequest('/api/cart/add', productDetails);
    }

    // Example: Perform checkout
    performCheckout(checkoutPayload) {
        // Assuming checkoutPayload is an object like { cartId: "CART_ID", paymentInfo: {...} }
        return this.postRequest('/api/checkout', checkoutPayload);
    }
}

export default new APIService();
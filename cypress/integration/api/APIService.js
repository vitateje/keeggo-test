/// <reference types="Cypress" />

const API_BASE_URL = 'http://localhost:3000';

class APIService {

    postRequest(endpoint, payload, headers = {}) {
        return cy.request({
            method: 'POST',
            url: `${API_BASE_URL}${endpoint}`,
            body: payload,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            failOnStatusCode: false
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
            failOnStatusCode: false
        });
    }
}

export default new APIService();

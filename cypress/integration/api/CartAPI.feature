Feature: Cart API Management
  As a user, I want to interact with the Cart API
  to manage products and perform checkout, ensuring business rules are met, based on Swagger documentation.

  Background:
    Given the API base URL is set

  @api @cart @post
  Scenario: Adicionar Produto ao Carrinho: Verify successful addition and correct cart information display
    When a POST request is sent to "/api/carrinho" with the following product details:
      | productId |
      | "101"     |
    Then the API response status code should be 201
    And the API response body should contain a "id"
    And the API response body should contain a "message"
    And the API response body should contain the message "Produto adicionado ao carrinho com sucesso."

  @api @cart @get
  Scenario Outline: Retrieve product list and verify product properties
    When a GET request is sent to "/api/produtos/"
    Then the API response status code should be 200
    And the API response body should contain "products"
    And the API response business rule for cart items is met
    And each product in the response should have <propertiesList>

    Examples:
      | propertiesList                                            |
      | "\"id\", \"name\", \"description\", \"price\", \"image\"" |

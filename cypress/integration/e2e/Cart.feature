Feature: Shopping Cart

    Background: User is on the e-commerce site
        Given the user is on the QA commerce homepage

    @positive @cart_validation
    Scenario: Successfully add product and verify cart details
        And the user adds a product in the cart
        And your cart does not has the product 1
        When a user is on the cart page
        Then the cart should display 'Moletom com capuz "Se você acha que nada é impossível..."' item

    @positive @checkout_validation
    Scenario: User Completes Simple Checkout Successfully
        And the user adds a product in the cart
        Given a user is on the cart page
        And the user is on the checkout page
        When the user fills in all required shipping information
        And the user selects "PIX" as the payment method
        And the user accept the condition terms
        And the user clicks the Finalizar Pedido button
        Then the user should see the order status

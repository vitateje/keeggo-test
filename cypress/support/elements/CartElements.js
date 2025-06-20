class CartElements {
    // Main Page 
    product1AddToCart = () => {
        return ':nth-child(1) > .card > .card-body > .btn';
    }
    product2AddToCart = () => {
        return ':nth-child(2) > .card > .card-body > .btn';
    }
    cartMenu = () => {
        return ':nth-child(2) > .nav-link';
    }

    // Cart Page
    checkoutButton = () => {
        return '#totals > .btn';
    }

    cartItemDeleteButton() {
        return '.cart-item > .btn';
    }

    firstNameInput() {
        return '#first-name';
    }

    lastNameInput() {
        return '#last-name';
    }

    addressInput() {
        return '#address';
    }

    addressNumberInput() {
        return '#number';
    }

    zipCodeInput() {
        return '#cep';
    }

    emailInput() {
        return '#email';
    }

    pixSelect() {
        return '#payment-pix';
    }
    termsCheckbox() {
        return '#terms';
    }

    finishOrderButton() {
        return '.btn';
    }

    orderStatusMessage() {
        return 'h4';
    }
}

export default CartElements;


class CartUtils {

    static cleanCartItem(item_id) {
        
    }

    static cleanPriceString(priceString) {
        // Remove currency symbol (R$), spaces, and replace comma with dot for float conversion
        return priceString.replace(/R\$\s*/, '').trim();
    }

    static formatQuantityForComparison(quantity) {
        // Format a number back to a string like "XX,XX" for comparison with displayed prices
        let quantityMatch = quantity.match(/\((\d+)\s+produtos?\)/i)
        return quantityMatch ? quantityMatch[1] : "0";
    }

    static formatPriceForComparison(price) {
        // Format a number back to a string like "XX,XX" for comparison with displayed prices
        let actualPrice = price.replace(/\.(?=\d{3}(?:,|$))/g, '');
        actualPrice = actualPrice.replace(/,/, '.');
        actualPrice = parseFloat(actualPrice);
        actualPrice = actualPrice.toFixed(1);
        return actualPrice;
    }
}

export default CartUtils;

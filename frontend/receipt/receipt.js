    class Receipt {
        constructor(date = null, receiptNumber = null, subtotal = 0, subtotalPrices = [], tax = 0, total = 0, store = null) {
            this.date = date;
            this.receiptNumber = receiptNumber;
            this.subtotal = subtotal;
            this.subtotalPrices = subtotalPrices;
            this.tax = tax;
            this.total = total;
            this.store = store;
        }

        // Getter methods
        get getDate() {
            return this.date;
        }

        get getReceiptNumber() {
            return this.receiptNumber;
        }

        get getTotal() {
            return this.total;
        }

        get getSubtotal() {
            return this.subtotal;
        }

        get getSubtotalPrices() {
            return this.subtotalPrices;
        }

        get getStore() {
            return this.store;
        }

        get getTax() {
            return this.tax;
        }

        // Setter methods
        set setDate(date) {
            this.date = date;
        }

        set setReceiptNumber(receiptNumber) {
            this.receiptNumber = receiptNumber;
        }

        set setStore(store) {
            this.store = store;
        }

        set setSubtotal(subtotal) {
            this.subtotal = subtotal;
        }

        set setSubtotalPrices(subtotalPrices) {
            this.subtotalPrices = subtotalPrices;
        }

        set setTotal(total) {
            this.total = total;
        }

        set setTax(tax) {
            this.tax = tax;
        }

        toString() {
            return `----------Receipt----------
    Store: ${this.store}
    Receipt Number: ${this.receiptNumber}
    Date: ${this.date}
    Subtotal Prices: ${this.subtotalPrices}
    Subtotal: $${this.subtotal.toFixed(2)}
    Tax: $${this.tax.toFixed(2)}
    Total: $${this.total.toFixed(2)}`;
        }
    }

    module.exports = Receipt;

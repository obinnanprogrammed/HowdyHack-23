const { createWorker } = require('tesseract.js');
const { parse } = require('date-fns');
const Receipt = require('./receipt'); // Import the Receipt class from your existing code

// TODO: Replace this with all the businesses compatible with Rev Rewards
const businesses = [
    "Revs American Grill @ MSC",
    "What's The Buzz Specialty Coffee",
    "Brazos Cedar Works",
    "David Gardner's Jewelers",
    "Champion Firearms Corp",
    "Aggieland Tree Service",
    "Learning Express Toys of College Station",
    "Avinext",
    "Advanced Security Concepts",
    "Bon AppeTea",
    "Curious Collections Vinyl Records & More",
    "Sweet Eugene's",
    "Benjamin Knox Gallery",
    "Montelongo's Fine Jewelry",
    "Advanced Locksmith",
    "1541 Pastries and Coffee",
    "Living Water Pottery Studio",
    "Sabi Boutique",
    "Stampede College Station",
    "Maroon & White Barber Shop",
    "Bluebonnet Pet Ranch",
    "O'Bannon's Tap House",
    "Marfa Texas Kitchen",
    "Stella Southern Café",
    "Raging Bull Street Tacos",
    "Shiner Park"
];

// Used to resize images for performance or accuracy purposes
const min_width = 2000;

class ReceiptExtractor {
    constructor(imagePath) {
        this.receipt = new Receipt();
        this.text = "";
        this.extractInformation(imagePath).then(r => {});
        console.log(this.text);
    }

    async extractInformation(imagePath) {
        const worker = await createWorker();

        await (async () => {
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const {data: {text}} = await worker.recognize(imagePath);
            this.text = text;
            await worker.terminate();
        })();

        // Extract date, receipt number, items, prices, total, and store info
        this.receipt.setDate = this.getDate(this.text);
        this.receipt.setStore = this.getStore(this.text);
        this.receipt.setReceiptNumber = this.getReceiptNumber(this.text);
        this.receipt.setSubtotalPrices = this.getSubtotalPrices(this.text);
    }

    getText() {
        return this.text;
    }

    getReceipt() {
        return this.receipt;
    }

    getDate() {
        const datePattern = /(?:Date:[ \t]*)([A-Za-z0-9, ]+)/i;
        const matches = this.text.match(datePattern);

        if (matches) {
            const date = parse(matches[1], 'MMMM d, yyyy', new Date());
            return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
        }
        return null;
    }

    getReceiptNumber() {
        // Extracts a receipt number
        const receiptNumberPattern = /(?:Order|Receipt)[ \t]*(?:Number|#)?:[ \s]*([0-9]+)/i;
        const matches = this.text.match(receiptNumberPattern);

        return matches ? matches[1] : null;
    }

    getStore() {
        // Check if text contains one of the allowed businesses
        for (const business of businesses) {
            if (this.text.includes(business)) {
                return business;
            }
        }

        return null;
    }

    getSubtotalPrices() {
        const prices = [];
        const pricePattern = /([1-9][0-9]+\.[0-9]{2}|[0-9]\.[0-9]{2})/g;
        const lines = this.text.split('\n');

        let passed = false;

        for (const line of lines) {
            if (line.includes('$') || line.includes('5')) {
                const lowerLine = line.toLowerCase();

                if (lowerLine.includes("subtotal")) {
                    passed = true;
                    const matches = lowerLine.match(pricePattern);
                    if (matches) {
                        this.receipt.setSubtotal = parseFloat(matches[0]);
                    }
                } else if (lowerLine.includes("total")) {
                    passed = true;
                    const matches = lowerLine.match(pricePattern);
                    if (matches) {
                        this.receipt.setTotal = parseFloat(matches[0]);
                    }
                } else if (lowerLine.includes("tax")) {
                    passed = true;
                    const matches = lowerLine.match(pricePattern);
                    if (matches) {
                        this.receipt.setTax = parseFloat(matches[0]);
                    }
                } else if (!lowerLine.includes("balance") && !lowerLine.includes("amount") && !lowerLine.includes("card") && !passed) {
                    const matches = lowerLine.match(pricePattern);
                    if (matches) {
                        prices.push(parseFloat(matches[0]));
                    }
                }
            }
        }

        return prices;
    }

    toString() {
        return this.receipt.toString();
    }
}

module.exports = ReceiptExtractor;
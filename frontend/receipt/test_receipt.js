const { describe, it } = require('mocha');
const { expect } = require('chai');
const ReceiptExtractor = require('./receipt_extractor'); // Adjust the path accordingly
const imagePath = './receipt/test_receipt.jpg';
const receiptExtractor = new ReceiptExtractor(imagePath);

it('should extract subtotal prices', async function () {
    this.timeout(10000)

    setTimeout(function () {
        const items = receiptExtractor.getSubtotalPrices();
        expect(items).to.have.lengthOf(2);
        expect(items[0]).to.equal(4.99);
        expect(receiptExtractor.getReceipt().total).to.equal(7.98);
        expect(receiptExtractor.getReceipt().subtotal).to.equal(7.98);
        expect(receiptExtractor.getReceipt().tax).to.equal(0.00);
        expect(items[1]).to.equal(2.99);
    }, 10000);

});

it('should correctly extract store information', async function  () {
    this.timeout(10000)

    setTimeout(function () {
        expect(receiptExtractor.getStore()).to.equal("Revs American Grill @ MSC");
    }, 10000);
});

it('should correctly extract receipt number', async function  () {
    this.timeout(10000)

    setTimeout(function () {
        expect(receiptExtractor.getReceiptNumber()).to.equal("20753");
        }, 10000);
});

it('should correctly extract date', async function  () {
    this.timeout(10000)

    setTimeout(function () {
        expect(receiptExtractor.getDate()).to.equal("09/09/2023");
    }, 10000);
});

const { describe, it } = require('mocha');
const { expect } = require('chai');
const ReceiptExtractor = require('./receipt_extractor'); // Adjust the path accordingly
const imagePath = './receipt/test_receipt.jpg';
const receiptExtractor = new ReceiptExtractor(imagePath);

describe('Receipt Extraction Tests', async function  () {
    it('should extract subtotal prices', async function () {
        const items = receiptExtractor.getSubtotalPrices();
        expect(items).to.have.lengthOf(2);
        expect(items[0]).to.equal(4.99);
        expect(receiptExtractor.getReceipt().total).to.equal(7.98);
        expect(receiptExtractor.getReceipt().subtotal).to.equal(7.98);
        expect(receiptExtractor.getReceipt().tax).to.equal(0.00);
        expect(items[1]).to.equal(2.99);
    });

    it('should correctly extract store information', async function  () {
        expect(receiptExtractor.getStore()).to.equal("Revs American Grill @ MSC");
    });

    it('should correctly extract receipt number', async function  () {
        expect(receiptExtractor.getReceiptNumber()).to.equal("20753");
    });

    it('should correctly extract date', async function  () {
        expect(receiptExtractor.getDate()).to.equal("09/09/2023");
    });
});

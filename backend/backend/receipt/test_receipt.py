import unittest

from backend.backend.receipt.receipt_extractor import ReceiptExtractor

receipt = ReceiptExtractor("test_receipt.jpg")

class MyTestCase(unittest.TestCase):
    def test_subtotal_prices(self):
        items = receipt.get_subtotal_prices()
        self.assertEqual(len(items), 2)
        self.assertEqual(items[0], 4.99)
        self.assertEqual(receipt.get_receipt().get_total(), 7.98)
        self.assertEqual(receipt.get_receipt().get_subtotal(), 7.98)
        self.assertEqual(receipt.get_receipt().get_tax(), 0.00)
        self.assertEqual(items[1], 2.99)

    def test_store(self):
        self.assertEqual(receipt.get_store(), "Revs American Grill @ MSC")

    def test_receipt_number(self):
        self.assertEqual(receipt.get_receipt_number(), "20753")

    def test_date(self):
        self.assertEqual(receipt.get_date(), "09/09/2023")


if __name__ == '__main__':
    unittest.main()


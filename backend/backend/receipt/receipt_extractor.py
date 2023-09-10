import pytesseract
from PIL import Image
import re
from dateutil.parser import parse

from backend.backend.receipt.receipt import Receipt

# TODO: Replace this with all the businesses compatible with Rev Rewards
businesses = [
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
]

# Used to resize images for performance or accuracy purposes
min_width = 2000

class ReceiptExtractor:
    def __init__(self, image_path):
        self._image_path = image_path
        self._receipt = Receipt()

        try:
            # Load the image containing the receipt using Pillow
            img = Image.open(self._image_path)

            if img.size[0] != min_width:
                img = img.resize((min_width, int(min_width/img.size[0] * img.size[1])))

            img = img.resize(img.size)
            # Use Tesseract OCR to extract text from the image
            self._text = pytesseract.image_to_string(img)

            # Extract date, receipt number, items, prices, total, and store info
            self._receipt.set_date(self.get_date())
            self._receipt.set_store(self.get_store())
            self._receipt.set_receipt_number(self.get_receipt_number())
            self._receipt.set_subtotal_prices(self.get_subtotal_prices())

        except Exception as e:
            print(f"Error extracting information: {str(e)}")

    def get_text(self):
        return self._text

    def get_receipt(self):
        return self._receipt

    def get_date(self):
        date_pattern = r'(?:Date:[ \t]*)([A-Za-z0-9, ]+)'

        matches = re.search(date_pattern, self._text, re.IGNORECASE)

        if matches:
            date = parse(matches.group(1))
            return date.strftime("%m/%d/%Y")
        return None

    def get_receipt_number(self):
        # Extracts a receipt number
        receipt_number_pattern = r'(?:Order|Receipt)[ \t]*(?:Number|#)?:[ \s]*([0-9]+)'

        matches = re.search(receipt_number_pattern, self._text, re.IGNORECASE)

        if matches:
            return matches.group(1)
        return None

    # TODO: Make algorithm more robust by converting > 1 whitespaces to a single whitespace
    def get_store(self):
        # Check if text contains one of the allowed businesses
        for business in businesses:
            if business in self._text:
                return business

        return None

    def get_subtotal_prices(self):
        prices = []
        price_pattern = r'([1-9][0-9]+\.[0-9]{2}|[0-9]\.[0-9]{2})'

        lines = self._text.split('\n')

        # A flag for checking whether the loop has passed over individual items
        passed = False
        for line in lines:
            if '$' or '5' in line:
                line = line.lower()
                if "subtotal" in line:
                    passed = True
                    matches = re.search(price_pattern, line, re.IGNORECASE)
                    if matches:
                        self._receipt.set_subtotal(float(matches.group(1)))
                elif "total" in line:
                    passed = True
                    matches = re.search(price_pattern, line, re.IGNORECASE)
                    if matches:
                        self._receipt.set_total(float(matches.group(1)))
                elif "tax" in line:
                    passed = True
                    matches = re.search(price_pattern, line, re.IGNORECASE)
                    if matches:
                        self._receipt.set_tax(float(matches.group(1)))
                elif not ("balance" or "amount" or "card") in line and not passed:
                    # Exclude extraneous values
                    matches = re.search(price_pattern, line, re.IGNORECASE)
                    if matches:
                        prices.append(float(matches.group(1)))

        return prices

    def __str__(self):
        return str(self._receipt)


if __name__ == "__main__":
    receipt = ReceiptExtractor("test_receipt.jpg")

    if receipt:
        print(receipt)
    else:
        print("Receipt information extraction failed.")
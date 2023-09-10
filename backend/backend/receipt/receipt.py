class Receipt:
    def __init__(self, date=None, receipt_number=None, subtotal=None, subtotal_prices=None, tax=None, total=None, store=None):
        self._date = date
        self._receipt_number = receipt_number
        self._subtotal = 0
        self._subtotal_prices = []
        self._tax = 0
        self._total = 0
        self._store = store

    def get_date(self):
        return self._date

    def get_receipt_number(self):
        return self._receipt_number

    def get_total(self):
        return self._total

    def get_subtotal(self):
        return self._subtotal

    def get_subtotal_prices(self):
        return self._subtotal_prices

    def get_store(self):
        return self._store

    def get_tax(self):
        return self._tax

    # Setter methods

    def set_date(self, date):
        self._date = date

    def set_receipt_number(self, receipt_number):
        self._receipt_number = receipt_number

    def set_store(self, store):
        self._store = store

    def set_subtotal(self, subtotal):
        self._subtotal = subtotal

    def set_subtotal_prices(self, subtotal_prices):
        self._subtotal_prices = subtotal_prices

    def set_total(self, total):
        self._total = total

    def set_tax(self, tax):
        self._tax = tax

    def __str__(self):
        return f"----------Receipt----------\n" \
               f"Store: {self._store}\n" \
               f"Receipt Number: {self._receipt_number}\n" \
               f"Date: {self._date}\n" \
               f"Subtotal Prices: {self._subtotal_prices}\n" \
               f"Subtotal: ${self._subtotal:.2f}\n" \
               f"Tax: ${self._tax:.2f}\n" \
               f"Total: ${self._total:.2f}"

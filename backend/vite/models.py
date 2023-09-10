from django.db import models

class Receipt(models.Model):
    first_name = models.CharField("First Name",max_length=20)
    last_name = models.CharField("Last Name",max_length=20)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    receipt_file = models.FileField(upload_to='receipts/')

    def __str__(self):
        return f"Receipt from {self.first_name} {self.last_name} at {self.uploaded_at}"
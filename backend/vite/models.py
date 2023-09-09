from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    loyalty_points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.username
    
class Receipt(models.Model):
    person_name = models.CharField("Person Name", max_length=240)
    business_name = models.CharField("Name of Business", max_length=240)
    receipt_number = models.CharField("Receipt Number", max_length=100, unique=True)
    subtotal = models.DecimalField("Subtotal", max_digits=10, decimal_places=2)
    date = models.DateField("Date")

    def __str__(self):
        return f"Receipt {self.receipt_number} from {self.business_name}"
    
class RewardPoints(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    receipt = models.ForeignKey(Receipt, on_delete=models.CASCADE)
    points_earned = models.PositiveIntegerField()
    date_earned = models.DateField()

    def __str__(self):
        return f"{self.user}'s Points for Receipt {self.receipt.receipt_number} on {self.date_earned}"

from django import forms
from .models import Receipt

class ReceiptUploadForm(forms.ModelForm):
    class Meta:
        model = Receipt
        fields = ['first_name' +' '+ 'last_name','receipt_file']
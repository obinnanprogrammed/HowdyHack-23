from django.shortcuts import render, redirect
from .forms import ReceiptUploadForm

def upload_receipt(request):
    if request.method == 'POST':
        form = ReceiptUploadForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            # Process the receipt here to award points to the customer
            return redirect('vite:receipt_upload_success')
    else:
        form = ReceiptUploadForm()
    return render(request, 'vite/upload_receipt.html', {'form': form})

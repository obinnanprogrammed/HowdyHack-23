
from django.contrib import admin
from django.urls import path, include
from django.conf import settings 
from django.conf.urls.static import static 
from vite import views


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("vite.urls")),
    path('upload-receipt/', views.upload_receipt, name='upload_receipt'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
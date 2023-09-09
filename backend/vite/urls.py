from django.urls import path
from .views import my_view

urlpatterns = [
    path("hello/", my_view, name="hello"),
]

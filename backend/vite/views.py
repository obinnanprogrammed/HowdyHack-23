from django.http import JsonResponse


def my_view(request):
    return JsonResponse({"message": "Hello from Django!"})

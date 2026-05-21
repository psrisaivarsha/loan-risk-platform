from django.http import JsonResponse

def home(request):

    return JsonResponse({

        "status": "success",

        "message":
            "LoanRisk AI Backend Running Successfully 🚀",

        "service":
            "AI Loan Risk Assessment Platform",

        "version":
            "v1.0"
    })
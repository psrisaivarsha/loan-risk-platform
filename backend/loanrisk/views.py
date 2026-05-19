from django.http import HttpResponse

def home(request):

    return HttpResponse(
        "LoanRisk AI Backend Running Successfully 🚀"
    )
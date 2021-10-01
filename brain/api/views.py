from django.http import HttpResponse
from .handwriting.src.main import main


def index(request):
    return HttpResponse(main())
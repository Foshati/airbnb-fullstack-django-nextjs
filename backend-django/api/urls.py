from django.urls import path
from .api import app


urlpatterns = [path("api/", app.urls)]

from django.urls import path
from views import *

urlpatterns = [
    path("snippets/", CreateSnippetView.as_view(), name="snippet-list"),
    # <int:pk> is like a pathconverter tells to expect a number here
    path("snippets/delete/<int:pk>/", DeleteSnippetView.as_view(), name="snippet-destroy") 
]
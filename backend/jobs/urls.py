# jobs/urls.py
from django.urls import path
from .views import (
    JobListCreateView,
    JobRetrieveUpdateDestroyView,
    JobDeactivateView,
)

urlpatterns = [
    path("jobs/", JobListCreateView.as_view(), name="job-list-create"),
    path("jobs/<int:pk>/", JobRetrieveUpdateDestroyView.as_view(), name="job-detail"),
    path("jobs/<int:pk>/deactivate/", JobDeactivateView.as_view(), name="job-deactivate"),
]

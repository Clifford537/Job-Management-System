from django.urls import path
from .views import JobListCreateView, JobRetrieveUpdateView, JobDeactivateView

urlpatterns = [
    path('jobs/', JobListCreateView.as_view(), name='job-list-create'),
    path('jobs/<int:pk>/', JobRetrieveUpdateView.as_view(), name='job-detail-update'),
    path('jobs/<int:pk>/deactivate/', JobDeactivateView.as_view(), name='job-deactivate'),
]

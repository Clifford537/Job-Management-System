# jobs/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from .models import Job
from .serializers import JobSerializer


class JobListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/jobs/        – list active
    POST /api/jobs/        – create
    """
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.filter(status="active")


class JobRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    /api/jobs/<id>/ – retrieve
    PUT    /api/jobs/<id>/ – full update
    PATCH  /api/jobs/<id>/ – partial update
    DELETE /api/jobs/<id>/ – hard delete
    """
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class JobDeactivateView(APIView):
    """
    PATCH /api/jobs/<id>/deactivate/ – soft delete
    """
    def patch(self, request, pk):
        job = get_object_or_404(Job, pk=pk)
        job.status = "inactive"
        job.save(update_fields=["status"])
        return Response(
            {"detail": "Job deactivated successfully"},
            status=status.HTTP_200_OK,
        )

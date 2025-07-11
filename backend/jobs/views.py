from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Job
from .serializers import JobSerializer
from django.shortcuts import get_object_or_404

# GET /api/jobs/ — List active jobs only
class JobListCreateView(generics.ListCreateAPIView):
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.filter(status='active')


# GET /api/jobs/<id>/ — Retrieve a single job
# PUT /api/jobs/<id>/ — Update a job
class JobRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


# PATCH /api/jobs/<id>/deactivate/ — Soft delete
class JobDeactivateView(APIView):
    def patch(self, request, pk):
        job = get_object_or_404(Job, pk=pk)
        job.status = 'inactive'
        job.save()
        return Response({'detail': 'Job deactivated successfully'}, status=status.HTTP_200_OK)

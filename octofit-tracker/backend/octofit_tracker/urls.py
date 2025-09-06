"""octofit_tracker URL Configuration"""
from django.contrib import admin
from django.urls import path, include
import os
from rest_framework import routers
from .views import UserViewSet, TeamViewSet, ActivityViewSet, LeaderboardViewSet, WorkoutViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'leaderboard', LeaderboardViewSet)
router.register(r'workouts', WorkoutViewSet)

codespace_name = os.environ.get('CODESPACE_NAME')
base_url = f'https://{codespace_name}-8000.app.github.dev' if codespace_name else 'http://localhost:8000'

@api_view(['GET'])
def api_root(request):
    api_prefix = f'{base_url}/api' if base_url else '/api'
    return Response({
        'users': f'{api_prefix}/users/',
        'teams': f'{api_prefix}/teams/',
        'activities': f'{api_prefix}/activities/',
        'leaderboard': f'{api_prefix}/leaderboard/',
        'workouts': f'{api_prefix}/workouts/',
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', api_root, name='api_root'),
]

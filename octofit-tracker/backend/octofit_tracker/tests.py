from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create(name="Test User", email="test@example.com")
    def test_user_name(self):
        user = User.objects.get(email="test@example.com")
        self.assertEqual(user.name, "Test User")

# Ajoutez des tests similaires pour Team, Activity, Leaderboard, Workout

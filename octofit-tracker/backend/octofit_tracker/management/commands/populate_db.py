from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel', description='Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='DC Superheroes')

        # Users
        ironman = User.objects.create(email='ironman@marvel.com', name='Iron Man', team='Marvel')
        captain = User.objects.create(email='captain@marvel.com', name='Captain America', team='Marvel')
        batman = User.objects.create(email='batman@dc.com', name='Batman', team='DC')
        superman = User.objects.create(email='superman@dc.com', name='Superman', team='DC')

        # Activities
        Activity.objects.create(user=ironman, type='Running', duration=30, date='2025-09-01T10:00:00Z')
        Activity.objects.create(user=captain, type='Cycling', duration=45, date='2025-09-02T11:00:00Z')
        Activity.objects.create(user=batman, type='Swimming', duration=60, date='2025-09-03T12:00:00Z')
        Activity.objects.create(user=superman, type='Flying', duration=120, date='2025-09-04T13:00:00Z')

        # Leaderboard
        Leaderboard.objects.create(team=marvel, points=150)
        Leaderboard.objects.create(team=dc, points=200)

        # Workouts
        Workout.objects.create(name='Pushups', description='Upper body strength', difficulty='Easy')
        Workout.objects.create(name='Sprints', description='Speed training', difficulty='Medium')
        Workout.objects.create(name='Deadlift', description='Strength training', difficulty='Hard')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))

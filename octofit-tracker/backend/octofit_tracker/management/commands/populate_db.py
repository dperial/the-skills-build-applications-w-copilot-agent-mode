from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        for obj in Activity.objects.all():
            if getattr(obj, 'id', None):
                obj.delete()
        for obj in Leaderboard.objects.all():
            if getattr(obj, 'id', None):
                obj.delete()
        for obj in Workout.objects.all():
            if getattr(obj, 'id', None):
                obj.delete()
        for obj in User.objects.all():
            if getattr(obj, 'id', None):
                obj.delete()
        for obj in Team.objects.all():
            if getattr(obj, 'id', None):
                obj.delete()

        # Teams
        teams = []
        for i in range(1, 21):
            team = Team.objects.create(name=f'Team{i}', description=f'Description for Team{i}')
            teams.append(team)

        # Users
        users = []
        for i in range(1, 21):
            team_name = teams[i % len(teams)].name
            user = User.objects.create(email=f'user{i}@example.com', name=f'User{i}', team=team_name)
            users.append(user)

        # Activities
        activity_types = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Hiking']
        for i in range(1, 21):
            Activity.objects.create(
                user=users[(i-1) % len(users)],
                type=activity_types[i % len(activity_types)],
                duration=30 + i,
                date=f'2025-09-{(i%30)+1:02d}T10:00:00Z'
            )

        # Leaderboard
        for i, team in enumerate(teams):
            Leaderboard.objects.create(team=team, points=100 + i * 10)

        # Workouts
        difficulties = ['Easy', 'Medium', 'Hard']
        for i in range(1, 21):
            Workout.objects.create(
                name=f'Workout{i}',
                description=f'Description for Workout{i}',
                difficulty=difficulties[i % len(difficulties)]
            )

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))

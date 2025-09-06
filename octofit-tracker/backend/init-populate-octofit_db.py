from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

# Clear existing data
User.objects.all().delete()
Team.objects.all().delete()
Activity.objects.all().delete()
Leaderboard.objects.all().delete()
Workout.objects.all().delete()

# Populate Users
User.objects.create(name="Alice", email="alice@example.com")
User.objects.create(name="Bob", email="bob@example.com")
User.objects.create(name="Charlie", email="charlie@example.com")

# Populate Teams
Team.objects.create(name="Team Alpha", members=["Alice", "Bob"])
Team.objects.create(name="Team Beta", members=["Charlie"])

# Populate Activities
Activity.objects.create(name="Running")
Activity.objects.create(name="Cycling")
Activity.objects.create(name="Swimming")

# Populate Leaderboard
Leaderboard.objects.create(name="Top Runners")
Leaderboard.objects.create(name="Top Cyclists")

# Populate Workouts
Workout.objects.create(name="Morning Run")
Workout.objects.create(name="Evening Cycle")
Workout.objects.create(name="Swim Session")

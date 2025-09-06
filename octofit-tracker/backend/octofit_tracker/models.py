from djongo import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    def __str__(self):
        return self.name

class Team(models.Model):
    name = models.CharField(max_length=100)
    members = models.JSONField(default=list)
    def __str__(self):
        return self.name

class Activity(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Leaderboard(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Workout(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

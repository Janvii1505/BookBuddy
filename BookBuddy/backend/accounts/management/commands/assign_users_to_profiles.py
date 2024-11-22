from django.core.management.base import BaseCommand
from accounts.models import Profile

class Command(BaseCommand):
    help = 'Check for profiles without users'

    def handle(self, *args, **kwargs):
        profiles_without_users = Profile.objects.filter(user__isnull=True)
        if profiles_without_users.exists():
            for profile in profiles_without_users:
                self.stdout.write(f'Profile without user: {profile.id}')
        else:
            self.stdout.write('All profiles have associated users.')

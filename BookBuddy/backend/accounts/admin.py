from django.contrib import admin
from .models import Profile
from django.contrib.auth.models import User

class ProfileAdmin(admin.ModelAdmin):
    search_fields = ('user__username', 'user__email', 'library_card_number')  
    list_filter = ('gender', 'user__is_staff', 'user__is_active')  
    ordering = ('user__username',)
    list_display = (
        'get_user_username', 
        'get_user_first_name', 
        'get_user_last_name', 
        'get_user_email', 
        'library_card_number', 
        'gender', 
        'phone_number'
    ) 

    def get_user_username(self, obj):
        return obj.user.username if obj.user else 'No User'
    get_user_username.short_description = 'Username'

    def get_user_first_name(self, obj):
        return obj.user.first_name if obj.user else 'No First Name'
    get_user_first_name.short_description = 'First Name'

    def get_user_last_name(self, obj):
        return obj.user.last_name if obj.user else 'No Last Name'
    get_user_last_name.short_description = 'Last Name'

    def get_user_email(self, obj):
        return obj.user.email if obj.user else 'No Email'
    get_user_email.short_description = 'Email'

admin.site.register(Profile, ProfileAdmin)


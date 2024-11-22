
from django.urls import path
from accounts import views

urlpatterns = [
    path('profiles/', views.ProfileList.as_view(), name='profile-list'),  
    path('profiles/<int:pk>/', views.ProfileDetail.as_view(), name='profile-detail'),  
    path('csrf-token/', views.get_csrf_token, name='csrf-token'),  
    path('profiles/check-library-card/', views.check_library_card_number, name='check-library-card'), 
    path('signup/', views.signup, name='signup'), 
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('update-profile/', views.update_profile, name='update-profile'),
]

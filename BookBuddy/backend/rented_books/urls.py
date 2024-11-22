from django.urls import path
from rented_books import views

urlpatterns = [
    path('',views.RentedBookCreateView.as_view()),
    path('user_rented_books/', views.user_rented_books, name='user_rented_books')
]

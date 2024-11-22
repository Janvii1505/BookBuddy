from django.urls import path
from books import views

urlpatterns = [
    path('',views.BookList.as_view(),name='book-list'),
    path('<int:pk>/', views.BookRetrieveUpdateDestroy.as_view(), name='book-detail'),
    path('genre/<str:genre>/', views.books_by_genre, name='books_by_genre'),
]

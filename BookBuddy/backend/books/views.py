from .serializers import BookSerializer
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .models import Book
from rest_framework.decorators import api_view
from rest_framework.response import Response

class BookList(ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

@api_view(['GET'])
def books_by_genre(request, genre):
    books = Book.objects.filter(genre__iexact=genre)  
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)
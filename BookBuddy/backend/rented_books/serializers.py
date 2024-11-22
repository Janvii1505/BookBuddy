from .models import RentedBook
from rest_framework import serializers
from books.models import Book  

class RentedBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentedBook
        fields = '__all__'

    def create(self, validated_data):
        book_id = validated_data['book_title'].id  
        try:
            book = Book.objects.get(pk=book_id)  
        except Book.DoesNotExist:
            raise serializers.ValidationError({"book_title": "Book does not exist."})

        if book.copies <= 0:
            raise serializers.ValidationError("No more copies available to rent.")

        rented_book = RentedBook.objects.create(**validated_data)
        return rented_book

    def get_username(self, obj):
        return str(obj.username)  

    def get_book_title(self, obj):
        return str(obj.book_title)  



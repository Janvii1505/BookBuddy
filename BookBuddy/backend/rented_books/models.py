from django.db import models
from accounts.models import Profile
from books.models import Book
from django.utils import timezone
from datetime import timedelta
from django.core.exceptions import ValidationError

class RentedBook(models.Model):
    username = models.ForeignKey(Profile, on_delete=models.CASCADE)
    book_title = models.ForeignKey(Book, on_delete=models.CASCADE)
    book_isbn = models.CharField(max_length=13, blank=True, null=True)
    rented_date = models.DateTimeField(default=timezone.now)
    due_date = models.DateTimeField(blank=True)

    def save(self, *args, **kwargs):
        book = self.book_title  

        if book.copies <= 0:
            raise ValidationError("No more copies available to rent.")
        
        if not self.due_date:
            self.due_date = self.rented_date + timedelta(days=5)

        self.book_isbn = book.isbn

        super(RentedBook, self).save(*args, **kwargs)

        if book.copies > 0:
            book.copies -= 1
            book.save()  
        else:
            raise ValidationError("No more copies available to rent.")
        
    def __str__(self):
        return f'{self.book_title} rented by {self.username}'

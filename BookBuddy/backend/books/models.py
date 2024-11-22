from django.db import models

class Book(models.Model):
    GENRE_CHOICES = [
        ('FIC', 'Fiction'),
        ('NF', 'Non-Fiction'),
        ('MYS', 'Mystery'),
        ('SCI', 'Science Fiction'),
        ('FAN', 'Fantasy'),
        ('BIO', 'Biography'),
        ('HIS', 'History'),
        ('ROM', 'Romance'),
        ('THR', 'Thriller'),
    ]

    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13, unique=True)
    published_date = models.DateField()
    publisher = models.CharField(max_length=255, blank=True)
    pages = models.IntegerField()
    cover = models.ImageField(upload_to='covers/')
    genre = models.CharField(max_length=3, choices=GENRE_CHOICES, default='OTH')
    copies = models.IntegerField(default=1)
    rent_price = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    description = models.TextField(blank=True)


    def __str__(self):
        return self.title


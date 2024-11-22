from django.contrib import admin
from .models import Book

class BookAdmin(admin.ModelAdmin):
    list_filter = ('genre','published_date')
    search_fields = ('title', 'author', 'isbn')
    ordering = ('title',)
admin.site.register(Book,BookAdmin)
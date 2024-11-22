from django.contrib import admin
from .models import RentedBook

class RentedBookAdmin(admin.ModelAdmin):
    list_filter = ('rented_date', 'due_date')
    search_fields = ('username__user__username', 'book_title__title', 'book_isbn')
    readonly_fields = ('rented_date', 'due_date')

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.select_related('username', 'book_title')
    
    def delete_queryset(self, request, queryset):
        for rented_book in queryset:
            book = rented_book.book_title 
            book.copies += 1  
            book.save()  
        
        super().delete_queryset(request, queryset)
    

admin.site.register(RentedBook, RentedBookAdmin)

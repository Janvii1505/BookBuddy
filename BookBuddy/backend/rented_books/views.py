# from .serializers import RentedBookSerializer
# from rest_framework.generics import CreateAPIView
# from .models import RentedBook
# # Create your views here.

# class RentedBookCreateView(CreateAPIView):
#     serializer_class = RentedBookSerializer

#     def create(self, request, *args, **kwargs):
#         print("Request received")  # Add logging to check if the request is made multiple times
#         return super().create(request, *args,**kwargs)


from .serializers import RentedBookSerializer
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from accounts.models import Profile
from .models import RentedBook

class RentedBookCreateView(CreateAPIView):
    serializer_class = RentedBookSerializer

    def create(self, request, *args, **kwargs):
        print("Request Data : ", request.data)
        print("Request received") 

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            rented_book = serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def user_rented_books(request):
    username = request.GET.get('username', None)  # Get username from query parameter
    if username is not None:
        try:
            user_profile = Profile.objects.get(user__username=username)
        except Profile.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        rented_books = RentedBook.objects.filter(username=user_profile)
        serializer = RentedBookSerializer(rented_books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Username query parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
import json
from rest_framework import generics
from django.contrib.auth.models import User
from .models import Profile
from .serializers import ProfileSerializer
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from .models import User 
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

@api_view(['POST'])
def signup(request):
    try:
        data = request.data

        user = User.objects.create_user(
            username=data['username'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            password=data['password']
        )
        user.save()

        # Create a Profile for the user
        Profile.objects.create(
            user=user,
            phone_number=data['phone_number'],
            gender=data['gender'],
            library_card_number=data['library_card_number']
        )

        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({'id':user.profile.id,'username': user.username, 'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'phone_number': user.profile.phone_number,  
            'library_card_number': user.profile.library_card_number}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout_view(request):
    logout(request)
    response = JsonResponse({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
    response.delete_cookie('user_data')  
    return response

@api_view(['GET'])
def check_library_card_number(request):
    number = request.GET.get('number', '')
    exists = Profile.objects.filter(library_card_number=number).exists()
    return JsonResponse({'exists': exists})



@login_required
@csrf_exempt  
def update_profile(request):
    if request.method == 'PUT':
        try:
            user = request.user
            data = json.loads(request.body)

            user.username = data.get('username', user.username)
            user.first_name = data.get('first_name', user.first_name)
            user.last_name = data.get('last_name', user.last_name)
            user.email = data.get('email', user.email)
            user.phone_number = data.get('phone_number', user.phone_number)
            user.save()

            return JsonResponse({'message': 'Profile updated successfully!'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request'}, status=400)

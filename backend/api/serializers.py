from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, WebsiteSetup, BusinessInfo


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'business_type', 'created_at']
        read_only_fields = ['id', 'created_at']


class SignupSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'password_confirm', 'name', 'business_type']
        extra_kwargs = {
            'email': {'required': True},
            'name': {'required': True},
            'business_type': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            username=validated_data['email'],  # Use email as username
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            business_type=validated_data['business_type'],
        )
        return user


class WebsiteSetupSerializer(serializers.ModelSerializer):
    """Serializer for WebsiteSetup model"""
    user = UserSerializer(read_only=True)

    class Meta:
        model = WebsiteSetup
        fields = [
            'id', 'user', 'review_system', 'ai_chatbot', 'ambulance_ordering',
            'patient_portal', 'prescription_refill', 'template_id', 'is_paid',
            'total_price', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


class BusinessInfoSerializer(serializers.ModelSerializer):
    """Serializer for BusinessInfo model"""
    logo_url = serializers.SerializerMethodField()

    class Meta:
        model = BusinessInfo
        fields = [
            'id', 'name', 'logo', 'logo_url', 'about', 'address', 'latitude',
            'longitude', 'contact_phone', 'contact_email', 'website',
            'working_hours', 'is_published', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_logo_url(self, obj):
        if obj.logo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        return None


class BusinessInfoCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating/updating BusinessInfo (without logo_url)"""
    class Meta:
        model = BusinessInfo
        fields = [
            'name', 'logo', 'about', 'address', 'latitude', 'longitude',
            'contact_phone', 'contact_email', 'website', 'working_hours',
            'is_published'
        ]


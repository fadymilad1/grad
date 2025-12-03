from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid


class User(AbstractUser):
    """Custom User model extending Django's AbstractUser"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    business_type = models.CharField(
        max_length=20,
        choices=[
            ('hospital', 'Hospital'),
            ('pharmacy', 'Pharmacy'),
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'name', 'business_type']

    def __str__(self):
        return f"{self.name} ({self.email})"


class WebsiteSetup(models.Model):
    """Main website configuration for each user"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='website_setup')
    
    # Hospital features
    review_system = models.BooleanField(default=False)
    ai_chatbot = models.BooleanField(default=False)
    ambulance_ordering = models.BooleanField(default=False)
    patient_portal = models.BooleanField(default=False)
    prescription_refill = models.BooleanField(default=False)
    
    # Pharmacy template
    template_id = models.IntegerField(null=True, blank=True)
    
    # Payment status
    is_paid = models.BooleanField(default=False)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Website Setup for {self.user.name}"

    class Meta:
        db_table = 'website_setups'


class BusinessInfo(models.Model):
    """Business information for the website"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    website_setup = models.OneToOneField(
        WebsiteSetup,
        on_delete=models.CASCADE,
        related_name='business_info'
    )
    
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)
    about = models.TextField(blank=True)
    address = models.TextField(blank=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    contact_email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    working_hours = models.JSONField(
        default=dict,
        help_text="Store working hours as JSON: {monday: {open, close, closed}, ...}"
    )
    is_published = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Business Info for {self.name}"

    class Meta:
        db_table = 'business_info'


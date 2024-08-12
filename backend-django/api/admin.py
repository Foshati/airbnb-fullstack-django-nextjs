from django.contrib import admin
from .models import (
    User,
    Property,
    Room,
    Booking,
    RoomBooking,
    Review,
    Photo,
    PropertyType,
    Amenity,
    AmenityType,
)

# Register models admin.
admin.site.register(User)
admin.site.register(Property)
admin.site.register(Room)
admin.site.register(Booking)
admin.site.register(RoomBooking)
admin.site.register(Review)
admin.site.register(Photo)
admin.site.register(PropertyType)
admin.site.register(Amenity)
admin.site.register(AmenityType)

# app.py
from ninja import NinjaAPI, Schema
from ninja.security import HttpBearer
from django.shortcuts import get_object_or_404
from .models import User, Property, Booking
from typing import List


app = NinjaAPI()


class AuthBearer(HttpBearer):
    def authenticate(self, request, token):
        if token == "supersecret":
            return token


# Schemas
class UserSchema(Schema):
    username: str
    email: str
    is_host: bool


class PropertySchema(Schema):
    id: int
    title: str
    description: str
    price: float
    location: str
    available_start: str
    available_end: str


class BookingSchema(Schema):
    id: int
    guest_id: int
    property_id: int
    check_in_date: str
    check_out_date: str


# User endpoints
@app.get("/users/{token}", response=UserSchema, auth=AuthBearer())
def user_details(request, token: str):
    user = get_object_or_404(User, auth_token=token)
    return user


# Property endpoints
@app.get("/properties", response=List[PropertySchema])
def list_properties(request):
    return Property.objects.all()


@app.post("/properties", response=PropertySchema)
def create_property(request, property: PropertySchema):
    return Property.objects.create(**property.dict())


@app.get("/properties/{property_id}", response=PropertySchema)
def get_property(request, property_id: int):
    return get_object_or_404(Property, id=property_id)


@app.put("/properties/{property_id}", response=PropertySchema)
def update_property(request, property_id: int, data: PropertySchema):
    property = get_object_or_404(Property, id=property_id)
    for attr, value in data.dict().items():
        setattr(property, attr, value)
    property.save()
    return property


@app.delete("/properties/{property_id}")
def delete_property(request, property_id: int):
    property = get_object_or_404(Property, id=property_id)
    property.delete()
    return {"success": True}


# Booking endpoints
@app.get("/bookings", response=List[BookingSchema])
def list_bookings(request):
    return Booking.objects.all()


@app.post("/bookings", response=BookingSchema)
def create_booking(request, booking: BookingSchema):
    return Booking.objects.create(**booking.dict())


@app.get("/bookings/{booking_id}", response=BookingSchema)
def get_booking(request, booking_id: int):
    return get_object_or_404(Booking, id=booking_id)


@app.put("/bookings/{booking_id}", response=BookingSchema)
def update_booking(request, booking_id: int, data: BookingSchema):
    booking = get_object_or_404(Booking, id=booking_id)
    for attr, value in data.dict().items():
        setattr(booking, attr, value)
    booking.save()
    return booking


@app.delete("/bookings/{booking_id}")
def delete_booking(request, booking_id: int):
    booking = get_object_or_404(Booking, id=booking_id)
    booking.delete()
    return {"success": True}

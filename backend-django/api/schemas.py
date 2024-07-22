from ninja import Schema
from pydantic import BaseModel
from typing import List, Optional


class PropertySchema(Schema):
    id: int
    name: str
    address: str
    description: str
    price: float
    host: int


class BookingSchema(Schema):
    id: int
    property: int
    guest: int
    start_date: str
    end_date: str


class UserDetailsSchema(Schema):
    username: str
    is_host: bool

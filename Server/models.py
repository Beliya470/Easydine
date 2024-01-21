# models.py
from flask_login import UserMixin
from extensions import db
from datetime import datetime

# Define a new Room model
# models.py
# ...

# Define a new Room model
class Room(db.Model):
    __tablename__ = 'room'
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    size = db.Column(db.String(20), nullable=False)
    occupancy = db.Column(db.Integer, nullable=False)
    bed_type = db.Column(db.String(50), nullable=False)
    style = db.Column(db.String(200), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    price = db.Column(db.Float, nullable=False)  # Add the 'price' column

    # Define a relationship with the HotelBooking model
    bookings = db.relationship('HotelBooking', backref='room', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'size': self.size,
            'occupancy': self.occupancy,
            'bed_type': self.bed_type,
            'style': self.style,
            'image_url': self.image_url,
            'price': self.price  # Include the price in the dictionary
        }

# ...


class HotelBooking(db.Model):
    __tablename__ = 'hotel_booking'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'))
    check_in = db.Column(db.DateTime, nullable=False)
    check_out = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'room': self.room.category,  # Display room category
            'check_in': self.check_in.strftime('%Y-%m-%d'),
            'check_out': self.check_out.strftime('%Y-%m-%d')
        }

# User Model
class User(UserMixin, db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    bookings = db.relationship('HotelBooking', backref='user', lazy=True)
    orders = db.relationship('Order', backref='user', lazy=True)
    feedbacks = db.relationship('Feedback', backref='user', lazy=True)
    # special_orders = db.relationship('SpecialOrder', backref='user', lazy=True)
    # hotel_bookings = db.relationship('HotelBooking', backref='user', lazy=True)
    # orders = db.relationship('Order', backref='user', lazy=True)

# Order Model for Room Service and Food
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    details = db.Column(db.String(500), nullable=False)
    status = db.Column(db.String(100), default='Pending')
    order_type = db.Column(db.String(100), nullable=False)

# RoomServiceItem Model for food in the room service
class RoomServiceItem(db.Model):
    __tablename__ = 'room_service_item'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(500))  # Placeholder for image URLs

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image_url': self.image_url
        }



class DeliveryOrder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    details = db.Column(db.String(500), nullable=False)
    status = db.Column(db.String(100), default='Pending')
    delivery_address = db.Column(db.String(200), nullable=False)  # Example field for delivery address
    delivery_time = db.Column(db.DateTime, nullable=False)         # Example field for delivery time
    # Add more fields as necessary for your delivery order


# New SpecialOrder Model
class SpecialOrder(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    request = db.Column(db.String(500), nullable=False)
    status = db.Column(db.String(100), default='Pending')

# New Feedback Model
class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    content = db.Column(db.Text, nullable=False)


# models.py
from flask_login import UserMixin
from extensions import db


class HotelBooking(db.Model):
    __tablename__ = 'hotel_booking'  # Specify the table name if needed
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    room_type = db.Column(db.String(50), nullable=False)
    check_in = db.Column(db.DateTime, nullable=False)
    check_out = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'room_type': self.room_type,
            'check_in': self.check_in.strftime('%Y-%m-%d %H:%M:%S'),
            'check_out': self.check_out.strftime('%Y-%m-%d %H:%M:%S')
            # Add more fields if needed
        }


# User Model
class User(UserMixin, db.Model):
    __tablename__ = 'user'  # It's good practice to define a custom table name.
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)  # Add this line for admin check

    # Add any other fields or methods you need for your user model.

# New Order Model
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    details = db.Column(db.String(500), nullable=False)
    status = db.Column(db.String(100), default='Pending')
    order_type = db.Column(db.String(100), nullable=False)  # To distinguish between 'Room Service' and 'Food'

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

class RoomServiceItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    price = db.Column(db.Float, nullable=False)

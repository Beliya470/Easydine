from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, DateField, SubmitField, TextAreaField, DateTimeField, IntegerField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError
# Import User model from models.py
from models import User

class OrderForm(FlaskForm):
    details = TextAreaField('Order Details', validators=[DataRequired()])
    submit = SubmitField('Place Order')

class DeliveryOrder(FlaskForm):
    # Define the fields and validators for the delivery order form
    details = TextAreaField('Delivery Details', validators=[DataRequired()])
    delivery_address = StringField('Delivery Address', validators=[DataRequired()])
    delivery_time = StringField('Delivery Time', validators=[DataRequired()])
    submit = SubmitField('Place Delivery Order')



class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Register')


class EditBookingForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    room_type = StringField('Room Type', validators=[DataRequired()])
    check_in = DateField('Check-In Date', format='%Y-%m-%d', validators=[DataRequired()])
    check_out = DateField('Check-Out Date', format='%Y-%m-%d', validators=[DataRequired()])
    submit = SubmitField('Update Booking')


class BookingForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    room_type = StringField('Room Type', validators=[DataRequired()])
    check_in = DateTimeField('Check In', validators=[DataRequired()])
    check_out = DateTimeField('Check Out', validators=[DataRequired()])
    submit = SubmitField('Book Now')


class UpdateProfileForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField('Update')

    def validate_username(self, username):
        from models import User
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('That username is taken. Please choose a different one.')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('That email is taken. Please choose a different one.')


class ContactForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    message = TextAreaField('Message', validators=[DataRequired()])
    submit = SubmitField('Send')

class PaymentForm(FlaskForm):
    amount = IntegerField('Amount (in cents)', validators=[DataRequired()])
    submit = SubmitField('Proceed to Payment')
class DeliveryOrderForm(FlaskForm):
    details = TextAreaField('Delivery Details', validators=[DataRequired()])
    submit = SubmitField('Place Delivery Order')

class SpecialOrderForm(FlaskForm):
    request = TextAreaField('Special Request', validators=[DataRequired()])
    submit = SubmitField('Submit Request')

class RoomServiceOrderForm(FlaskForm):
    details = TextAreaField('Order Details', validators=[DataRequired()])
    submit = SubmitField('Place Room Service Order')

class FoodOrderForm(FlaskForm):
    details = TextAreaField('Order Details', validators=[DataRequired()])
    submit = SubmitField('Place Food Order')

# ... other forms ...


class FeedbackForm(FlaskForm):
    content = TextAreaField('Feedback', validators=[DataRequired()])
    submit = SubmitField('Submit Feedback')
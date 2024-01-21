from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
# from flask_cors import CORS
from flask_cors import CORS, cross_origin
import os


from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db, login_manager
from config import Config
from forms import LoginForm, RegistrationForm, BookingForm, EditBookingForm, UpdateProfileForm, ContactForm, OrderForm, SpecialOrderForm, FeedbackForm, RoomServiceOrderForm, FoodOrderForm, DeliveryOrderForm, DeliveryOrder, PaymentForm

# import stripe
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError

# from jwt import encode as jwt_encode
# from jwt import encode as jwt_encode, decode as jwt_decode, ExpiredSignatureError
import jwt
# from jwt.exceptions import ExpiredSignatureError


from datetime import datetime, timedelta



from functools import wraps
import logging
logging.basicConfig(level=logging.INFO)


# from app import db, create_app  # Import the create_app function and other necessary modules

login_manager = LoginManager()

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, supports_credentials=True)

db.init_app(app)
login_manager.init_app(app)
login_manager.login_view = 'login'
from models import User, HotelBooking, Room, Order, SpecialOrder, Feedback, RoomServiceItem

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your_secret_key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///easydine.db')

# JWT token validation function
def validate_jwt_token(token):
    try:
        payload = jwt.decode(token, 'your_secret_key', algorithms=['HS256'])
        return payload['user_id']
    except Exception as e:
        return None


# Decorator for routes that require a token
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        try:
            user_id = validate_jwt_token(token.split(" ")[1])  # Assuming Bearer token
        except:
            return jsonify({'message': 'Token is invalid!'}), 403
        return f(user_id, *args, **kwargs)
    return decorated


# Function to create JWT token
def create_jwt_token(user_id):
    payload = {
        'user_id': user_id,
        # 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        'exp': datetime.utcnow() + timedelta(hours=24)
    }
    token = jwt.encode(payload, 'your_secret_key', algorithm='HS256')
    return token  # Remove .decode('UTF-8')




@app.route('/')
def index():
    return 'Welcome to the home page'

# Example of a protected route using a decorator
@app.route('/protected')
@token_required  # Custom decorator to protect the route
def protected_route(user_id):
    return jsonify({'message': f'Access granted for user with ID: {user_id}'})

# # Setting up the Stripe API Key
# stripe.api_key = 'your_stripe_api_key'

# Configuring the login manager
login_manager.login_view = 'login'

# Loading user information using the login manager
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# @app.route('/user', methods=['GET'])
# @login_required
# def get_user_info():
#     # Retrieve and return user information in a JSON response
#     user_data = {
#         'id': current_user.id,
#         'username': current_user.username,
#         'is_admin': current_user.is_admin,  # Include any other necessary user data
#     }
#     return jsonify(user_data)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        # Render the login form for GET requests
        form = LoginForm()
        return render_template('login.html', form=form)

    if request.method == 'POST':
        if request.is_json:
            # Handle JSON request for login
            data = request.get_json()
            username = data.get('username')
            password = data.get('password')
        else:
            # Handle form submission for login
            form = LoginForm(request.form)
            if form.validate():
                username = form.username.data
                password = form.password.data
            else:
                return render_template('login.html', form=form)

        # Check if the provided username and password are valid
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            token = create_jwt_token(user.id)
            # Return a JSON response with a success message, user admin status, and token
            return jsonify({'success': True, 'is_admin': user.is_admin, 'token': token}), 200

        # Return a JSON response for unsuccessful login attempts
        return jsonify({'success': False, 'error': 'Invalid username or password'}), 401



# Route to retrieve user information
@app.route('/user', methods=['GET'])
@login_required  # Protect this route with login authentication
def get_user_info():
    # Return user information in the response
    user_data = {
        'id': current_user.id,
        'username': current_user.username,
        'is_admin': current_user.is_admin,  # Include any other user data you need
    }
    return jsonify(user_data)




# Route for deleting user accounts
@app.route('/delete-account/<int:user_id>', methods=['DELETE'])
@login_required  # Protect this route with login authentication
def delete_account(user_id):
    if current_user.id != user_id:
        return jsonify({'message': 'Unauthorized'}), 403

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Account deleted successfully'}), 200



# Logout route
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

# User registration route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print("Received data:", data) 
    username = data.get('username')
    password = data.get('password')
    
    is_admin = data.get('is_admin', False)

    if not username or not password:
        return jsonify({'success': False, 'message': 'Missing username or password'}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({'success': False, 'message': 'Username already exists'}), 409
    hashed_password = generate_password_hash(password)
    
    new_user = User(username=username, password=hashed_password, is_admin=is_admin)

    db.session.add(new_user)
    db.session.commit()
    token = create_jwt_token(new_user.id)
    return jsonify({'success': True, 'username': new_user.username, 'is_admin': new_user.is_admin, 'token': token}), 201

# Booking route
@app.route('/book', methods=['GET', 'POST'])
@login_required
def book():
    form = BookingForm()
    if form.validate_on_submit():
        booking = HotelBooking(
            name=form.name.data,
            room_type=form.room_type.data,
            check_in=form.check_in.data,
            check_out=form.check_out.data
        )
        db.session.add(booking)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('book.html', form=form)


# Route to get room service items
@app.route('/room-service/items', methods=['GET'])
def get_room_service_items():
    items = RoomServiceItem.query.all()
    return jsonify([item.to_dict() for item in items])


from flask import request, jsonify
import logging

@app.route('/room-service/items', methods=['POST'])
def add_room_service_item():
    try:
        data = request.json
        logging.info(f"Received data: {data}")  # Log the received data

        new_item = RoomServiceItem(name=data['name'], 
                                   description=data['description'], 
                                   price=data['price'], 
                                   image_url=data['image_url'])
        db.session.add(new_item)
        db.session.commit()

        logging.info(f"Added new item: {new_item}")  # Log the new item details
        return jsonify(new_item.to_dict()), 201

    except Exception as e:
        logging.error(f"Error adding item: {e}")  # Log the error details
        return jsonify({'error': 'Error adding item'}), 500



@app.route('/room-service/items/<int:item_id>', methods=['DELETE'])
def delete_room_service_item(item_id):
    try:
        logging.info(f"Attempting to delete item with ID: {item_id}")  # Log the item ID
        item = RoomServiceItem.query.get(item_id)
        if item:
            db.session.delete(item)
            db.session.commit()
            logging.info("Item deleted successfully")  # Log successful deletion
            return jsonify({'message': 'Item deleted successfully'}), 200
        else:
            logging.warning("Item not found")  # Log item not found
            return jsonify({'error': 'Item not found'}), 404

    except Exception as e:
        return jsonify({'error': 'Error deleting item'}), 500


# Route to view a booking
@app.route('/booking/<int:booking_id>')
@login_required
def view_booking(booking_id):
    booking = HotelBooking.query.get_or_404(booking_id)
    return render_template('view_booking.html', booking=booking)



# Route to edit a booking
@app.route('/edit/<int:booking_id>', methods=['GET', 'POST'])
@login_required
def edit_booking(booking_id):
    booking = HotelBooking.query.get_or_404(booking_id)
    form = EditBookingForm(obj=booking)
    if form.validate_on_submit():
        booking.name = form.name.data
        booking.room_type = form.room_type.data
        booking.check_in = form.check_in.data
        booking.check_out = form.check_out.data
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('edit_booking.html', form=form, booking_id=booking_id)

# Route to delete a booking
@app.route('/delete/<int:booking_id>')
@login_required
def delete_booking(booking_id):
    booking = HotelBooking.query.get_or_404(booking_id)
    db.session.delete(booking)
    db.session.commit()
    return redirect(url_for('index'))



@app.route('/special-order', methods=['POST'])
@token_required
def place_special_order(user_id):
    data = request.get_json()
    special_request = data.get('request')
    
    if not special_request:
        return jsonify({'error': 'No special request provided'}), 400

    try:
        special_order = SpecialOrder(user_id=user_id, request=special_request)
        db.session.add(special_order)
        db.session.commit()
        return jsonify({'success': 'Your special request has been submitted successfully.'})
    except Exception as e:
        return jsonify({'error': 'An error occurred while processing your request: {}'.format(e)}), 500

# # Route to place a special order
# @app.route('/special-order', methods=['POST'])
# @token_required
# def place_special_order():
#     data = request.get_json()
#     if not data:
#         return jsonify({'error': 'No data provided'}), 400

#     user_id = current_user.id
#     special_request = data.get('request')
    
#     if not special_request:
#         return jsonify({'error': 'No special request provided'}), 400

#     try:
#         special_order = SpecialOrder(
#             user_id=user_id,
#             request=special_request
#         )
#         db.session.add(special_order)
#         db.session.commit()
#         return jsonify({'success': 'Your special request has been submitted successfully.'})
#     except Exception as e:
#         return jsonify({'error': 'An error occurred while processing your request: {}'.format(e)}), 500

# Route to place a room service order
@app.route('/room-service/order', methods=['POST'])
@token_required
def place_room_service_order(user_id):
    data = request.json
    items = data.get('items', []) 

    if not user_id:
        return jsonify({'message': 'User ID is missing'}), 400 

    for item in items:
        item_id = item.get('id')
        if item_id is None:
            continue
        room_service_item = RoomServiceItem.query.get(item_id)
        if room_service_item is None:
            continue
        order = Order(user_id=user_id, details=item['name'], order_type='Food')
        db.session.add(order)
    
    db.session.commit()
    return jsonify({'message': 'Order placed successfully'})



# Order Status Route
@app.route('/order/status/<int:order_id>', methods=['GET'])
@login_required
def order_status(order_id):
    order = Order.query.get_or_404(order_id)
    if order.user_id != current_user.id and not (hasattr(current_user, 'is_admin') and current_user.is_admin):
        flash('You do not have permission to view this order.')
        return redirect(url_for('index'))

    # Assume there is a get_status method that retrieves the current status of the order
    status = order.get_status() if hasattr(order, 'get_status') else 'Status not available'

    return render_template('order_status.html', order=order, status=status)




# @app.route('/profile/<int:user_id>', methods=['GET'])
# @login_required
# def profile(user_id):
#     user = User.query.get_or_404(user_id)
    
#     # Ensure the current user is the one requested or an admin
#     if current_user.id != user_id and not current_user.is_admin:
#         return jsonify({'message': 'Access denied'}), 403

#     # Fetch user details and related data
#     user_data = {
#         'username': user.username,
#         # 'email': user.email,
#         'specialOrders': [order.serialize() for order in user.special_orders],
#         'bookings': [booking.serialize() for booking in user.hotel_bookings],
#         'roomServiceOrders': [order.serialize() for order in user.orders]
#     }

#     return jsonify(user_data), 200


# Profile Route
@app.route('/profile/<int:user_id>', methods=['GET', 'PUT'])
@login_required
def profile(user_id):
    user = User.query.get_or_404(user_id)
    # Ensure the current user is the one requested
    if current_user.id != user_id:
        return jsonify({'message': 'Access denied'}), 403

    if request.method == 'GET':
        user_data = {
            'username': current_user.username,
            # 'email': user.email,
            # 'phone_number': user.phone_number,
            'orders': [order.serialize() for order in user.orders]  # serialize method to convert to dict
            # Add other user fields as needed
        }
        return jsonify(user_data), 200

    # Handle PUT request for profile updates
    # ...
    if request.method == 'PUT':
        data = request.get_json()
        user.username = data.get('username', user.username)
        #  user.email = data.get('email', user.email)
        #  user.phone_number = data.get('phone_number', user.phone_number)
        # Update additional fields as necessary
        db.session.commit()
        return jsonify({'message': 'Profile updated successfully'}), 200
    else:
        return jsonify({'message': 'Invalid request method'}), 405

# Feedback Route
@app.route('/feedback', methods=['GET', 'POST'])
@login_required
def feedback():
    form = FeedbackForm()
    if form.validate_on_submit():
        feedback = Feedback(user_id=current_user.id, content=form.content.data)
        db.session.add(feedback)
        db.session.commit()
        flash('Thank you for your feedback.')
        return redirect(url_for('index'))
    return render_template('feedback.html', form=form)

# Delivery System Route
@app.route('/delivery', methods=['GET', 'POST'])
@login_required
def delivery():
    form = DeliveryOrderForm()  # Assuming you have a form for delivery orders

    if request.method == 'POST':
        if form.validate_on_submit():
            # Create a new delivery order
            delivery_order = DeliveryOrder(
                user_id=current_user.id,
                details=form.details.data,
                status="Pending"  # initial status
            )
            db.session.add(delivery_order)
            db.session.commit()
            flash('Your delivery order has been placed.')
            return redirect(url_for('delivery_status', delivery_id=delivery_order.id))

    # Show existing delivery orders for the user (or all if admin)
    user_deliveries = DeliveryOrder.query.filter_by(user_id=current_user.id).all()
    return render_template('delivery.html', form=form, deliveries=user_deliveries)

@app.route('/delivery/status/<int:delivery_id>', methods=['GET'])
@login_required
def delivery_status(delivery_id):
    delivery_order = DeliveryOrder.query.get_or_404(delivery_id)
    # Ensure the user has the right to view this order
    if delivery_order.user_id != current_user.id and not current_user.is_admin:
        flash('You do not have permission to view this order.')
        return redirect(url_for('index'))

    return render_template('delivery_status.html', delivery=delivery_order)

# # Payment Integration Route
# @app.route('/pay', methods=['GET', 'POST'])
# @login_required
# def pay():
#     form = PaymentForm()  # Assuming you have a form for payments

#     if request.method == 'POST':
#         if form.validate_on_submit():
#             try:
#                 # Create a PaymentIntent with the order amount and currency
#                 intent = stripe.PaymentIntent.create(
#                     amount=form.amount.data,  # Amount in cents
#                     currency='usd',
#                     payment_method_types=['card'],
#                 )
#                 return render_template('payment.html', client_secret=intent.client_secret)
#             except stripe.error.StripeError as e:
#                 flash(f'Payment error: {str(e)}')
#                 return redirect(url_for('pay'))

#     return render_template('checkout.html', form=form)

# Contact/Inquiry Route
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    form = ContactForm()  # Assume this form is defined
    if form.validate_on_submit():
        # Logic to handle inquiries
        flash('Your inquiry has been submitted.')
        return redirect(url_for('contact'))
    return render_template('contact.html', form=form)

# Admin Dashboard Route
@app.route('/admin')
# @login_required
def admin_dashboard():
    if not current_user.is_admin:  # Admin check logic
        return redirect(url_for('index'))
    # Admin dashboard logic
    return render_template('admin_dashboard.html')


@app.route('/booking', methods=['POST'])
@token_required
def add_booking(user_id):
    # Parse JSON data from request
    data = request.get_json()
    
    # Extract data for new room
    category = data.get('category')
    size = data.get('size')
    occupancy = data.get('occupancy')
    bed_type = data.get('bed_type')
    style = data.get('style')
    image_url = data.get('image_url')
    price = data.get('price')

    # Validate data (you can add more validation as needed)
    if not all([category, size, occupancy, bed_type, style, price]):
        return jsonify({'error': 'Missing required room information'}), 400

    # Create new room instance
    new_room = Room(
        category=category,
        size=size,
        occupancy=occupancy,
        bed_type=bed_type,
        style=style,
        image_url=image_url,
        price=price
    )

    # Add to database and commit
    try:
        db.session.add(new_room)
        db.session.commit()
        return jsonify({'message': 'Room successfully added', 'room_id': new_room.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred: ' + str(e)}), 500


    # Find the room by ID
    room = Room.query.get(room_id)
    if not room:
        return jsonify({'error': 'Room not found'}), 404

    # Delete the room from database
    try:
        db.session.delete(room)
        db.session.commit()
        return jsonify({'message': 'Room successfully deleted'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'An error occurred: ' + str(e)}), 500


@app.route('/admin/bookings', methods=['GET'])
def admin_bookings():
    bookings = HotelBooking.query.all()
    return jsonify({'bookings': [booking.to_dict() for booking in bookings]})

@app.route('/admin/orders', methods=['GET'])
def admin_orders():
    orders = Order.query.all()
    orders_list = [{'id': order.id, 'details': order.details, 'status': order.status, 'order_type': order.order_type} for order in orders]
    return jsonify({'orders': orders_list})


@app.route('/booking/<int:room_id>', methods=['DELETE'])
def delete_room(room_id):
    logging.info(f"Received delete request for room ID: {room_id}")

    # Find the room by ID
    room = Room.query.get(room_id)
    if not room:
        logging.info("Room not found")
        return jsonify({'error': 'Room not found'}), 404

    # Delete the room from the database
    try:
        db.session.delete(room)
        db.session.commit()
        logging.info("Room deleted successfully")
        return jsonify({'message': 'Room successfully deleted'}), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"An error occurred: {e}")
        return jsonify({'error': 'An error occurred: ' + str(e)}), 500



@app.route('/booking', methods=['GET'])
@token_required
def booking(user_id):
    try:
        available_rooms = Room.query.all()
        return jsonify([room.to_dict() for room in available_rooms])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/make-booking', methods=['POST'])
@token_required
def make_booking(user_id):
    try:
        data = request.get_json()
        new_booking = HotelBooking(
            user_id=user_id,  # Assuming user_id is obtained from the token
            room_id=data['roomId'],
            # check_in=datetime.strptime(data['checkIn'], '%Y-%m-%dT%H:%M:%S.%fZ'),
            check_in = datetime.strptime(data['checkIn'], '%Y-%m-%dT%H:%M:%S.%fZ'),
            check_out = datetime.strptime(data['checkOut'], '%Y-%m-%dT%H:%M:%S.%fZ')
            # check_out=datetime.strptime(data['checkOut'], '%Y-%m-%dT%H:%M:%S.%fZ')
        )
        db.session.add(new_booking)
        db.session.commit()
        return jsonify({'message': 'Booking successful'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def create_tables():
    with app.app_context():
        db.create_all()

# if __name__ == '__main__':
#     create_tables()  # Create tables if they don't exist
#     # app.run(debug=True)
#     app.config['DEBUG'] = False
if __name__ == '__main__':
    create_tables()  # Create tables if they don't exist
    app.config['DEBUG'] = False
    app.run()





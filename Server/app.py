from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db, login_manager
from config import Config
from forms import LoginForm, RegistrationForm, BookingForm, EditBookingForm, UpdateProfileForm, ContactForm, OrderForm, SpecialOrderForm, FeedbackForm, RoomServiceOrderForm, FoodOrderForm, DeliveryOrderForm, DeliveryOrder, PaymentForm

import stripe
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError


login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    db.init_app(app)
    login_manager.init_app(app)
    from models import User, HotelBooking, Order, SpecialOrder, Feedback, RoomServiceItem


    # Register Blueprints and other app configurations

    # Stripe API Key setup
    stripe.api_key = 'easydine'

    login_manager.login_view = 'login'

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # Routes
    @app.route('/')
    @login_required
    def index():
        bookings = HotelBooking.query.all()
        return render_template('index.html', bookings=bookings)
    



    @app.route('/login', methods=['POST'])
    def login():
        if request.is_json:  # Check if the request contains JSON data
            data = request.get_json()
            username = data.get('username')
            password = data.get('password')
        else:
            username = request.form.get('username')
            password = request.form.get('password')

        if not username or not password:
            return jsonify({'success': False, 'error': 'Invalid request'}), 400

    # Query your database for the user
        user = User.query.filter_by(username=username).first()

    # If user exists and password is correct
        if user and check_password_hash(user.password, password):
           
        # Use Flask-Login to log in the user and start their session
           login_user(user)
           print(f"User logged in: {user.username}, Admin status: {user.is_admin}")  # Add this line
        # Return a JSON response with success and admin status
           return jsonify({'success': True, 'is_admin': user.is_admin}), 200

    # If the login credentials are incorrect, return an error
        return jsonify({'success': False, 'error': 'Invalid username or password'}), 401


    
    # @app.route('/login', methods=['GET', 'POST'])
    # def login():
    #     data = request.get_json() 
    #     form = LoginForm()  # LoginForm is a FlaskForm with username and password fields
    #     if form.validate_on_submit():
    #         # Query your database for the user
    #         user = User.query.filter_by(username=form.username.data).first()
    #         # If user exists and password is correct
    #         if user and check_password_hash(user.password, form.password.data):
    #             # Use Flask-Login to log in the user and start their session
    #             login_user(user)
    #             print(f"User logged in: {user.username}, Admin status: {user.is_admin}")  # Add this line
    #             # Redirect to the index page if the user is authenticated
    #             return jsonify({'success': True, 'is_admin': user.is_admin}), 200
    #         else:
    #             # If the login credentials are incorrect, return an error
    #             return jsonify({'success': False, 'error': 'Invalid username or password'}), 401
    #     # If the request is a GET or the form is not valid, render the login template
    #     return render_template('login.html', form=form)
    

    @app.route('/logout')
    @login_required
    def logout():
        logout_user()
        return redirect(url_for('login'))
    



    @app.route('/register', methods=['POST'])
    def register():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        is_admin = data.get('is_admin', False) 
        if not username or not password:
            return jsonify({'success': False, 'message': 'Missing username or password'}), 400
        if User.query.filter_by(username=username).first():
            return jsonify({'success': False, 'message': 'Username already exists'}), 409
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        # return jsonify({'success': True, 'username': new_user.username}), 201
        return jsonify({'success': True, 'username': new_user.username, 'is_admin': new_user.is_admin}), 201
    

    # @app.route('/register', methods=['GET', 'POST'])
    # def register():
    #     form = RegistrationForm()
    #     if form.validate_on_submit():
    #         hashed_password = generate_password_hash(form.password.data, method='sha256')
    #         new_user = User(username=form.username.data, password=hashed_password)
    #         db.session.add(new_user)
    #         db.session.commit()
    #         return redirect(url_for('login'))
    #     return render_template('register.html', form=form)

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

    @app.route('/room-service/items', methods=['GET'])
    def get_room_service_items():
        items = RoomServiceItem.query.all()
        return jsonify([item.to_dict() for item in items])

    @app.route('/booking/<int:booking_id>')
    @login_required
    def view_booking(booking_id):
        booking = HotelBooking.query.get_or_404(booking_id)
        return render_template('view_booking.html', booking=booking)

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

    @app.route('/delete/<int:booking_id>')
    @login_required
    def delete_booking(booking_id):
        booking = HotelBooking.query.get_or_404(booking_id)
        db.session.delete(booking)
        db.session.commit()
        return redirect(url_for('index'))

    # Order Routes
    # Special Order Route
    @app.route('/special-order', methods=['GET', 'POST'])
    @login_required
    def place_special_order():
        form = SpecialOrderForm()  # Ensure this form is defined in your forms.py
        if form.validate_on_submit():
            special_order = SpecialOrder(
                user_id=current_user.id,
                request=form.request.data
            )
            db.session.add(special_order)
            db.session.commit()
            flash('Your special request has been submitted successfully.')
            return redirect(url_for('index'))
        return render_template('place_special_order.html', form=form)

    @app.route('/room-service/order', methods=['POST'])
    @login_required
    def place_room_service_order():
        form = RoomServiceOrderForm()
        if form.validate_on_submit():
            item_id = form.item_id.data
            item = RoomServiceItem.query.get(item_id)

            if item:
                order = Order(
                    user_id=current_user.id,
                    details=f"Room Service: {item.name}\n{form.details.data}",
                    order_type='Room Service'
                )
                db.session.add(order)
                db.session.commit()
                flash('Your room service order has been placed successfully.')
                return redirect(url_for('index'))
            else:
                flash('Invalid room service item selected.')
        return render_template('place_room_service_order.html', form=form)

    # Food Order Route
    @app.route('/food/order', methods=['GET', 'POST'])
    @login_required
    def place_food_order():
        form = FoodOrderForm()
        if form.validate_on_submit():
            order = Order(
                user_id=current_user.id,
                details=form.details.data,
                order_type='Food'
            )
            db.session.add(order)
            db.session.commit()
            flash('Your food order has been received and is being processed.')
            return redirect(url_for('order_status', order_id=order.id))
        return render_template('place_food_order.html', form=form)

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

    # Profile Management Route
    @app.route('/profile', methods=['GET', 'POST'])
    @login_required
    def profile():
        form = UpdateProfileForm()  # Assume this form is defined
        if form.validate_on_submit():
            # Update user profile logic
            flash('Profile updated successfully.')
            return redirect(url_for('profile'))
        return render_template('profile.html', form=form)

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

    # Payment Integration Route
    @app.route('/pay', methods=['GET', 'POST'])
    @login_required
    def pay():
        form = PaymentForm()  # Assuming you have a form for payments

        if request.method == 'POST':
            if form.validate_on_submit():
                try:
                    # Create a PaymentIntent with the order amount and currency
                    intent = stripe.PaymentIntent.create(
                        amount=form.amount.data,  # Amount in cents
                        currency='usd',
                        payment_method_types=['card'],
                    )
                    return render_template('payment.html', client_secret=intent.client_secret)
                except stripe.error.StripeError as e:
                    flash(f'Payment error: {str(e)}')
                    return redirect(url_for('pay'))

        return render_template('checkout.html', form=form)

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
    @login_required
    def admin_dashboard():
        if not current_user.is_admin:  # Admin check logic
            return redirect(url_for('index'))
        # Admin dashboard logic
        return render_template('admin_dashboard.html')

    # API Routes Example
    @app.route('/api/bookings', methods=['GET'])
    def api_bookings():
        bookings = HotelBooking.query.all()
        return jsonify([booking.to_dict() for booking in bookings])  # Assuming a to_dict method in HotelBooking

    return app

    
def create_tables():
    app = create_app()
    with app.app_context():
        db.create_all()


if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)


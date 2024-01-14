from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from forms import LoginForm, RegistrationForm, BookingForm, EditBookingForm

# Configuration and App Initialization
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///easydine.db'
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# User Model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Booking Model
class HotelBooking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    room_type = db.Column(db.String(50), nullable=False)
    check_in = db.Column(db.DateTime, nullable=False)
    check_out = db.Column(db.DateTime, nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Routes
@app.route('/')
@login_required
def index():
    bookings = HotelBooking.query.all()
    return render_template('index.html', bookings=bookings)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and check_password_hash(user.password, form.password.data):
            login_user(user)
            return redirect(url_for('index'))
        else:
            flash('Invalid username or password')
    return render_template('login.html', form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = generate_password_hash(form.password.data, method='sha256')
        new_user = User(username=form.username.data, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

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

if __name__ == '__main__':
    app.run(debug=True)

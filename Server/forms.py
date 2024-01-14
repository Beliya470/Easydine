from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, SubmitField
from wtforms.validators import DataRequired

class BookingForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    room_type = StringField('Room Type', validators=[DataRequired()])
    check_in = DateTimeField('Check In', validators=[DataRequired()])
    check_out = DateTimeField('Check Out', validators=[DataRequired()])
    submit = SubmitField('Book Now')

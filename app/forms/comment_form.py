from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    content = StringField('Content', validators=[DataRequired()])
    duck_id = IntegerField('Duck_Id', validators=[DataRequired()])

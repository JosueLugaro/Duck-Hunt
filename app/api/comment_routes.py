from flask import Blueprint, jsonify, session, request
from app.models import Comment, db
from app.forms import CommentForm
from flask_login import current_user, login_required

comment_routes = Blueprint('comment', __name__)

@comment_routes.route('/')
@login_required
def get_all_comments():
    comments = Comment.query.all()
    test = [comment.to_dict() for comment in comments]
    return {"comments": [comment.to_dict() for comment in comments]}

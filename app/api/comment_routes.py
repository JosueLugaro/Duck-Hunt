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

@comment_routes.route('/new', methods=["POST"])
@login_required
def new_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment(
            user_id=current_user.id,
            duck_id=form.data["duck_id"],
            content=form.data["content"]
        )

        db.session.add(new_comment)
        db.session.commit()

        return {
            "comment": new_comment.to_dict()
        }

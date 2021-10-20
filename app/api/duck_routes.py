from flask import Blueprint, jsonify, session, request
from app.models import Duck, db
from flask_login import current_user, login_required

duck_routes = Blueprint('duck', __name__)

@duck_routes.route('/')
@login_required
def get_all_ducks():
    ducks = Duck.query.filter(Post.user_id != current_user.id).all()

    return {
        "posts": [duck.to_dict() for duck in ducks]
    }

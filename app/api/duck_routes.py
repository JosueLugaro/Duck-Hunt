from flask import Blueprint, jsonify, session, request
from app.models import Duck, db
from app.forms import DuckForm
from flask_login import current_user, login_required
from app.aws import (upload_file_to_s3, allowed_file, get_unique_filename)

duck_routes = Blueprint('duck', __name__)

@duck_routes.route('/')
@login_required
def get_all_ducks():
    ducks = Duck.query.filter(Duck.user_id != current_user.id).all()

    return {
        "posts": [duck.to_dict() for duck in ducks]
    }


@duck_routes.route('/<int:duck_id>')
@login_required
def get_a_specific_duck(duck_id):
    duck = Duck.query.filter(Duck.id == duck_id).first()

    return {
        "post": duck.to_dict()
    }


@duck_routes.route('/new', methods=["POST"])
# @login_required
def new_duck():
    print(request)
    return "It works!"
    # if "image" not in request.files:
    #     return {"errors": ["media required"]}, 400

    # image = request.files["image"]

    # if not allowed_file(content.filename):
    #     return {"errors": ["That file type is not permitted"]}, 400

    # image.filename = get_unique_filename(image.filename)

    # upload = upload_file_to_s3(image)

    # if "url" not in upload:
    #     return upload, 400

    # url = upload["url"]

    # new_duck = Duck(user_id=current_user.id, name=request.name, )

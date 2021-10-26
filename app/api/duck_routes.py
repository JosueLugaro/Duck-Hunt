from flask import Blueprint, jsonify, session, request
from app.models import Duck, db
from app.forms import DuckForm
from flask_login import current_user, login_required
from app.aws import (upload_file_to_s3, allowed_file, get_unique_filename)

duck_routes = Blueprint('duck', __name__)

# Get all posts
@duck_routes.route('/')
@login_required
def get_all_ducks():
    ducks = Duck.query.all()

    return {"ducks": [duck.to_dict() for duck in ducks]}

#Get a specific post
@duck_routes.route('/<int:duck_id>')
@login_required
def get_a_specific_duck(duck_id):
    duck = Duck.query.filter(Duck.id == duck_id).first()

    return {
        "post": duck.to_dict()
    }

#Create a new post
@duck_routes.route('/new', methods=["POST"])
@login_required
def new_duck():
    if "image" not in request.files:
        return {"errors": ["media required"]}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": ["That file type is not permitted"]}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    form = DuckForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_duck = Duck(
            user_id=current_user.id,
            name=form.data["name"],
            description=form.data["description"],
            image=url
        )

        db.session.add(new_duck)
        db.session.commit()
        return {
            "post": new_duck.to_dict()
        }

# Delete a post
@duck_routes.route('/<int:duck_id>/delete')
@login_required
def delete_duck(duck_id):
    duck = Duck.query.filter(duck_id == Duck.id).first()

    db.session.delete(duck)
    db.session.commit()
    return "Deletion successful!"

@duck_routes.route('/<int:duck_id>/update', methods=["POST"])
@login_required
def update_duck(duck_id):
    duck = Duck.query.filter(duck_id == Duck.id).first()

    form = DuckForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        duck.name = form.data["name"]
        duck.description = form.data["description"]
        db.session.commit()
        return "Update successful!"
    else:
        return "Update was not successful."

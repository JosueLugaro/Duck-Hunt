from flask import Blueprint, jsonify, session, request
from app.models import User, db
from flask_login import current_user, login_required

duck_routes = Blueprint('duck', __name__)

from flask import Blueprint, request, jsonify
from models import db, User
from datetime import datetime
from apis.routes.Security import session_required
from models.Notifications import ErrorProcessor
user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/users', methods=['POST'])
@session_required
def add_user():
    data = request.get_json()
    required_fields = ['username', 'password', 'birthdate']
    
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 409
    
    try:
        birthdate = datetime.strptime(data['birthdate'], '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Invalid birthdate format, use YYYY-MM-DD'}), 400
    
    new_user = User(
        username=data['username'],
        birthdate=birthdate
    )
    new_user.set_password(data['password'])
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify(Notifications.process_error("admin_user_create")), 200
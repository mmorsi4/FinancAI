from flask import Blueprint, request, jsonify
from datetime import datetime
from models.dbSchema import db, UserTransactions, User
from apis.routes.Security import session_required

user_transactions_bp = Blueprint('user_transactions_bp', __name__)

@user_transactions_bp.route('/users/transactions', methods=['GET'])
@session_required
def get_user_transactions(user_id):
    transactions = UserTransactions.query.filter_by(user_id=user_id).all()
    
    if not transactions:
        return jsonify({'message': 'No transactions found for this user'}), 404
    
    transactions_data = [{
        'id': t.id,
        'user_id': t.user_id,
        'amount': t.amount,
        'category': t.category,
        'date': t.date.strftime('%Y-%m-%d %H:%M:%S') if t.date else None,
        'status': t.status.name,  # Assuming TransactionStatus is an Enum
        'created_at': t.created_at.strftime('%Y-%m-%d %H:%M:%S') if t.created_at else None,
        'updated_at': t.updated_at.strftime('%Y-%m-%d %H:%M:%S') if t.updated_at else None
    } for t in transactions]
    
    return jsonify(transactions_data), 200

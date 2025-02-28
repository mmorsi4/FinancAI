from flask import Blueprint, jsonify
from models.dbSchema import db, User, Business, AssetType, Asset, Finance, UserTransactions, BusinessTransactions, Article

dump_bp = Blueprint('dump', __name__)

@dump_bp.route('/dump', methods=['GET'])
def dump_database():
    try:
        data = {
            "users": [user.__dict__ for user in User.query.all()],
            "businesses": [business.__dict__ for business in Business.query.all()],
            "asset_types": [asset_type.__dict__ for asset_type in AssetType.query.all()],
            "assets": [asset.__dict__ for asset in Asset.query.all()],
            "finances": [finance.__dict__ for finance in Finance.query.all()],
            "user_transactions": [transaction.__dict__ for transaction in UserTransactions.query.all()],
            "business_transactions": [transaction.__dict__ for transaction in BusinessTransactions.query.all()],
            "articles": [article.__dict__ for article in Article.query.all()],
        }

        # Remove SQLAlchemy internal attributes (e.g., _sa_instance_state)
        for table_name, records in data.items():
            for record in records:
                record.pop('_sa_instance_state', None)

        return jsonify(data), 200
    
    except Exception as e:
        return jsonify({"message": "Error retrieving database dump", "error": str(e)}), 500

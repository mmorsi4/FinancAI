from flask import Blueprint, request, jsonify
from models import db, Asset, AssetType
from apis.routes.Security import session_required

assets_bp = Blueprint('assets_bp', __name__)

@assets_bp.route('/assets', methods=['GET'])
@session_required
def get_assets():
    # Get filters from request arguments
    filters = {}
    if 'id' in request.args:
        filters['id'] = request.args.get('id', type=int)
    if 'business_id' in request.args:
        filters['business_id'] = request.args.get('business_id', type=int)
    if 'type_id' in request.args:
        filters['type_id'] = request.args.get('type_id', type=int)

    # Get requested columns
    requested_columns = request.args.get('fields')

    # Define all possible columns
    valid_columns = {
        'id': Asset.id,
        'business_id': Asset.business_id,
        'type_id': Asset.type_id,
        'value': Asset.value,
        'created_at': Asset.created_at,
        'updated_at': Asset.updated_at,
        'type_name': AssetType.type_name  # Join with AssetType
    }

    # If specific fields are requested, filter them
    if requested_columns:
        requested_columns = requested_columns.split(',')
        selected_columns = [valid_columns[col] for col in requested_columns if col in valid_columns]
    else:
        selected_columns = list(valid_columns.values())  # Default: select all columns

    # Perform the query with filtering
    query = db.session.query(*selected_columns).join(AssetType, Asset.type_id == AssetType.id)

    if filters:
        query = query.filter_by(**filters)

    assets = query.all()

    # Convert query result into a list of dictionaries
    result = [
        {col: getattr(asset, col) if hasattr(asset, col) else None for col in requested_columns}
        for asset in assets
    ]

    return jsonify(result), 200

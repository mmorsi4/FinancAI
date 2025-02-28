from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

bp = Blueprint("user", __name__)

@bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    return jsonify({"message": "This is a protected route"}), 200
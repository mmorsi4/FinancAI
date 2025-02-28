from flask import Blueprint, request, jsonify
from models.dbSchema import Charity, Campaign
from apis.routes.Security import session_required
from models.Notifications import ErrorProcessor

search_bp = Blueprint('search', __name__)
Notifications = ErrorProcessor()

@search_bp.route('/article', methods=['GET'])  # route is /search/article
@session_required
def search_article():
    name = request.args.get('title', '').strip().lower()

    if not name:
        return jsonify(Notifications.process_error("search_invalid_name")), 400

    # Add regex for partial search
    regex_name = f"%{name}%"

    # Query charities with optional category filtering
    charities = Article.query.filter(Article.name.ilike(regex_name))
    if category:
        charities = charities.filter(Article.category == category)

    charities = charities.all()

    if not charities:
        return jsonify(Notifications.process_error("search_no_results")), 404

    # Serialize charities into JSON
    json_articles = [
        {
            "id": Article.id,
            "title": Article.title,
            "description": Article.description,
        } for Article in charities
    ]

    return jsonify(json_charities), 200

@search_bp.route('/charities', methods=['GET'])
def get_charties():
    charities = Article.query.all()
    json_charities = [
        {
            "id": Article.id,
            "title": Article.title,
            "description": Article.description,

        } for Article in charities
    ]

    return jsonify(json_charities), 200


@search_bp.route('/charities/<int:Article_id>', methods=['GET'])
def get_Article(Article_id):
    Article = Article.query.filter_by(id=Article_id).first()
    if Article:
        return jsonify({
            "id": Article.id,
            "title": Article.title,
            "description": Article.description,
        }), 200

    return jsonify({"error": "Charity not found"}), 404
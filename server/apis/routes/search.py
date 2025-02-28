from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from apis.routes.Security import session_required
from models.Notifications import ErrorProcessor
from models.dbSchema import Article

search_bp = Blueprint('search', __name__)
Notifications = ErrorProcessor()
db = SQLAlchemy()

@search_bp.route('/article', methods=['GET'])  # Route: /search/article
@session_required
def search_article():
    title = request.args.get('title', '').strip().lower()

    if not title:
        return jsonify(Notifications.process_error("search_invalid")), 400

    # Perform case-insensitive search with partial match
    regex_title = f"%{title}%"
    articles = Article.query.filter(Article.title.ilike(regex_title)).all()

    if not articles:
        return jsonify(Notifications.process_error("search_invalid")), 404

    json_articles = [
        {
            "id":          article.id,
            "title":       article.title,
            "description": article.description,
            "image":       article.image,
            "created_at":  article.created_at.isoformat(),
            "updated_at":  article.updated_at.isoformat() if article.updated_at else None
        }              for article in articles
    ]

    return jsonify(json_articles), 200

@search_bp.route('/articles', methods=['GET'])
def get_articles():
    articles = Article.query.all()
    json_articles = [
        {
            "id": article.id,
            "title": article.title,
            "description": article.description,
            "image": article.image,
            "created_at": article.created_at.isoformat(),
            "updated_at": article.updated_at.isoformat() if article.updated_at else None
        } for article in articles
    ]

    return jsonify(json_articles), 200

@search_bp.route('/articles/<int:article_id>', methods=['GET'])
def get_article(article_id):
    article = Article.query.get_or_404(article_id, description="Article not found")

    return jsonify({
        "id": article.id,
        "title": article.title,
        "description": article.description,
        "image": article.image,
        "created_at": article.created_at.isoformat(),
        "updated_at": article.updated_at.isoformat() if article.updated_at else None
    }), 200

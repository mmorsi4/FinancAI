from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from enum import Enum as PyEnum
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class UserRole(PyEnum):
    OWNER = "owner"
    REGULAR = "regular"

class TransactionStatus(PyEnum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    birthdate = db.Column(db.Date, nullable=False)
    role = db.Column(db.Enum(UserRole), default=UserRole.REGULAR)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Business(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    industry = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class AssetType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type_name = db.Column(db.String(50), unique=True, nullable=False)

class Asset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('business.id', ondelete='CASCADE'), index=True, nullable=False)
    type_id = db.Column(db.Integer, db.ForeignKey('asset_type.id', ondelete='CASCADE'), index=True, nullable=False)
    value = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Finance(db.Model):
    id = db.Column(db.Integer, db.ForeignKey('business.id', ondelete='CASCADE'), primary_key=True, index=True)
    revenue = db.Column(db.Integer, default=0)
    revenue_category = db.Column(db.String(100))
    expenses = db.Column(db.Integer, default=0)
    expense_category = db.Column(db.String(100))
    net_profit = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class UserTransaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), index=True, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.Enum(TransactionStatus), default=TransactionStatus.PENDING)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class BusinessTransaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('business.id', ondelete='CASCADE'), index=True, nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.Enum(TransactionStatus), default=TransactionStatus.PENDING)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


#this is to operate on articles read and shown
class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement = True, default = 0)
    image = db.Column (db.String(255), nullable=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column (db.Text, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


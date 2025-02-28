import os
from dotenv import load_dotenv
import urllib.parse
from sqlalchemy import create_engine

load_dotenv()

class Config:
    # Set database mode from environment or default to 'railway'
    DATABASE_MODE = os.getenv('DATABASE_MODE', 'railway')

    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'default-secret-key')

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Database credentials (Railway)
    DB_USERNAME = urllib.parse.quote(os.getenv('RAILWAY_DB_USERNAME', 'root'))
    DB_PASSWORD = urllib.parse.quote(os.getenv('RAILWAY_DB_PASSWORD', 'HYTzOzlCdDxPAIdcvBTklGAyjvVtLHMY'))
    DB_HOST = os.getenv('RAILWAY_DB_HOST', 'metro.proxy.rlwy.net')
    DB_PORT = os.getenv('RAILWAY_DB_PORT', '46682')
    DB_NAME = os.getenv('RAILWAY_DB_NAME', 'railway')

    @classmethod
    def get_database_uri(cls):
        if cls.DATABASE_MODE == 'local':
            username = urllib.parse.quote(os.getenv('LOCAL_DB_USERNAME', 'root'))
            password = urllib.parse.quote(os.getenv('LOCAL_DB_PASSWORD', 'password'))
            host = os.getenv('LOCAL_DB_HOST', 'localhost')
            port = os.getenv('LOCAL_DB_PORT', '3306')
            db_name = os.getenv('LOCAL_DB_NAME', 'my_database')
        elif cls.DATABASE_MODE == 'railway':
            username = cls.DB_USERNAME
            password = cls.DB_PASSWORD
            host = cls.DB_HOST
            port = cls.DB_PORT
            db_name = cls.DB_NAME
        else:
            raise ValueError("Invalid DATABASE_MODE. Choose 'local' or 'railway'.")

        print(f"Connecting to database: {username}@{host}:{port}/{db_name}")

        return f"mysql+pymysql://{username}:{password}@{host}:{port}/{db_name}"

# Set the SQLAlchemy URI
Config.SQLALCHEMY_DATABASE_URI = Config.get_database_uri()

# Attempt to connect to the database
try:
    engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
    connection = engine.connect()
    print("Successfully connected to the database!")
    connection.close()
except Exception as e:
    print(f"Database connection error: {e}")

from flask import Flask ,jsonify,request
from flask_cors import CORS 
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask (__name__)
CORS (app)

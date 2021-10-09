import os
from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from yaml import load, Loader

with open('./config.yaml', 'r') as f:
    config = dict(load(f, Loader=Loader))
    print(config["username"])

client = MongoClient("mongodb+srv://%s:%s@%s?retryWrites=true&w=majority" % (config["username"], config["pw"], config["mongodb_uri"]), connect=False)
db = client["MetaSynDB"]
all_cards = db.AllCards

app = Flask(__name__, instance_relative_config=True)
CORS(app)
app.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
)

# ensure instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

from metasyn_app import routes
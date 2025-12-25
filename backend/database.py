from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = MongoClient(MONGODB_URL)
db = client[DATABASE_NAME]
transactions_collection = db["transactions"]

from pymongo import MongoClient
from sentence_transformers import SentenceTransformer
import json
from pprint import pprint
import os
import re

uri = os.environ.het("MONGODB_URI")
client = MongoClient(uri)
DB_NAME = "chatnet"
COLLECTION_NAME = "user"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "vector_index"
MONGODB_COLLECTION = client[DB_NAME][COLLECTION_NAME]

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

def add_entry(username, gender, age, answer1, answer2, answer3):
    text = f"I am a {gender}.I am {age} years old. {answer1}. {answer2}. {answer3}."
    cleaned_text = re.sub(r'[^a-zA-Z0-9\s.,?!]', '', text)
    embedding = model.encode(cleaned_text).tolist()
    data = {
        "username": username,
        "gender": gender,
        "description": f"{answer1} {answer2} {answer3}",
        "embedding": embedding
    }
    MONGODB_COLLECTION.insert_one(data)

def find_users_emb(prompt):
    cleaned_prompt = re.sub(r'[^a-zA-Z0-9\s.,?!]', '', prompt)
    prompt_embedding = model.encode(cleaned_prompt).tolist()
    pipeline = [
        {
            '$vectorSearch': {
                'index': ATLAS_VECTOR_SEARCH_INDEX_NAME,
                'path': 'embedding',
                'queryVector': prompt_embedding,
                'numCandidates': 50,
                'limit': 5
            }
        }
    ]
    result = MONGODB_COLLECTION.aggregate(pipeline)
    output = []
    for user in result:
        output.append(user['username'])
    return output

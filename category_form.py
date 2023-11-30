from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os

uri = "mongodb+srv://mailticks:mailticks2023@gmailcluster.nk4rv0b.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
    from pymongo import MongoClient


db = client["test"]  # Replace with your database name
category_db=db["categories"]
feedback_db=db["feedbacks"]

categories=category_db.find()
category_options=""""""

for data in categories:
    category_options=category_options + "- " + data['category'] + ' (' + data['description'] +  ")\n"
    
print(category_options)

feedbacks=feedback_db.find()
feedback_prompt=""""""

for data in feedbacks:
    feedback_prompt=feedback_prompt+'Text: ' + data['mail'] + 'Categories: ' + data['category'] 

print(feedback_prompt)
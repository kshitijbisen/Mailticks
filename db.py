from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime, timedelta

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


db = client["test"]  
collection = db["emails"]  
category_db=db["categories"]
feedback_db=db["feedbacks"]

categories=category_db.find()
category_options=""""""

for data in categories:
    category_options=category_options + "- " + data['category'] +" ("+data['description']+")" +"\n"
    
print(category_options)

feedbacks=feedback_db.find()
feedback_prompt=""""""

for data in feedbacks:
    feedback_prompt=feedback_prompt+'Text: ' + data['mail'] + 'Categories: ' + data['category'] 

print(feedback_prompt)


import imaplib
import email
from email.header import decode_header
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import yaml  # To load saved login credentials from a yaml file

with open("credentials.yaml") as f:
    content = f.read()

# from credentials.yaml import user name and password
my_credentials = yaml.load(content, Loader=yaml.FullLoader)

# Load the user name and passwd from yaml file
user, password = my_credentials["user"], my_credentials["password"]

# URL for IMAP connection
imap_url = 'imap.gmail.com'

# Connection with GMAIL using SSL
mail = imaplib.IMAP4_SSL(imap_url)

# Log in using your credentials
mail.login(user, password)

# Select the Inbox to fetch messages
mail.select('Inbox')

# Search for all emails
result, data = mail.search(None, "ALL",'(UNSEEN)')  # Retrieve all emails

# Get the list of email IDs
email_ids = data[0].split()

mailList=[]
# Loop through each email ID and fetch the email
import vertexai
from vertexai.language_models import TextGenerationModel

vertexai.init(project="mailapplication-404610", location="us-central1")
parameters = {
    # "candidate_count": 1,
    "max_output_tokens": 256,
    "temperature": 0.2,
    "top_p": 0.8,
    "top_k": 40
}

model = TextGenerationModel.from_pretrained("text-bison")

for email_id in email_ids:
    
    result, email_data = mail.fetch(email_id, "(RFC822)")
    raw_email = email_data[0][1]

    # Parse the raw email content using the email library
    msg = email.message_from_bytes(raw_email)

    # Print the email details
    subject, _ = decode_header(msg["Subject"])[0]
    from_, _ = decode_header(msg.get("From"))[0]
    date_, _ = (decode_header(msg.get("Date"))[0])
    date_=date_[:26]+"+0530"
    print(date_)
    
    date_object =datetime.strptime(date_, "%a, %d %b %Y %H:%M:%S %z")
    print(date_object)

    content=""
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain":
                 content=content+part.get_payload(decode=True).decode("utf-8")
    else:
        content=content+msg.get_payload(decode=True).decode("utf-8")
    content=subject+"\n"+content
    prompt="""Define the categories for the text below?
Options:
"""+category_options+"""

"""+feedback_prompt+"""

Text: """+content+"""
Categories:
"""
    response = model.predict(
prompt,
    **parameters
)
    print(response.text)
    thisdict = {
    "to":"test.mailticks@gmail.com",
    "from": from_.split('<')[1].split('>')[0].strip(),
    "subject": subject,
    "body": content,
    "Date":date_object,
    "image":"",
    "starred":False,
    "name":from_.split('<')[0].strip(),
    "starred":False,
    "bin":False,
    "type":"inbox",
    "category":response.text.strip()
}   
    mailList.append(thisdict)
# Logout and close the connection
mail.logout()
print(mailList)


# Insert data into the collection
collection.insert_many(mailList)

print("Data inserted successfully.")

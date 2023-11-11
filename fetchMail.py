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
result, data = mail.search(None, "ALL")  # Retrieve all emails

# Get the list of email IDs
email_ids = data[0].split()

mailList=[]
# Loop through each email ID and fetch the email
for email_id in email_ids:
    
    result, email_data = mail.fetch(email_id, "(RFC822)")
    raw_email = email_data[0][1]

    # Parse the raw email content using the email library
    msg = email.message_from_bytes(raw_email)

    # Print the email details
    subject, _ = decode_header(msg["Subject"])[0]
    from_, _ = decode_header(msg.get("From"))[0]
    content=""
    if msg.is_multipart():
        for part in msg.walk():
            if part.get_content_type() == "text/plain":
                 content=content+part.get_payload(decode=True).decode("utf-8")
    else:
        content=content+msg.get_payload(decode=True).decode("utf-8")
    thisdict = {
    "from": from_,
    "subject": subject,
    "body": content
    }   
    mailList.append(thisdict)
# Logout and close the connection
mail.logout()
print(mailList)


uri = "mongodb+srv://mailticks:<password>@gmailcluster.nk4rv0b.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
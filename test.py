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
content="""Dear Kshitij,
The product was really good. Loved it!
Thanks"""
model = TextGenerationModel.from_pretrained("text-bison")
response = model.predict(
    """Define the categories for the text below?
Options:
- feedback  (Mails regarding feedbacks about products and services from users)
- job (Mails regarding job recruitment and job applications from companies and recruiters or HR)

Text: """+content+"""
Categories:
""",
    **parameters
)
print(f"Response from Model: {response.text}")
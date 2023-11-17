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
response = model.predict(
    """Define the categories for the text below?
Options:
- job
- feedback

Text: To expand our workforce, we are seeking knowledgeable and proficient subject matter experts (SMEs). You will be essential to the creation and improvement of services or procedures as a subject matter expert. The perfect applicant will be knowledgeable about the field, possess a solid understanding of its concepts, and be dedicated to their work.
Selected intern's day-to-day responsibilities include:
1. Taking questions on a daily basis
2. Structuring them in alignment with the guidelines
3. Ensuring to submit assigned work on time and it should be error-free
Categories: job

Text: The experience was amazing and the product working good for us.
Categories: feedback

Text: Here are some of the latest opportunities matching your preferences. Apply now! Actively hiring
Categories:
""",
    **parameters
)
print(f"Response from Model: {response.text}")
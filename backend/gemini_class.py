import os

import google.generativeai as genai  # type: ignore


class myGeminiAI:
    def __init__(self, model_name):
        self.model_name = model_name
        self.api_key = os.getenv("GOOGLE_API_KEY")
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel(self.model_name)

    def generate_response(self, input_text):
        response = self.model.generate_content(input_text)
        return response

from gemini_class import myGeminiAI

model_name = "gemini-1.5-flash"
my_ai = myGeminiAI(model_name=model_name)


if __name__ == "__main__":
    input = "how are you today?"
    response = my_ai.generate_response(input_text=input)
    print(response.text)

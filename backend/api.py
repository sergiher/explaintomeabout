from flask import Flask, jsonify, request, stream_template
from flask_cors import CORS  # type: ignore
from gemini_class import myGeminiAI

model_name = "gemini-1.5-flash"
my_ai = myGeminiAI(model_name=model_name)

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


@app.route("/api/explain", methods=["POST"])
def initApi():
    subject = request.json.get("subjectToLearnAbout")
    timeToExplain = request.json.get("timeToExplain")
    reformulatedQuestion = (
        "explain me about "
        + subject
        + " as if you were speaking for "
        + str(timeToExplain)
        + " minutes"
    )
    response = my_ai.generate_response(input_text=reformulatedQuestion)
    dataToJson = {"responseText": response.text}
    responseJson = jsonify(dataToJson)
    return responseJson

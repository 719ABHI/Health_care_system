from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)
CORS(app)

# DANGER: HARDCODING API KEY. This is INSECURE for production.
# This key will be exposed if this code is shared or deployed publicly.
# For production, always use environment variables or a secrets management service.
GEMINI_API_KEY = "AIzaSyBPHJvSHs2IemHiqtIqvQz7HJs4Bt-LOzs"

# Ensure the API key is actually set for the genai library.
# The genai library by default looks for GOOGLE_API_KEY environment variable.
# Since you're hardcoding it into a variable named GEMINI_API_KEY,
# we explicitly pass it to genai.configure.
if not GEMINI_API_KEY:
    logging.error("GEMINI_API_KEY is not set. Please provide your API key.")
    # In a production application, you would exit or raise an error here.
    # For demonstration, we'll continue, but API calls will fail.

genai.configure(api_key=GEMINI_API_KEY)

model_name = 'models/gemini-1.5-pro'
model = genai.GenerativeModel(model_name)

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_message = request.json.get('message', '').strip()

    if not user_message:
        logging.warning("Received empty user message.")
        return jsonify({"reply": "Please enter a valid message."}), 400

    system_prompt = (
        "You are a helpful and knowledgeable healthcare assistant. "
        "Only respond to questions that are health or medical-related. "
        "If the input is not medical, respond with: "
        "'I'm sorry, I can only assist with medical-related concerns.'"
    )

    try:
        response = model.generate_content([system_prompt, user_message])
        reply = response.text.strip()
        logging.info(f"User message: '{user_message}' | Bot reply: '{reply}'")
        return jsonify({"reply": reply}), 200
    except Exception as e:
        # Log the full traceback for debugging purposes
        logging.error(f"Error processing chatbot request: {e}", exc_info=True)
        reply = "There was an issue processing your request. Please try again later."
        return jsonify({"reply": reply}), 500

if __name__ == '__main__':
    # When running locally, if you prefer using a .env file (safer than hardcoding)
    # you would typically do this:
    # from dotenv import load_dotenv
    # load_dotenv() # Make sure to pip install python-dotenv

    # To run this code, you will need to have your API key hardcoded as above,
    # or uncomment the dotenv lines and set GOOGLE_API_KEY in a .env file.
    app.run(debug=True, port=5004)
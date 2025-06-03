# from dotenv import load_dotenv
# import streamlit as st
# import os
# import google.generativeai as genai
#
# load_dotenv()
#
# genai.configure(api_key="AIzaSyB_7jw3MhCEvJFLGkmQlbxJexXSMBFfn9Q")
#
# model = genai.GenerativeModel("gemini-1.5-flash")
#
# def is_medical_question(question):
#     prompt = f"""Decide if the following question is related to the medical field.
#     If it is medical-related, respond only with "Yes". If not, respond only with "No".
#     Question: "{question}" """
#
#     response = model.generate_content(prompt)
#     result = response.text.strip().lower()
#     return result == "yes"
#
# def get_gemini_response(question):
#     response = model.generate_content(question)
#     parts = response.candidates[0].content.parts
#     text = ' '.join(part.text for part in parts)
#     return text
#
# st.set_page_config(page_title="Medical Q&A Demo")
# st.header("Medical Q&A Application")
# user_question = st.text_input("Ask your medical question here:", key="input")
# submit = st.button("Submit")
#
# if submit:
#     if is_medical_question(user_question):
#         response = get_gemini_response(user_question)
#     else:
#         response = "This application is developed to handle only medical related questions."
#
#     st.subheader("The Response is")
#     st.write(response)


from dotenv import load_dotenv
import streamlit as st
import os
import google.generativeai as genai
from fastapi import FastAPI, Request
import uvicorn
import threading

load_dotenv()

genai.configure(api_key="AIzaSyB_7jw3MhCEvJFLGkmQlbxJexXSMBFfn9Q")
model = genai.GenerativeModel("gemini-1.5-flash")

app = FastAPI()


def is_medical_question(question):
    prompt = f"""Decide if the following question is related to the medical field. 
    If it is medical-related, respond only with "Yes". If not, respond only with "No".
    Question: "{question}" """

    response = model.generate_content(prompt)
    result = response.text.strip().lower()
    return result == "yes"


def get_gemini_response(question):
    response = model.generate_content(question)
    parts = response.candidates[0].content.parts
    text = ' '.join(part.text for part in parts)
    return text


@app.post("/gemini_api")
async def gemini_api(request: Request):
    data = await request.json()
    input_text = data.get("input_text", "")

    if is_medical_question(input_text):
        gemini_response = get_gemini_response(input_text)
    else:
        gemini_response = "This application is developed to handle only medical related questions."

    return {"response": gemini_response}


def run_streamlit():
    st.set_page_config(page_title="Medical Q&A Demo")
    st.header("Medical Q&A Application")
    user_question = st.text_input("Ask your medical question here:", key="input")
    submit = st.button("Submit")

    if submit:
        if is_medical_question(user_question):
            response = get_gemini_response(user_question)
        else:
            response = "This application is developed to handle only medical related questions."

        st.subheader("The Response is")
        st.write(response)


def run_fastapi():
    uvicorn.run(app, host="0.0.0.0", port=8001)


if __name__ == "__main__":
    threading.Thread(target=run_fastapi).start()
    run_streamlit()

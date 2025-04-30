from flask import Flask, request, jsonify,send_file, render_template, redirect
import sqlite3
from flask_cors import CORS, cross_origin
import os
from openai import OpenAI
import subprocess
from dotenv import load_dotenv

load_dotenv()


history_data = []

LLM_API_KEY = os.getenv("LLM_API_KEY").strip()
client = OpenAI(api_key=LLM_API_KEY)

structure = "Read the given text carefully and extract the main goal and key supporting points. Present your analysis in a structured format but do not use *.\n\n# Steps\n\n1. Comprehend the Text: Read through the text thoroughly to understand its main idea.\n2. Identify Key Components:\n   - Title: Determine a suitable title for the text.\n   - Audience: Identify who the intended audience is.\n   - Problem: Extract the main problem or issue discussed.\n   - Key Points: List out the key supporting points mentioned in the text.\n   - Solutions: Identify any solutions or recommendations provided.\n   - Goal: Determine the ultimate goal of the text.\n\n# Output Format\n\n- Note Title: [A concise title summarizing the text]\n- Audience: [The intended audience for the text]\n- Problem: [The main problem or issue discussed]\n- KeyPoints: [A list of key supporting points from the text]\n- Solutions: [Identified solutions or recommendations]\n- Goal: [The ultimate goal of the text]"

app = Flask(__name__, 
            template_folder='./frontend/myapp/dist',
            static_folder='./frontend/myapp/dist/assets')

CORS(app)

# Route for sending summarized text
@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    summary = data.get('text', '')

    response = client.responses.create(
        model="gpt-4.1-nano",
        input=[{"role": "system","content":[{"type": "input_text","text": structure}]},{"role": "user","content": [{"type": "input_text","text": summary}]}],
        text={"format": {"type": "text"}} 
    )

    extracted_text = response.output[0].content[0].text
    # print(response)
    lines = extracted_text.strip().split('\n')

    newText = []
    note_title = None
    for line in lines:
        if line.startswith("- Note Title:"):
            note_title = line.split("- Note Title:", 1)[1].strip()
        else:

            newText.append(line)

    result = "\n".join(newText)


    history_data.append({"prompt": note_title, "summary":result})
    return jsonify({"prompt": note_title, "summary": result})

@app.route('/navigate_to_history', methods=['POST'])
def navigate_to_history():
    return jsonify({'redirect_url': '/history'})

@app.route('/retrieve_chat_history', methods=['GET'])
def retrieve_chat_history():
    return jsonify({'history': history_data})

# main route
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port=8000)

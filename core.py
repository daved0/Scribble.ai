from flask import Flask, request, jsonify,send_file, render_template
import sqlite3
from flask_cors import CORS, cross_origin
import os
from openai import OpenAI

history_data = []

key = "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"
client = OpenAI(api_key=key)

app = Flask(__name__, 
            template_folder='./frontend/myapp/dist',
            static_folder='./frontend/myapp/dist/assets')

CORS(app)

# Route for sending summarized text
@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    prompt = data.get('text', '')

    res1 = client.chat.completions.create(
        model= "gpt-4",
        messages = [
            {"role": "user","content": "Make a short phrase title about this text: " + prompt},
        ]
    )
    summary = data.get('text', '')    

    summary = "Please read the following text and extract the main goal and key supporting points. Present your answer in the following format: Audience:, Problem:, KeyPoints:, Solutions:, Goal:  " + summary
    res2 = client.chat.completions.create(
        model= "gpt-4",
        messages = [
            {"role": "user","content": summary},
        ]
    )
    history_data.append({"prompt": prompt, "summary":summary})
    # return jsonify({"prompt": prompt, "summary": summary})
    return jsonify({"prompt": res1.choices[0].message.content, "summary": res2.choices[0].message.content})
@app.route('/history')
def history():
    return render_template('history.html', history=history_data)

# main route
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port=8000)

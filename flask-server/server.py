from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from flask import redirect

import json
df = pd.read_excel('./data.xlsx')

app = Flask(__name__)
CORS(app)

from response import gemini_preprocess as genai

# @app.route('/', methods=['GET'])
# def root():
#     redirect('/get-question')


@app.route('/get-question', methods=['POST'])
def get_question():
    question = request.get_json()['prompt']
    answer = genai(question).candidates[0].content.parts[0].text
    ans = df[df['Category'] == answer]

    arr = []

    for i in range(len(ans)):
        arr.append(ans.iloc[i].to_dict())
        
    print(arr)
                
    return jsonify({"answer": arr})


if __name__ == 'main':
    app.run(debug=True)

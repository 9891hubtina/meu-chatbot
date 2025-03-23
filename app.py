from flask import Flask, render_template, request, jsonify # type: ignore
import subprocess

app = Flask(__name__, static_folder='public', template_folder='public')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message", "")

    # Chamar o chatbot Python (substitua com sua lógica de IA)
    response = subprocess.run(
        ["python", "src/chatbot.py", user_message],
        capture_output=True,
        text=True
    )

    bot_reply = response.stdout.strip()
    return jsonify({"response": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)

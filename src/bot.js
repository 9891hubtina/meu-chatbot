// # Servidor Node.js com Express
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const PORT = 3000;

// Configuração do Express
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Servir arquivos HTML, CSS, JS

// Rota para processar mensagens do chatbot
app.post('/chat', (req, res) => {
    const userMessage = req.body.message;

    const python = spawn('python', ['src/python/chatbot.py', userMessage]);

    python.stdout.on('data', (data) => {
        res.json({ response: data.toString() });
    });

    python.stderr.on('data', (data) => {
        console.error(`Erro no Python: ${data}`);
        res.status(500).json({ error: 'Erro no chatbot' });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// # Código JavaScript do frontend
async function sendMessage() {
    const userInput = document.getElementById("userInput");
    const message = userInput.value.trim();
    const messagesDiv = document.getElementById("messages");

    if (message === "") return;

    // Adiciona a mensagem do usuário na tela
    messagesDiv.innerHTML += `<p><strong>Você:</strong> ${message}</p>`;
    userInput.value = "";

    // Envia a mensagem para o backend Flask
    try {
        const response = await fetch('/chat', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        messagesDiv.innerHTML += `<p><strong>Chatbot:</strong> ${data.response}</p>`;
    } catch (error) {
        console.error("Erro:", error);
    }
}

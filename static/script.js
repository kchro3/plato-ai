document.addEventListener("DOMContentLoaded", () => {
  // Connect to the WebSocket server
  const socket = new WebSocket('ws://' + window.location.host + '/ws');

  // When the socket is open, enable the input field
  socket.onopen = () => {
    document.getElementById("user-input").disabled = false;
  };

  // When the socket receives a message, display it in the chat
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const message = data.message.text;
    const chatContainer = document.getElementById("chat-container");
    const newMessage = document.createElement("div");
    newMessage.classList.add("bot-container");
    newMessage.innerHTML = `<div class="bot-message">${message}</div>`;
    chatContainer.appendChild(newMessage);
  };

  // When the user submits a message, send it to the server and display it in the chat
  document.getElementById("user-input-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const userInput = document.getElementById("user-input");
    const userMessage = userInput.value;
    const chatContainer = document.getElementById("chat-container");
    const newMessage = document.createElement("div");
    newMessage.classList.add("user-container");
    newMessage.innerHTML = `<div class="user-message">${userMessage}</div>`;
    chatContainer.appendChild(newMessage);
    userInput.value = "";
    socket.send(JSON.stringify({"message": {"text": userMessage}}));
  });
});

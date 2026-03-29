// const API_URL = "http://localhost:3000/chat";
const API_URL = "https://agentic-ai-2phr.onrender.com/chat";

async function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();

  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      sessionId: "frontend-session"
    })
  });

  const data = await response.json();

  renderResponse(data);
}

function addMessage(text, type) {
  const container = document.getElementById("chat-container");

  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerText = text;

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;


}

function renderResponse(data) {
  const container = document.getElementById("chat-container");

  const div = document.createElement("div");
  div.className = "message ai";

  if (data.type === "weather") {
    div.innerHTML = `
      <div class="weather-card">
        <strong>Weather in ${data.city}</strong><br/>
        🌡 Temperature: ${data.temperature}°C<br/>
        ☁ Condition: ${data.description}
      </div>
    `;
  } else if (data.type === "chat") {
    div.innerHTML = data.message; // HTML rendering
  } else {
    div.innerText = "Unknown response format";
  }

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;

  speak(div.innerText)
}

function startListening() {
  stopSpeaking();
  const recognition = new SpeechRecognition();
  recognition.continuous = false;

  recognition.lang = "en-IN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start()

  recognition.onresult = (event) => {

    const transcript = event.results[0][0].transcript
    document.getElementById('messageInput').value = transcript
    sendMessage()
  }
}


let currentUtterance;

function speak(text) {
  stopSpeaking();

  currentUtterance = new SpeechSynthesisUtterance(text);

  currentUtterance.lang = "en-IN";
  currentUtterance.rate = 1;
  currentUtterance.pitch = 1;

  speechSynthesis.speak(currentUtterance);
}

function stopSpeaking() {
  speechSynthesis.cancel();
}

function pauseSpeaking() {
  speechSynthesis.pause();
}

function resumeSpeaking() {
  speechSynthesis.resume();
}

const gameLog = document.getElementById("game-log");
const input = document.getElementById("player-input");

let story = [
  { role: "system", content: "You are a dungeon master for a dark fantasy RPG." }
];

function addToLog(text) {
  gameLog.innerHTML += `<p>${text}</p>`;
  gameLog.scrollTop = gameLog.scrollHeight;
}

async function sendAction() {
  const playerText = input.value;
  if (!playerText) return;

  addToLog(`<strong>You:</strong> ${playerText}`);
  story.push({ role: "user", content: playerText });
  input.value = "";

  const thinkingId = Date.now();
  addToLog(`<em id="thinking-${thinkingId}">AI is thinking...</em>`);

  try {
    const response = await fetch("https://YOUR-WORKER-URL.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: story })
    });

    const data = await response.json();

    document.getElementById(`thinking-${thinkingId}`)?.remove();

    if (!data.reply) {
      throw new Error(data.error || "No reply returned");
    }

    story.push({ role: "assistant", content: data.reply });
    addToLog(`<strong>DM:</strong> ${data.reply}`);

  } catch (err) {
    document.getElementById(`thinking-${thinkingId}`)?.remove();
    addToLog(`<span style="color:red;">Error: ${err.message}</span>`);
    console.error(err);
  }

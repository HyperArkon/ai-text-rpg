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

  addToLog("<em>AI is thinking...</em>");

  // AI CALL GOES HERE (next step)
}

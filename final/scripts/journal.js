
import { getJournal, saveJournal } from "./storage.js";

const form = document.querySelector("#journal-form");
const list = document.querySelector("#journal-list");
const empty = document.querySelector("#journal-empty");

function renderEntries() {
  const entries = getJournal();
  empty.hidden = entries.length !== 0;

  list.innerHTML = entries.map((entry) => `
    <article class="journal-entry">
      <h2>${entry.symbol} · ${entry.direction}</h2>
      <p><strong>Entry:</strong> ${entry.entry} &nbsp; <strong>Stop:</strong> ${entry.stop} &nbsp; <strong>Target:</strong> ${entry.target}</p>
      <p><strong>Result:</strong> ${entry.result}</p>
      <p>${entry.notes}</p>
      <small>${entry.created}</small>
    </article>
  `).join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const entries = getJournal();

  entries.unshift({
    symbol: data.get("symbol"),
    direction: data.get("direction"),
    entry: data.get("entry"),
    stop: data.get("stop"),
    target: data.get("target"),
    result: data.get("result"),
    notes: data.get("notes"),
    created: new Date().toLocaleString()
  });

  saveJournal(entries.slice(0, 20));
  form.reset();
  renderEntries();
});

renderEntries();

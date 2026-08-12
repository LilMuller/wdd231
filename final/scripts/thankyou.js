
const params = new URLSearchParams(window.location.search);
const requiredFields = [
  ["First name", "firstName"],
  ["Last name", "lastName"],
  ["Email", "email"],
  ["Experience", "experience"],
  ["Favorite market", "market"],
  ["Message", "message"]
];

const output = document.querySelector("#submission-details");

output.innerHTML = requiredFields.map(([label, key]) => `
  <div class="info-card" style="padding:1rem">
    <strong>${label}</strong>
    <p>${params.get(key) || "Not provided"}</p>
  </div>
`).join("");

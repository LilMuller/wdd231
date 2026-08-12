const membersContainer = document.querySelector("#members");

async function loadMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members.");
        }

        const members = await response.json();

        displayMembers(members);
    } catch (error) {
        membersContainer.innerHTML =
            "<p>Sorry, member information could not be loaded.</p>";

        console.error(error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <div>
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p>${member.description}</p>
                <a href="${member.website}" target="_blank">
                    Visit Website
                </a>
            </div>
        `;

        membersContainer.appendChild(card);
    });
}

document.querySelector("#grid-view").addEventListener("click", () => {
    membersContainer.classList.remove("list");
    membersContainer.classList.add("grid");
});

document.querySelector("#list-view").addEventListener("click", () => {
    membersContainer.classList.remove("grid");
    membersContainer.classList.add("list");
});

loadMembers();
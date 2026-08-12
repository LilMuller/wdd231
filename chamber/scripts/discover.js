import { discoverItems } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");


// ========================================
// CREATE DISCOVER CARDS
// ========================================

function displayDiscoverItems(items) {

    discoverGrid.innerHTML = "";

    items.forEach((item, index) => {

        const card = document.createElement("article");

        card.classList.add(
            "discover-card",
            `area-${index + 1}`
        );

        card.innerHTML = `
            <h2>${item.name}</h2>

            <figure>
                <img
                    src="images/${item.image}"
                    alt="${item.name}"
                    loading="lazy"
                    width="300"
                    height="200"
                >
            </figure>

            <address>${item.address}</address>

            <p>${item.description}</p>

            <button type="button">
                Learn More
            </button>
        `;

        discoverGrid.appendChild(card);
    });
}

displayDiscoverItems(discoverItems);


// ========================================
// LAST VISIT
// ========================================

const currentVisit = Date.now();

const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {

    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const difference =
        currentVisit - Number(lastVisit);

    const oneDay =
        24 * 60 * 60 * 1000;

    if (difference < oneDay) {

        visitMessage.textContent =
            "Back so soon! Awesome!";

    } else {

        const days =
            Math.floor(difference / oneDay);

        const dayWord =
            days === 1 ? "day" : "days";

        visitMessage.textContent =
            `You last visited ${days} ${dayWord} ago.`;
    }
}

localStorage.setItem(
    "lastVisit",
    currentVisit
);
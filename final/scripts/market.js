
import { getFavorites, toggleFavorite } from "./storage.js";

const grid = document.querySelector("#market-grid");
const searchInput = document.querySelector("#market-search");
const categorySelect = document.querySelector("#category-filter");
const status = document.querySelector("#market-status");
const dialog = document.querySelector("#market-dialog");
const dialogContent = document.querySelector("#dialog-content");
const closeDialog = document.querySelector("#close-dialog");

let markets = [];

async function loadMarkets() {
  try {
    const response = await fetch("data/instruments.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    markets = await response.json();

    const categories = [...new Set(markets.map((market) => market.category))].sort();
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categorySelect.append(option);
    });

    displayMarkets(markets);
  } catch (error) {
    console.error("Market data error:", error);
    status.textContent = "We couldn't load the market data. Please refresh and try again.";
  }
}

function displayMarkets(items) {
  grid.innerHTML = "";
  status.textContent = `${items.length} market${items.length === 1 ? "" : "s"} shown`;

  if (!items.length) {
    grid.innerHTML = `<div class="empty">No markets match your search.</div>`;
    return;
  }

  const favorites = getFavorites();

  items.forEach((market, index) => {
    const card = document.createElement("article");
    card.className = "market-card";
    card.innerHTML = `
      <img src="images/market-${markets.indexOf(market) + 1}.webp"
           alt="${market.symbol} market illustration"
           width="600" height="340" loading="lazy">
      <div class="market-body">
        <div class="market-symbol">${market.symbol}</div>
        <h2>${market.name}</h2>
        <div class="market-meta">
          <span class="badge">${market.category}</span>
          <span class="badge">${market.session}</span>
          <span class="badge">${market.volatility} volatility</span>
        </div>
        <p>${market.description}</p>
        <div class="market-actions">
          <button class="button" type="button" data-details="${market.symbol}">Details</button>
          <button class="icon-button" type="button"
                  data-favorite="${market.symbol}"
                  aria-pressed="${favorites.includes(market.symbol)}"
                  aria-label="Save ${market.symbol} to favorites">
            ${favorites.includes(market.symbol) ? "★ Saved" : "☆ Save"}
          </button>
        </div>
      </div>
    `;
    grid.append(card);
  });
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  const filtered = markets.filter((market) => {
    const matchesSearch = `${market.symbol} ${market.name} ${market.description}`
      .toLowerCase()
      .includes(query);
    const matchesCategory = category === "all" || market.category === category;
    return matchesSearch && matchesCategory;
  });

  displayMarkets(filtered);
}

grid.addEventListener("click", (event) => {
  const detailsButton = event.target.closest("[data-details]");
  const favoriteButton = event.target.closest("[data-favorite]");

  if (detailsButton) {
    const market = markets.find((item) => item.symbol === detailsButton.dataset.details);
    if (!market) return;

    dialogContent.innerHTML = `
      <p class="eyebrow">${market.category}</p>
      <h2>${market.symbol} — ${market.name}</h2>
      <p>${market.description}</p>
      <p><strong>Trading session:</strong> ${market.session}</p>
      <p><strong>Typical volatility:</strong> ${market.volatility}</p>
      <p class="disclaimer">Educational information only. Market conditions change and this page is not financial advice.</p>
    `;
    dialog.showModal();
  }

  if (favoriteButton) {
    const favorites = toggleFavorite(favoriteButton.dataset.favorite);
    favoriteButton.setAttribute("aria-pressed", String(favorites.includes(favoriteButton.dataset.favorite)));
    favoriteButton.textContent = favorites.includes(favoriteButton.dataset.favorite) ? "★ Saved" : "☆ Save";
  }
});

closeDialog?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);

loadMarkets();

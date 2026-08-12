
async function loadFeaturedMarkets() {
  const container = document.querySelector("#featured-markets");
  const status = document.querySelector("#featured-status");

  try {
    const response = await fetch("data/instruments.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const markets = await response.json();
    const featured = markets.filter((market) =>
      ["Major", "Commodity", "Index"].includes(market.category)
    ).slice(0, 3);

    container.innerHTML = featured.map((market) => `
      <article class="feature-card">
        <strong>${market.symbol}</strong>
        <h2>${market.name}</h2>
        <p>${market.description}</p>
        <span class="badge">${market.category}</span>
      </article>
    `).join("");

    status.textContent = `${featured.length} featured markets loaded from the data source.`;
  } catch (error) {
    console.error("Featured market error:", error);
    status.textContent = "Featured market data is temporarily unavailable.";
  }
}

loadFeaturedMarkets();

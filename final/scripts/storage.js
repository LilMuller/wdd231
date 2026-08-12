
const FAVORITES_KEY = "forexedge-favorites";
const JOURNAL_KEY = "forexedge-journal";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(symbol) {
  const favorites = getFavorites();
  const index = favorites.indexOf(symbol);
  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(symbol);
  }
  saveFavorites(favorites);
  return favorites;
}

export function getJournal() {
  return JSON.parse(localStorage.getItem(JOURNAL_KEY) || "[]");
}

export function saveJournal(entries) {
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
}

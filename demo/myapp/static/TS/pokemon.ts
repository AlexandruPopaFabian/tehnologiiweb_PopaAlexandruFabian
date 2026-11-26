// API Card
// API Name:        PokeAPI
// Base URL:        https://pokeapi.co/api/v2
// Endpoint used:   /pokemon/{name_or_id}
// HTTP method:     GET
// Status code seen: 200
// Fields used:     id, name, height, weight, sprites.front_default, types

interface PokemonTypeSlot {
    slot: number;
    type: {
        name: string;
    };
}

interface PokemonSprites {
    front_default: string | null;
}

interface PokemonData {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: PokemonSprites;
    types: PokemonTypeSlot[];
}

const statusEl = document.getElementById("status") as HTMLParagraphElement;
const resultsEl = document.getElementById("results") as HTMLDivElement;
const searchForm = document.getElementById("searchForm") as HTMLFormElement;
const queryInput = document.getElementById("queryInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;

async function getJSON<T>(url: string): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return (await response.json()) as T;
    } finally {
        clearTimeout(timer);
    }
}

function setStatus(text: string): void {
    statusEl.textContent = text;
}

function createCard(pokemon: PokemonData): HTMLElement {
    const card = document.createElement("div");
    card.className = "card";

    if (pokemon.sprites.front_default) {
        const img = document.createElement("img");
        img.src = pokemon.sprites.front_default;
        img.alt = pokemon.name;
        card.appendChild(img);
    }

    const title = document.createElement("h3");
    title.textContent = `#${pokemon.id} ${pokemon.name.toUpperCase()}`;

    const typesText = pokemon.types.map((t) => t.type.name).join(", ");
    const typeDetail = document.createElement("p");
    typeDetail.textContent = `Type: ${typesText}`;

    const statsDetail = document.createElement("p");
    statsDetail.textContent = `Height: ${pokemon.height / 10} m | Weight: ${pokemon.weight / 10} kg`;

    card.appendChild(title);
    card.appendChild(typeDetail);
    card.appendChild(statsDetail);

    return card;
}

function render(items: PokemonData[]): void {
    resultsEl.innerHTML = "";
    if (items.length === 0) {
        setStatus("No results found.");
        return;
    }
    items.forEach((item) => resultsEl.appendChild(createCard(item)));
    setStatus(`Loaded ${items.length} result(s).`);
}

function buildURL(query: string): string {
    const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
    return `${BASE_URL}/${encodeURIComponent(query.toLowerCase())}`;
}

async function search(): Promise<void> {
    const query = queryInput.value.trim();
    if (!query) {
        setStatus("Please enter a search term.");
        return;
    }

    searchBtn.disabled = true;
    setStatus("Loading...");
    resultsEl.innerHTML = "";

    try {
        const data = await getJSON<PokemonData>(buildURL(query));
        render([data]);
        localStorage.setItem("lastPokemonQuery", query);
    } catch (err: unknown) {
        if (err instanceof Error && err.message === "HTTP 404") {
            render([]);
        } else {
            const msg = err instanceof Error ? err.message : "Unknown error";
            setStatus(`Load failed: ${msg}`);
        }
    } finally {
        searchBtn.disabled = false;
    }
}

searchForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    search();
});

window.addEventListener("DOMContentLoaded", () => {
    const lastQuery = localStorage.getItem("lastPokemonQuery");
    if (lastQuery) {
        queryInput.value = lastQuery;
        search(); 
    }
});
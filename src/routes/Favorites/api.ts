const BASE_URL = import.meta.env?.VITE_API_BASE_URL;
const API_KEY = import.meta.env?.VITE_API_KEY;

function buildHeaders(json = true) {
  const headers: Record<string, string> = {};
  if (json) headers["Content-Type"] = "application/json";
  if (API_KEY) headers["x-api-key"] = API_KEY;
  return headers;
}

export async function fetchFavorites() {
  const res = await fetch(`${BASE_URL}/favourites?order=DESC`, {
    headers: buildHeaders(false),
  });
  if (!res.ok) throw new Error("Failed to fetch favorites");
  return res.json();
}

export async function addFavorite(image_id: string) {
  const res = await fetch(`${BASE_URL}/favourites`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ image_id }),
  });
  if (!res.ok) {
    throw new Error("Failed to add favorite");
  }
  return res.json();
}

export async function deleteFavorite(favorite_id: string | number) {
  const res = await fetch(
    `${BASE_URL}/favourites/${encodeURIComponent(String(favorite_id))}`,
    {
      method: "DELETE",
      headers: buildHeaders(false),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to delete favorite");
  }
  return { ok: true };
}

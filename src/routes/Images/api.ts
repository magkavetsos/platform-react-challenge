export type CatImage = {
  id: string;
  url: string;
  width: number;
  height: number;
  favourite?: object;
  breeds?: [];
};

const BASE_URL = import.meta.env?.VITE_API_BASE_URL;

export async function fetchRandomImages(limit: number) {
  const res = await fetch(`${BASE_URL}/images/search?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch images");
  return res.json();
}

export async function fetchImageById(id: string) {
  const res = await fetch(`${BASE_URL}/images/${id}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Image fetch failed: ${res.status} ${text}`);
  }
  return res.json();
}

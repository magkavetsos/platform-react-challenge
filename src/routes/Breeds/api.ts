const BASE_URL = import.meta.env?.VITE_API_BASE_URL;

export async function fetchBreeds() {
  const res = await fetch(`${BASE_URL}/breeds`);
  if (!res.ok) throw new Error("Failed to fetch breeds");
  return res.json();
}

export async function fetchBreedImages(breed_id: string) {
  const res = await fetch(
    `${BASE_URL}/images/search?breed_ids=${breed_id}&limit=10`
  );
  if (!res.ok) throw new Error("Failed to fetch breed images");
  return res.json();
}

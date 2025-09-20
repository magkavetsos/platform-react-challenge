const BASE_URL = import.meta.env?.VITE_API_BASE_URL;

export async function fetchBreeds() {
  const res = await fetch(`${BASE_URL}/breeds`)
  if (!res.ok) throw new Error('Failed to fetch breeds')
  return res.json()
}
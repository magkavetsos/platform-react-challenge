export type CatImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export async function fetchRandomImages(limit: number): Promise<CatImage[]> {
  const BASE_URL =
    import.meta.env?.VITE_API_BASE_URL;

  const res = await fetch(`${BASE_URL}/images/search?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch images");
  return res.json();
}
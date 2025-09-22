import { useQuery } from "@tanstack/react-query";
import { fetchBreeds, fetchBreedImages } from "./api";

export function useBreeds() {
  return useQuery({
    queryKey: ["breeds"],
    queryFn: fetchBreeds,
    staleTime: 1000 * 60 * 60 * 24,
  });
}

export function useBreedImages(breedId: string) {
  return useQuery({
    queryKey: ["breed-images", breedId],
    queryFn: () => fetchBreedImages(breedId),
  });
}

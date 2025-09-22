import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFavorites, addFavorite, deleteFavorite } from "./api";
import type { Favorite } from "../../types";

export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAddFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (image_id: string) => addFavorite(image_id),
    onMutate: async (image_id: string) => {
      await qc.cancelQueries({ queryKey: ["favorites"] });
      const previousFavorites = qc.getQueryData(["favorites"]);
      qc.setQueryData(["favorites"], (old: Favorite[] = []) => [
        ...old,
        { 
          id: Date.now(),
          image_id, 
          created_at: new Date().toISOString() 
        }
      ]);
      return { previousFavorites };
    },
    onError: (err, image_id, context) => {
      qc.setQueryData(["favorites"], context?.previousFavorites);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}

export function useDeleteFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (favorite_id: string) => deleteFavorite(favorite_id),
    onMutate: async (favorite_id: string) => {
      await qc.cancelQueries({ queryKey: ["favorites"] });
      const previousFavorites = qc.getQueryData(["favorites"]);
      qc.setQueryData(["favorites"], (old: Favorite[] = []) => 
        old.filter(fav => String(fav.id) !== favorite_id)
      );
      return { previousFavorites };
    },
    onError: (err, favorite_id, context) => {
      qc.setQueryData(["favorites"], context?.previousFavorites);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
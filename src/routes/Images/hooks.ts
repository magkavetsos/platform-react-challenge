import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchRandomImages } from "./api";
export function useInfiniteRandomImages(limit = 10) {
    return useInfiniteQuery({
        queryKey: ["images", "random", limit],
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0 }) => {
          const items = await fetchRandomImages(limit);
          return { page: pageParam, items };
        },
        getNextPageParam: (last) => last.page + 1,
      });
}
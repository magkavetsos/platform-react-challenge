import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useInfiniteRandomImages } from "./hooks";
import type { CatImage } from "./api";
import ImageModal from "./ImageModal";

const ImagesView = () => {
  const LIMIT = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id");

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteRandomImages(LIMIT);

  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["images", "random", LIMIT] });
    };
  }, [queryClient, LIMIT]);

  const images: CatImage[] = data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <div className="min-h-screen-minus-header">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-slate-800">
            Random Cat Images
          </h1>
          <button
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-800 text-white disabled:opacity-50 cursor-pointer"
            disabled={isFetching || isFetchingNextPage}
            aria-label="Refresh images"
            onClick={() =>
              queryClient.resetQueries({
                queryKey: ["images", "random", LIMIT],
              })
            }
          >
            Refresh
          </button>
        </div>

        {isLoading && <div className="text-slate-600">Loading images...</div>}

        {isError && (
          <div className="text-red-600">
            {error?.message ?? "Failed to load images"}
            <button
              onClick={() => refetch()}
              className="ml-2 underline cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-lg bg-white shadow cursor-pointer"
              onClick={() => setSearchParams({ id: img.id })}
            >
              <img
                src={img.url}
                alt="Cat"
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {!isLoading && images.length === 0 && (
          <div className="text-slate-600 mt-4">No images found.</div>
        )}

        <div className="mt-6">
          <button
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-800 text-white disabled:opacity-50 cursor-pointer"
            disabled={isFetchingNextPage || isFetching}
            aria-label="Load more images"
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        </div>
      </div>

      {selectedId && (
        <ImageModal id={selectedId} onClose={() => setSearchParams({})} />
      )}
    </div>
  );
};

export default ImagesView;

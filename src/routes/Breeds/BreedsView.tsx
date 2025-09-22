import { useMemo, useState } from "react";
import { useBreeds } from "./hooks";
import type { Breed } from "../../types";
import BreedModal from "./BreedModal";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import SearchBar from "./SearchBar";
import BreedCard from "./BreedCard";
import SkeletonCard from "./SkeletonCard";

const BreedsView = () => {
  const { data: breeds, isLoading, isError } = useBreeds();
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id");
  const debounced = useDebounce(query.trim(), 300);

  const filtered = useMemo(() => {
    if (!breeds) return [];
    const q = debounced.toLowerCase();
    return breeds.filter((b: Breed) => {
      return b.name.toLowerCase().includes(q);
    });
  }, [breeds, debounced]);

  if (isLoading)
    return (
      <div className="min-h-screen-minus-header">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-xl font-semibold text-slate-800 mb-6">
            Cats Breeds
          </h1>
          <div className="mb-4">
            <div className="h-10 bg-slate-100 rounded-md w-full max-w-md animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen-minus-header">
        <div className="max-w-7xl mx-auto px-4 py-8 text-red-600">
          Failed to load breeds
        </div>
      </div>
    );

  return (
    <div className="min-h-screen-minus-header">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold text-slate-800 mb-6">
          Cats Breeds
        </h1>

        <div className="mb-4">
          <SearchBar query={query} setQuery={setQuery} />
          {filtered.length === 0 && breeds && breeds.length > 0 && (
            <div className="mt-3 text-sm text-slate-600">
              No results for "{debounced}"
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((b: Breed) => (
            <BreedCard
              key={b.id}
              breed={b}
              onOpen={() => setSearchParams({ id: b.id })}
            />
          ))}
        </div>
        {selectedId && (
          <BreedModal
            breedId={selectedId}
            title={breeds?.find((b: Breed) => b.id === selectedId)?.name}
            onClose={() => setSearchParams({})}
          />
        )}
      </div>
    </div>
  );
};

export default BreedsView;

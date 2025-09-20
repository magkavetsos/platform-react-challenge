import { useState } from "react";
import { useBreeds } from "./hooks";
import type { Breed } from "./hooks";
import BreedModal from "./BreedModal";

function BreedCard({ breed, onOpen }: { breed: Breed; onOpen?: () => void }) {
  const [showMore, setShowMore] = useState(false);
  const description = breed.description ?? "";
  const teaser = description.slice(0, 140);
  const hasMore = description.length > teaser.length;

  const metrics: [string, number | undefined][] = [
    ["Adaptability", breed.adaptability],
    ["Affection", breed.affection_level],
    ["Intelligence", breed.intelligence],
    ["Energy", breed.energy_level],
    ["Child friendly", breed.child_friendly],
    ["Dog friendly", breed.dog_friendly],
  ];

  return (
    <article
      className="breed-card bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition flex flex-col h-full cursor-pointer"
      onClick={onOpen}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{breed.name}</h3>
          <div className="text-sm text-slate-500">
            {breed.origin || "Unknown"}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
            {breed.life_span || "—"} yrs
          </span>
          {typeof breed.weight?.metric === "string" && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
              {breed.weight.metric} kg
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {metrics.map(
          ([label, value]) =>
            value && <Metric key={label} label={label} value={value} />
        )}
      </div>

      <div className="mt-4 text-sm text-slate-700 flex-1">
        {!showMore && (
          <p>
            {teaser}
            {hasMore ? "…" : ""}
          </p>
        )}

        {showMore && description && (
          <p className="text-sm text-slate-700">{description}</p>
        )}

        {hasMore && (
          <button
            type="button"
            onClick={() => setShowMore((s) => !s)}
            className="mt-2 text-xs text-slate-700 hover:underline cursor-pointer font-semibold"
            aria-expanded={showMore}
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex gap-3 text-xs text-slate-500">
          {breed.wikipedia_url && (
            <a
              href={breed.wikipedia_url}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Wikipedia
            </a>
          )}
        </div>

        <div className="text-xs text-slate-400">{breed.temperament}</div>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  const pct = Math.round((value / 5) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span>{label}</span>
        <span className="font-medium">{value}/5</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded mt-1 overflow-hidden">
        <div className="h-full bg-slate-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

const BreedsView = () => {
  const { data: breeds, isLoading, isError } = useBreeds();
  const [selected, setSelected] = useState<Breed | null>(null);

  return (
    <div className="min-h-screen-minus-header">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold text-slate-800 mb-6">
          Cat Breeds
        </h1>

        {isLoading && <div>Loading breeds...</div>}
        {isError && <div className="text-red-600">Failed to load breeds</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {breeds?.map((b: Breed) => (
            <BreedCard key={b.id} breed={b} onOpen={() => setSelected(b)} />
          ))}
        </div>
        {selected && (
          <BreedModal
            breedId={selected.id}
            title={selected.name}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </div>
  );
};

export default BreedsView;

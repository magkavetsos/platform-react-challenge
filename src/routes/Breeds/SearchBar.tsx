import { X } from "lucide-react";

const SearchBar = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (q: string) => void;
}) => {
  return (
    <div className="relative max-w-md">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search breeds..."
        className="w-full px-3 py-2 border rounded-lg text-sm"
        aria-label="Search breeds"
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
          }}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

import { useSearchStore } from "@/store/search";
import { format } from "date-fns";
import { Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const { results, history, isLoading, query, setQuery, setFilters } = useSearchStore();

  const handleHistoryClick = (item: typeof history[0]) => {
    setQuery(item.query);
    setFilters(item.filters);
  };

  if (isLoading) {
    return (
      <div className="mt-8 text-center text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2">Searching...</p>
      </div>
    );
  }

  if (!query && history.length > 0) {
    return (
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Searches</h3>
        <div className="space-y-2">
          {history.map((item, index) => (
            <button
              key={index}
              onClick={() => handleHistoryClick(item)}
              className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center gap-3 group"
            >
              <Clock className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.query}
                </p>
                <p className="text-xs text-gray-500">
                  {format(item.timestamp, 'MMM d, yyyy h:mm a')}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (query && results.length === 0) {
    return (
      <div className="mt-8 text-center">
        <Search className="h-12 w-12 text-gray-400 mx-auto" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
        <p className="mt-1 text-gray-500">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="space-y-4">
        {results.map((result) => (
          <Link
            key={result.id}
            to={`/case/${result.id}`}
            className="block p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-colors"
          >
            <h3 className="text-lg font-medium text-gray-900">{result.title}</h3>
            <p className="mt-1 text-gray-500">{result.summary}</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <span>{format(new Date(result.date), 'MMM d, yyyy')}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults; 
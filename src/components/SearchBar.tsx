import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store/search";
import { Search, Filter, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const SearchBar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    query,
    filters,
    setQuery,
    setFilters,
    clearFilters,
    search,
    isLoading,
  } = useSearchStore();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        search();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search();
  };

  const handleDateSelect = (date: Date | undefined, type: 'start' | 'end') => {
    setFilters({
      dateRange: {
        ...filters.dateRange,
        [type]: date ? format(date, 'yyyy-MM-dd') : null,
      },
    });
  };

  const hasActiveFilters = 
    filters.dateRange.start ||
    filters.dateRange.end ||
    filters.categories.length > 0 ||
    filters.jurisdictions.length > 0;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search cases..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant={hasActiveFilters ? "default" : "outline"}
              className={cn(
                "gap-2",
                hasActiveFilters && "bg-blue-600 hover:bg-blue-700"
              )}
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                  Active
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[600px] p-4" align="end" sideOffset={5}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filters</h4>
                {hasActiveFilters && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-8 px-2 text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-500">Start Date</Label>
                    <div className="border rounded-md p-2">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange.start ? new Date(filters.dateRange.start) : undefined}
                        onSelect={(date) => handleDateSelect(date, 'start')}
                        className="rounded-md"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-500">End Date</Label>
                    <div className="border rounded-md p-2">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange.end ? new Date(filters.dateRange.end) : undefined}
                        onSelect={(date) => handleDateSelect(date, 'end')}
                        className="rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* TODO: Add category and jurisdiction filters when we have the data */}
            </div>
          </PopoverContent>
        </Popover>
      </form>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="mt-2 flex flex-wrap gap-2">
          {filters.dateRange.start && (
            <div className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              From: {format(new Date(filters.dateRange.start), 'MMM d, yyyy')}
              <button
                onClick={() => handleDateSelect(undefined, 'start')}
                className="ml-1 rounded-full p-1 hover:bg-blue-200"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.dateRange.end && (
            <div className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              To: {format(new Date(filters.dateRange.end), 'MMM d, yyyy')}
              <button
                onClick={() => handleDateSelect(undefined, 'end')}
                className="ml-1 rounded-full p-1 hover:bg-blue-200"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 
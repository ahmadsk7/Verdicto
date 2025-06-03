import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchStore } from "@/store/search";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Civil",
  "Criminal",
  "Constitutional",
  "Contract",
  "Family",
  "Property",
  "Tax",
  "Employment",
];

const JURISDICTIONS = [
  "Federal",
  "State",
  "Supreme Court",
  "Appellate",
  "District",
  "County",
];

const COURTS = [
  "Supreme Court",
  "Court of Appeals",
  "District Court",
  "Circuit Court",
  "Family Court",
  "Tax Court",
];

const JUDGES = [
  "John Roberts",
  "Clarence Thomas",
  "Samuel Alito",
  "Sonia Sotomayor",
  "Elena Kagan",
  "Neil Gorsuch",
  "Brett Kavanaugh",
  "Amy Coney Barrett",
  "Ketanji Brown Jackson",
];

const SearchBar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { query, filters, setQuery, setFilters, clearFilters, search } = useSearchStore();

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        search();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, filters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search();
  };

  const handleDateSelect = (date: Date | undefined, type: 'from' | 'to') => {
    setFilters({
      dateRange: {
        ...filters.dateRange,
        [type]: date || null,
      },
    });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    setFilters({ categories: newCategories });
  };

  const handleJurisdictionToggle = (jurisdiction: string) => {
    const newJurisdictions = filters.jurisdictions.includes(jurisdiction)
      ? filters.jurisdictions.filter((j) => j !== jurisdiction)
      : [...filters.jurisdictions, jurisdiction];
    setFilters({ jurisdictions: newJurisdictions });
  };

  const handleCourtToggle = (court: string) => {
    const newCourts = filters.courts.includes(court)
      ? filters.courts.filter((c) => c !== court)
      : [...filters.courts, court];
    setFilters({ courts: newCourts });
  };

  const handleJudgeToggle = (judge: string) => {
    const newJudges = filters.judges.includes(judge)
      ? filters.judges.filter((j) => j !== judge)
      : [...filters.judges, judge];
    setFilters({ judges: newJudges });
  };

  const handleStatusChange = (status: 'all' | 'pending' | 'decided') => {
    setFilters({ status });
  };

  const handleAnalysisChange = (hasAnalysis: boolean | null) => {
    setFilters({ hasAnalysis });
  };

  const hasActiveFilters = Object.values(filters).some((value) => {
    if (value === null) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') {
      return Object.values(value).some((v) => v !== null);
    }
    return value !== 'all';
  });

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search cases..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant={hasActiveFilters ? "default" : "outline"}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1">
                  {Object.values(filters).reduce((count, value) => {
                    if (Array.isArray(value)) return count + value.length;
                    if (typeof value === 'object' && value !== null) {
                      return count + Object.values(value).filter(v => v !== null).length;
                    }
                    return count + (value !== 'all' && value !== null ? 1 : 0);
                  }, 0)}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[600px] p-4" align="end">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date Range (From)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !filters.dateRange.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateRange.from ? (
                          format(filters.dateRange.from, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange.from || undefined}
                        onSelect={(date) => handleDateSelect(date, 'from')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Date Range (To)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !filters.dateRange.to && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateRange.to ? (
                          format(filters.dateRange.to, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange.to || undefined}
                        onSelect={(date) => handleDateSelect(date, 'to')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Categories</Label>
                <ScrollArea className="h-[100px] rounded-md border p-2">
                  <div className="space-y-2">
                    {CATEGORIES.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={filters.categories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                        />
                        <Label htmlFor={category}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="space-y-2">
                <Label>Jurisdictions</Label>
                <ScrollArea className="h-[100px] rounded-md border p-2">
                  <div className="space-y-2">
                    {JURISDICTIONS.map((jurisdiction) => (
                      <div key={jurisdiction} className="flex items-center space-x-2">
                        <Checkbox
                          id={jurisdiction}
                          checked={filters.jurisdictions.includes(jurisdiction)}
                          onCheckedChange={() => handleJurisdictionToggle(jurisdiction)}
                        />
                        <Label htmlFor={jurisdiction}>{jurisdiction}</Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="space-y-2">
                <Label>Courts</Label>
                <ScrollArea className="h-[100px] rounded-md border p-2">
                  <div className="space-y-2">
                    {COURTS.map((court) => (
                      <div key={court} className="flex items-center space-x-2">
                        <Checkbox
                          id={court}
                          checked={filters.courts.includes(court)}
                          onCheckedChange={() => handleCourtToggle(court)}
                        />
                        <Label htmlFor={court}>{court}</Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="space-y-2">
                <Label>Judges</Label>
                <ScrollArea className="h-[100px] rounded-md border p-2">
                  <div className="space-y-2">
                    {JUDGES.map((judge) => (
                      <div key={judge} className="flex items-center space-x-2">
                        <Checkbox
                          id={judge}
                          checked={filters.judges.includes(judge)}
                          onCheckedChange={() => handleJudgeToggle(judge)}
                        />
                        <Label htmlFor={judge}>{judge}</Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <RadioGroup
                  value={filters.status}
                  onValueChange={(value: 'all' | 'pending' | 'decided') =>
                    handleStatusChange(value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pending" id="pending" />
                    <Label htmlFor="pending">Pending</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="decided" id="decided" />
                    <Label htmlFor="decided">Decided</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>AI Analysis</Label>
                <RadioGroup
                  value={filters.hasAnalysis === null ? 'all' : filters.hasAnalysis ? 'yes' : 'no'}
                  onValueChange={(value) =>
                    handleAnalysisChange(
                      value === 'all' ? null : value === 'yes'
                    )
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="analysis-all" />
                    <Label htmlFor="analysis-all">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="analysis-yes" />
                    <Label htmlFor="analysis-yes">With Analysis</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="analysis-no" />
                    <Label htmlFor="analysis-no">Without Analysis</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={clearFilters}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Clear All
                </Button>
                <Button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="gap-2"
                >
                  <Check className="h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </form>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.dateRange.from && (
            <Badge variant="secondary" className="gap-1">
              From: {format(filters.dateRange.from, "MMM d, yyyy")}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() =>
                  setFilters({
                    dateRange: { ...filters.dateRange, from: null },
                  })
                }
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.dateRange.to && (
            <Badge variant="secondary" className="gap-1">
              To: {format(filters.dateRange.to, "MMM d, yyyy")}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() =>
                  setFilters({
                    dateRange: { ...filters.dateRange, to: null },
                  })
                }
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.categories.map((category) => (
            <Badge key={category} variant="secondary" className="gap-1">
              {category}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleCategoryToggle(category)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.jurisdictions.map((jurisdiction) => (
            <Badge key={jurisdiction} variant="secondary" className="gap-1">
              {jurisdiction}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleJurisdictionToggle(jurisdiction)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.courts.map((court) => (
            <Badge key={court} variant="secondary" className="gap-1">
              {court}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleCourtToggle(court)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.judges.map((judge) => (
            <Badge key={judge} variant="secondary" className="gap-1">
              {judge}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleJudgeToggle(judge)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.status !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Status: {filters.status}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleStatusChange('all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.hasAnalysis !== null && (
            <Badge variant="secondary" className="gap-1">
              {filters.hasAnalysis ? 'With Analysis' : 'Without Analysis'}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleAnalysisChange(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-6 px-2 text-xs"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 
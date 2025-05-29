
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface CaseSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

const CaseSearch = ({
  searchQuery,
  setSearchQuery,
  selectedState,
  setSelectedState,
  selectedType,
  setSelectedType,
}: CaseSearchProps) => {
  const states = [
    "All States", "California", "New York", "Texas", "Florida", "Illinois",
    "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"
  ];

  const caseTypes = [
    "All Types", "Contract Dispute", "Personal Injury", "Employment", 
    "Intellectual Property", "Real Estate", "Securities", "Antitrust",
    "Consumer Protection", "Environmental", "Medical Malpractice"
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Search cases, parties, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl"
          />
        </div>
        
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="w-full md:w-56 h-14 border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl">
            <SelectValue placeholder="Filter by State" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full md:w-56 h-14 border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl">
            <SelectValue placeholder="Case Type" />
          </SelectTrigger>
          <SelectContent>
            {caseTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CaseSearch;

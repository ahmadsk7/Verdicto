
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface CaseListProps {
  searchQuery: string;
  selectedState: string;
  selectedType: string;
}

const CaseList = ({ searchQuery, selectedState, selectedType }: CaseListProps) => {
  const navigate = useNavigate();

  const mockCases = [
    {
      id: "1",
      title: "Smith v. TechCorp Industries",
      court: "U.S. District Court, Northern District of California",
      dateFiled: "2024-03-15",
      state: "California",
      type: "Employment",
      summary: "Employment discrimination case involving wrongful termination and hostile work environment claims. Plaintiff seeks damages for lost wages and emotional distress."
    },
    {
      id: "2", 
      title: "Global Pharmaceuticals Inc. v. Generic Labs",
      court: "U.S. District Court, Southern District of New York",
      dateFiled: "2024-02-28",
      state: "New York",
      type: "Intellectual Property",
      summary: "Patent infringement lawsuit over generic drug manufacturing processes. Complex IP litigation involving multiple pharmaceutical patents."
    },
    {
      id: "3",
      title: "Johnson v. Metro Construction LLC",
      court: "Superior Court of California, Los Angeles County",
      dateFiled: "2024-01-12",
      state: "California", 
      type: "Personal Injury",
      summary: "Construction site accident resulting in severe injuries. Plaintiff claims inadequate safety protocols and negligent supervision."
    },
    {
      id: "4",
      title: "DataSecure Inc. v. CloudTech Solutions",
      court: "U.S. District Court, Eastern District of Texas",
      dateFiled: "2024-04-02",
      state: "Texas",
      type: "Contract Dispute",
      summary: "Breach of contract dispute over cloud services agreement. Issues include service level violations and data security breaches."
    },
    {
      id: "5",
      title: "Environmental Alliance v. PetroMax Corp",
      court: "U.S. District Court, Middle District of Florida",
      dateFiled: "2024-03-20",
      state: "Florida",
      type: "Environmental",
      summary: "Environmental protection lawsuit challenging offshore drilling permits. Class action seeking injunctive relief and damages."
    }
  ];

  const filteredCases = useMemo(() => {
    return mockCases.filter(case_ => {
      const matchesSearch = !searchQuery || 
        case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesState = !selectedState || selectedState === "All States" || case_.state === selectedState;
      const matchesType = !selectedType || selectedType === "All Types" || case_.type === selectedType;
      
      return matchesSearch && matchesState && matchesType;
    });
  }, [searchQuery, selectedState, selectedType, mockCases]);

  const handleCaseClick = (caseId: string) => {
    navigate(`/case/${caseId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-serif font-semibold text-slate-800">
          Recent Cases ({filteredCases.length})
        </h2>
      </div>
      
      <div className="grid gap-6">
        {filteredCases.map((case_) => (
          <Card 
            key={case_.id} 
            className="hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-l-emerald-500 bg-white/80 backdrop-blur-sm border-slate-200/50 hover:border-slate-300/50 group"
            onClick={() => handleCaseClick(case_.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-serif font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight">
                  {case_.title}
                </CardTitle>
                <Badge variant="secondary" className="ml-4 bg-emerald-100 text-emerald-700 font-medium border-emerald-200">
                  {case_.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-600 flex items-center">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                  {case_.court}
                </p>
                <p className="text-sm text-slate-500 font-medium">Filed: {new Date(case_.dateFiled).toLocaleDateString()}</p>
                <p className="text-slate-700 leading-relaxed">{case_.summary}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CaseList;

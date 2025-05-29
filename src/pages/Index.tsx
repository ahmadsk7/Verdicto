
import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CaseSearch from "../components/CaseSearch";
import CaseList from "../components/CaseList";
import FeedbackModal from "../components/FeedbackModal";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <Navbar onFeedbackClick={() => setFeedbackOpen(true)} />
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CaseSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
        <CaseList
          searchQuery={searchQuery}
          selectedState={selectedState}
          selectedType={selectedType}
        />
      </div>
      <FeedbackModal 
        isOpen={feedbackOpen} 
        onClose={() => setFeedbackOpen(false)} 
      />
    </div>
  );
};

export default Index;

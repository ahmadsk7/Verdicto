
const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-emerald-400 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-emerald-300 rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-emerald-500 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-emerald-400 rounded-lg rotate-12"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
          Search and Analyze<br />
          U.S. Civil Cases
        </h1>
        <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-light">
          Access comprehensive litigation data, AI-powered analytics, and detailed case insights 
          to make informed legal decisions with confidence.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

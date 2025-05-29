
import { Scale } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2 group cursor-pointer">
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
          <Scale className="w-5 h-5 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-slate-700 rounded-full opacity-80"></div>
      </div>
      <div>
        <h1 className="text-2xl font-serif font-semibold text-slate-800 tracking-tight">
          Verdicto
        </h1>
        <div className="h-0.5 bg-gradient-to-r from-emerald-400 to-transparent rounded-full"></div>
      </div>
    </div>
  );
};

export default Logo;

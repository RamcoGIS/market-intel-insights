
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc] w-full p-4 dark:bg-gray-900">
      <div className="text-center max-w-4xl px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-brand-dark dark:text-white">MarketIntel AI</h1>
        <p className="text-lg sm:text-xl text-blue-700 mb-8 dark:text-blue-400">Real-time market intelligence powered by AI</p>
        
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
            <h3 className="text-[16px] font-semibold mb-2 text-brand-primary dark:text-blue-300">Real-time Search</h3>
            <p className="text-[13px] text-gray-600 dark:text-gray-300">Search market data with AI-powered analysis and insights</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
            <h3 className="text-[16px] font-semibold mb-2 text-brand-primary dark:text-blue-300">Trending Topics</h3>
            <p className="text-[13px] text-gray-600 dark:text-gray-300">Stay updated with the latest market trends and analysis</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md sm:col-span-2 md:col-span-1 dark:bg-gray-800">
            <h3 className="text-[16px] font-semibold mb-2 text-brand-primary dark:text-blue-300">Search History</h3>
            <p className="text-[13px] text-gray-600 dark:text-gray-300">Access your past research and build on previous insights</p>
          </div>
        </div>
        
        <div className="mt-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="lg" className="bg-brand-primary hover:bg-brand-dark transition-colors w-auto px-8 dark:bg-blue-700 dark:hover:bg-blue-800">
                  <Link to="/market-research" className="w-full">
                    Launch Market Research Analyzer
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start analyzing market data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

export default Index;

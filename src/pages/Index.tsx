
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-4xl font-bold mb-4 text-brand-dark">Welcome to MarketIntel AI</h1>
        <p className="text-xl text-blue-700 mb-8">Real-time market intelligence powered by AI</p>
        <Button asChild size="lg" className="bg-brand-primary hover:bg-brand-dark transition-colors">
          <Link to="/market-research">
            Launch Market Research Analyzer
          </Link>
        </Button>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-brand-primary">Real-time Search</h3>
            <p className="text-gray-600">Search market data with AI-powered analysis and insights</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-brand-primary">Trending Topics</h3>
            <p className="text-gray-600">Stay updated with the latest market trends and analysis</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-brand-primary">Search History</h3>
            <p className="text-gray-600">Access your past research and build on previous insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;


import { useState } from "react";
import { SearchPanel } from "../components/SearchPanel";
import { TrendsPanel } from "../components/TrendsPanel";
import { HistoryPanel } from "../components/HistoryPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, History } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UserAvatar } from "../components/UserAvatar";

type TabType = "search" | "trends" | "history";

export default function MarketResearch() {
  const [activeTab, setActiveTab] = useState<TabType>("search");

  const handleLogout = () => {
    console.log("Logging out...");
    // In a real app, this would handle logout logic
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] w-full">
      <div className="w-full mx-auto px-2 sm:px-4 py-4">
        <div className="bg-white rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.1)] overflow-hidden w-full">
          {/* Header */}
          <div className="flex justify-between items-center bg-white p-4 border-b">
            <div>
              <h1 className="text-[16px] font-bold text-gray-800">MarketIntel AI</h1>
              <p className="text-[13px] text-gray-500">Real-time market intelligence</p>
            </div>
            <UserAvatar name="Alex Johnson" onLogout={handleLogout} />
          </div>

          {/* Tabs Navigation */}
          <Tabs 
            defaultValue="search" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as TabType)}
            className="p-4 sm:p-6 w-full"
          >
            <TabsList className="w-fit mb-6 bg-white">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger 
                      value="search" 
                      className={`flex items-center ${activeTab === 'search' ? 'tab-selected' : ''}`}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      <span>Search</span>
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Search for market insights</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger 
                      value="trends" 
                      className={`flex items-center ${activeTab === 'trends' ? 'tab-selected' : ''}`}
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      <span>Trends</span>
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View current market trends</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger 
                      value="history" 
                      className={`flex items-center ${activeTab === 'history' ? 'tab-selected' : ''}`}
                    >
                      <History className="mr-2 h-4 w-4" />
                      <span>History</span>
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Browse your search history</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TabsList>

            {/* Tab Content */}
            <TabsContent value="search" className="mt-2 w-full">
              <SearchPanel />
            </TabsContent>

            <TabsContent value="trends" className="mt-2 w-full">
              <TrendsPanel />
            </TabsContent>

            <TabsContent value="history" className="mt-2 w-full">
              <HistoryPanel />
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-4 text-center text-[13px] text-blue-600">
          <p>Data is updated in real-time using AI analysis</p>
        </div>
      </div>
    </div>
  );
}

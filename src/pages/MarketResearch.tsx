
import { useState } from "react";
import { SearchPanel } from "../components/SearchPanel";
import { TrendsPanel } from "../components/TrendsPanel";
import { HistoryPanel } from "../components/HistoryPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, History } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UserAvatar } from "../components/UserAvatar";
import { ThemeToggle } from "../components/ThemeToggle";

type TabType = "search" | "trends" | "history";

export default function MarketResearch() {
  const [activeTab, setActiveTab] = useState<TabType>("search");

  const handleLogout = () => {
    console.log("Logging out...");
    // In a real app, this would handle logout logic
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col w-full dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] w-full dark:bg-gray-800">
        <div className="flex justify-between items-center max-w-[1440px] mx-auto px-4 py-2">
          <div>
            <h1 className="text-[16px] font-bold text-gray-800 dark:text-gray-100">MarketIntel AI</h1>
            <p className="text-[13px] text-gray-500 dark:text-gray-300">Real-time market intelligence</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <UserAvatar name="Alex Johnson" onLogout={handleLogout} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow w-full pb-16">
        <div className="max-w-[1440px] mx-auto px-4 py-4 h-full flex flex-col">
          {/* Tabs Navigation */}
          <Tabs 
            defaultValue="search" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as TabType)}
            className="w-full h-full flex flex-col"
          >
            <div className="bg-white rounded-md shadow-sm p-1 inline-block mb-4 self-start w-auto dark:bg-gray-800">
              <TabsList className="bg-white w-auto dark:bg-gray-800">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger 
                        value="search" 
                        className={`flex items-center px-8 ${activeTab === 'search' ? 'bg-[#eaf4ff] text-[#006c8f] dark:bg-blue-900/50 dark:text-blue-300' : ''}`}
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
                        className={`flex items-center px-8 ${activeTab === 'trends' ? 'bg-[#eaf4ff] text-[#006c8f] dark:bg-blue-900/50 dark:text-blue-300' : ''}`}
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
                        className={`flex items-center px-8 ${activeTab === 'history' ? 'bg-[#eaf4ff] text-[#006c8f] dark:bg-blue-900/50 dark:text-blue-300' : ''}`}
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
            </div>

            {/* Tab Content */}
            <div className="w-full flex-grow overflow-auto">
              <TabsContent value="search" className="mt-2 w-full h-full">
                <SearchPanel />
              </TabsContent>

              <TabsContent value="trends" className="mt-2 w-full h-full">
                <TrendsPanel />
              </TabsContent>

              <TabsContent value="history" className="mt-2 w-full h-full">
                <HistoryPanel />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 z-10">
        <div className="max-w-[1440px] mx-auto px-4 text-center text-[13px] text-blue-600 dark:text-blue-400">
          <p>Data is updated in real-time using AI analysis</p>
        </div>
      </div>
    </div>
  );
}

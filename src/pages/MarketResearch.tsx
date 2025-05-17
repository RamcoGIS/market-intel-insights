
import { useState } from "react";
import { SearchPanel } from "../components/SearchPanel";
import { TrendsPanel } from "../components/TrendsPanel";
import { HistoryPanel } from "../components/HistoryPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, History } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TabType = "search" | "trends" | "history";

export default function MarketResearch() {
  const [activeTab, setActiveTab] = useState<TabType>("search");

  return (
    <div className="min-h-screen bg-blue-50 w-full">
      <div className="w-full mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-4 sm:p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-white">MarketIntel AI</h1>
              <p className="text-white/80 text-xs sm:text-base">Real-time market intelligence</p>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs 
            defaultValue="search" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as TabType)}
            className="p-3 sm:p-6 w-full"
          >
            <TabsList className="grid grid-cols-3 mb-6 w-full">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="search" className="flex items-center">
                      <Search className="mr-1 sm:mr-2 h-4 w-4" />
                      <span className="hidden xs:inline">Search</span>
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
                    <TabsTrigger value="trends" className="flex items-center">
                      <TrendingUp className="mr-1 sm:mr-2 h-4 w-4" />
                      <span className="hidden xs:inline">Trends</span>
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
                    <TabsTrigger value="history" className="flex items-center">
                      <History className="mr-1 sm:mr-2 h-4 w-4" />
                      <span className="hidden xs:inline">History</span>
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

        <div className="mt-4 text-center text-sm text-blue-600">
          <p>Data is updated in real-time using AI analysis</p>
        </div>
      </div>
    </div>
  );
}

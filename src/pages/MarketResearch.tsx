
import { useState } from "react";
import { SearchPanel } from "../components/SearchPanel";
import { TrendsPanel } from "../components/TrendsPanel";
import { HistoryPanel } from "../components/HistoryPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, History } from "lucide-react";

type TabType = "search" | "trends" | "history";

export default function MarketResearch() {
  const [activeTab, setActiveTab] = useState<TabType>("search");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">MarketIntel AI</h1>
              <p className="text-white/80">Real-time market intelligence</p>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs 
            defaultValue="search" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as TabType)}
            className="p-6"
          >
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="search" className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Search
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center">
                <History className="mr-2 h-4 w-4" />
                History
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <TabsContent value="search" className="mt-2">
              <SearchPanel />
            </TabsContent>

            <TabsContent value="trends" className="mt-2">
              <TrendsPanel />
            </TabsContent>

            <TabsContent value="history" className="mt-2">
              <HistoryPanel />
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Data is updated in real-time using AI analysis</p>
        </div>
      </div>
    </div>
  );
}


import { useState } from "react";
import { SearchPanel } from "../components/SearchPanel";
import { TrendsPanel } from "../components/TrendsPanel";
import { HistoryPanel } from "../components/HistoryPanel";
import { AppSidebar } from "../components/AppSidebar";
import { AppHeader } from "../components/AppHeader";

type TabType = "search" | "trends" | "history";

export default function MarketResearch() {
  const [activeTab, setActiveTab] = useState<TabType>("search");

  const handleLogout = () => {
    console.log("Logging out...");
    // In a real app, this would handle logout logic
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as TabType);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "search":
        return <SearchPanel />;
      case "trends":
        return <TrendsPanel />;
      case "history":
        return <HistoryPanel />;
      default:
        return <SearchPanel />;
    }
  };

  return (
    <div className="bg-[#f8f9fc] dark:bg-[#1d2431] flex h-screen overflow-hidden">
      {/* Sidebar */}
      <AppSidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <AppHeader title="MarketIntel AI - Real-time market intelligence" onLogout={handleLogout} />
        
        {/* Content */}
        <div className="flex-1 relative overflow-hidden">
          <div className="h-full bg-[#f8f9fc] dark:bg-[#1d2431]">
            <div className="max-w-[1440px] mx-auto px-4 py-4 h-full">
              {renderTabContent()}
            </div>
          </div>
        </div>
        
        {/* Fixed Footer */}
        <div className="bg-white dark:bg-[#0C121E] border-t border-[#eaecf0] dark:border-[#344054] py-2">
          <div className="max-w-[1440px] mx-auto px-4 text-center text-[13px] text-blue-600 dark:text-blue-400">
            <p>Data is updated in real-time using AI analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
}


import { useState } from "react";
import { SearchPanel } from "../components/SearchPanel";
import { TrendsPanel } from "../components/TrendsPanel";
import { HistoryPanel } from "../components/HistoryPanel";
import { Search, TrendingUp, History, User, LogOut, Moon, Sun } from "lucide-react";

type TabType = "search" | "trends" | "history";

export default function MarketResearch() {
  const [activeTab, setActiveTab] = useState<TabType>("search");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    // In a real app, this would handle logout logic
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  const tabConfig = [
    { id: "search", label: "Search", icon: Search, tooltip: "Search for market insights" },
    { id: "trends", label: "Trends", icon: TrendingUp, tooltip: "View current market trends" },
    { id: "history", label: "History", icon: History, tooltip: "Browse your search history" },
  ];

  return (
    <div className={`min-h-screen flex flex-col overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Fixed Header */}
      <div className="bg-white dark:bg-gray-800 flex justify-between items-center px-4 py-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        {/* Title */}
        <div>
          <h1 className="text-base font-bold text-gray-800 dark:text-gray-100">MarketIntel AI</h1>
          <p className="text-sm text-gray-500 dark:text-gray-300">Real-time market intelligence</p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <div
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            )}
          </div>

          {/* User Avatar Dropdown */}
          <div className="relative">
            <div
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <span className="text-white text-sm font-medium">AJ</span>
            </div>

            {userDropdownOpen && (
              <div className="absolute right-0 top-10 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-medium text-gray-800 dark:text-gray-100">Alex Johnson</p>
                </div>
                <div
                  onClick={() => {
                    setUserDropdownOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-[73px] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabConfig.map((tab) => {
              const active = tab.id === activeTab;
              const IconComponent = tab.icon;

              return (
                <div
                  key={tab.id}
                  title={tab.tooltip}
                  onClick={() => handleTabClick(tab.id as TabType)}
                  className={`flex items-center gap-2 px-1 py-4 cursor-pointer border-b-2 transition-all duration-200 ${
                    active 
                      ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400" 
                      : "border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-4 h-full">
          {activeTab === "search" && <SearchPanel />}
          {activeTab === "trends" && <TrendsPanel />}
          {activeTab === "history" && <HistoryPanel />}
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 sticky bottom-0 z-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-blue-600 dark:text-blue-400">
          <p>Data is updated in real-time using AI analysis</p>
        </div>
      </div>
    </div>
  );
}

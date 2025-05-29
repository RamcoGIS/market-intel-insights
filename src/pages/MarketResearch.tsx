
import { useState } from "react";
import { SearchPanel } from "../components/SearchPanel";
import { TrendsPanel } from "../components/TrendsPanel";
import { HistoryPanel } from "../components/HistoryPanel";
import { Search, TrendingUp, History, Menu, User, LogOut, Moon, Sun } from "lucide-react";

type TabType = "search" | "trends" | "history";

export default function MarketResearch() {
  const [activeTab, setActiveTab] = useState<TabType>("search");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    // In a real app, this would handle logout logic
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
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
    <div className={`min-h-screen flex overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div 
        className={`bg-white dark:bg-gray-800 flex flex-col items-center py-5 px-3 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
          sidebarExpanded ? 'w-60' : 'w-16'
        }`}
      >
        {/* Hamburger menu */}
        <div
          className="w-5 h-5 cursor-pointer mb-8 self-start ml-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          onClick={toggleSidebar}
          title="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-3 w-full">
          {tabConfig.map((tab) => {
            const active = tab.id === activeTab;
            const IconComponent = tab.icon;

            return (
              <div
                key={tab.id}
                title={tab.tooltip}
                onClick={() => handleTabClick(tab.id as TabType)}
                className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  active 
                    ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                <div className="w-5 h-5 overflow-hidden">
                  <IconComponent className="w-5 h-5" />
                </div>
                {sidebarExpanded && (
                  <span className="ml-3 transition-opacity duration-200 whitespace-nowrap text-sm font-medium">
                    {tab.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {sidebarExpanded ? (
          <div className="mt-auto mb-4 text-xs text-gray-500 dark:text-gray-400 self-start ml-2">
            <p className="m-0">Powered By</p>
            <p className="m-0 font-medium">MarketIntel AI</p>
          </div>
        ) : (
          <div className="mt-auto mb-4 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-300 text-xs font-bold">MI</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
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
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>

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
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </div>
              )}
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
    </div>
  );
}

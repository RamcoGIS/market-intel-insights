
import { useState } from "react";
import { Search, TrendingUp, History, Menu } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const { theme } = useTheme();
  const colorMode = theme === "dark" ? "dark" : "light";

  const tabMenu = [
    { name: "search", label: "Search", icon: Search },
    { name: "trends", label: "Trends", icon: TrendingUp },
    { name: "history", label: "History", icon: History },
  ];

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const getIconComponent = (tabName: string, isActiveOrHovered: boolean) => {
    const tab = tabMenu.find(t => t.name === tabName);
    if (!tab) return null;
    
    const IconComponent = tab.icon;
    return (
      <IconComponent 
        className="w-5 h-5" 
        color={isActiveOrHovered ? (colorMode === "dark" ? "#EAF4FF" : "#0068CF") : (colorMode === "dark" ? "#EAF4FF" : "#475467")}
      />
    );
  };

  return (
    <div
      className="sidebar-container bg-white dark:bg-[#0C121E] flex flex-col items-center py-5 px-3 border-r border-[#eaecf0] dark:border-[#344054] transition-all duration-300"
      style={{ width: expanded ? "240px" : "60px" }}
    >
      {/* Hamburger menu */}
      <div
        className="w-5 h-5 cursor-pointer mb-8 self-start ml-1"
        onClick={toggleSidebar}
        title="Toggle Menu"
      >
        <Menu className="w-5 h-5" color={colorMode === "light" ? "#000" : "#F9FAFB"} />
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-3 w-full">
        {tabMenu.map((tab) => {
          const active = tab.name === activeTab;
          const isActiveOrHovered = active;

          return (
            <div
              title={tab.label}
              key={tab.name}
              onClick={() => onTabChange(tab.name)}
              className={`flex items-center p-2 rounded-lg cursor-pointer 
                transition-all duration-200 
                ${active ? "bg-[#eaf4ff] dark:bg-[#00488F]" : "hover:bg-gray-100 dark:hover:bg-[#00488F]"}
              `}
            >
              <div className="w-5 h-5 overflow-hidden">
                {getIconComponent(tab.name, isActiveOrHovered)}
              </div>
              {expanded && (
                <span
                  className={`ml-3 transition-opacity duration-200 whitespace-nowrap text-[13px]
                    ${
                      active
                        ? "text-blue-600 dark:text-[#EAF4FF]"
                        : "text-gray-600 dark:text-[#EAF4FF] hover:text-blue-600 dark:hover:text-[#EAF4FF]"
                    }
                  `}
                >
                  {tab.label}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {expanded ? (
        <div className="mt-auto mb-4 text-xs text-gray-500 dark:text-[#EAF4FF] self-start ml-2">
          <p className="m-0">Powered By</p>
          <p className="m-0 font-medium">MarketIntel AI</p>
        </div>
      ) : (
        <div className="mt-auto mb-4 text-xs text-gray-500 dark:text-[#EAF4FF] self-start">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
        </div>
      )}
    </div>
  );
}

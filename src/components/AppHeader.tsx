
import { UserAvatar } from "./UserAvatar";
import { ThemeToggle } from "./ThemeToggle";

interface AppHeaderProps {
  title: string;
  onLogout: () => void;
}

export function AppHeader({ title, onLogout }: AppHeaderProps) {
  return (
    <div className="bg-white dark:bg-[#0C121E] flex justify-between items-center px-4 py-4 border-b border-[#eaecf0] dark:border-[#344054]">
      {/* Title */}
      <div className="h-5 font-sans text-[15px] font-bold text-black dark:text-white">{title}</div>

      {/* Right side controls */}
      <div className="flex gap-4 min-w-[116px] items-center">
        <ThemeToggle />
        <UserAvatar name="Alex Johnson" onLogout={onLogout} />
      </div>
    </div>
  );
}

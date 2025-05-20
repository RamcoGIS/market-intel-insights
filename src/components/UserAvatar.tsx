
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface UserAvatarProps {
  name: string;
  designation?: string;
  onLogout?: () => void;
}

export function UserAvatar({ name, designation = "Market Analyst", onLogout }: UserAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="focus:outline-none">
          <Avatar className="h-9 w-9 cursor-pointer">
            <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4" align="end">
        <div className="flex flex-col">
          <div className="font-medium text-[14px]">{name}</div>
          <div className="text-[13px] text-gray-500">{designation}</div>
          <div className="h-px bg-gray-200 my-3"></div>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md text-[13px] text-gray-700"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

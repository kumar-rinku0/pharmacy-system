import { Bell, ChevronDown, Search } from "lucide-react";
import { useAuth } from "../provider/auth-provider";

const TopNav = () => {
  const { user } = useAuth();
  const username = user?.fullName || "Anonymous";
  const initials = username
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex items-center justify-between">
      <h1 className="text-xl font-light text-gray-700 hidden lg:block">
        Pharmacy Dashboard
      </h1>

      <div className="flex items-center gap-4 w-full lg:w-auto justify-end">
        <div className="relative flex-1 lg:flex-none lg:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition"
          />
        </div>

        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium uppercase">
            {initials}
          </div>
          <div className="hidden lg:block">
            <div className="truncate capitalize">{username}</div>
            <div className="truncate text-xs text-gray-500">{user?.email}</div>
          </div>
          <ChevronDown className="hidden lg:block w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default TopNav;

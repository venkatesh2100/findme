"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { id: "admin", label: "Admin Dashboard", icon: "/home.png", activeIcon: "/home-blue.png", path: "/admin-dashboard" },
    { id: "users", label: "User Management and Profile Analytics", path: "/user-management" },
    { id: "tools", label: "Admin Tools", path: "/admin-tools" },
    { id: "performance", label: "Performance Metric", path: "/performance-metric" },
    { id: "feedback", label: "Feedback & Support", path: "/feedback" },
  ];

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <aside className="w-[280px] min-h-screen bg-white shadow-md flex flex-col justify-between">
      <div className="pr-6 mt-26">
        <h2 className="text-lg font-semibold mb-8 text-center px-6 pt-8 text-gray-800">
          Welcome to <br /> Admin Dashboard
        </h2>

        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.path)}
            className="flex cursor-pointer group"
          >
            <div
              className={`w-1 rounded-r transition-colors duration-200 ${
                pathname === item.path ? "bg-blue-500" : "bg-transparent"
              }`}
            />
            <div className="flex items-center gap-3 px-4 pr-8 py-2 w-full">
              {item.icon ? (
                <Image
                  src={pathname === item.path && item.activeIcon ? item.activeIcon : item.icon}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={`${pathname === item.path ? "" : "opacity-70"}`}
                />
              ) : (
                <div className="w-[20px] h-[20px]" />
              )}
              <span
                className={`transition-colors leading-[1.4] ${
                  pathname === item.path
                    ? "text-blue-600 font-semibold"
                    : "text-gray-500  group-hover:text-gray-700"
                }`}
              >
                {item.label}
              </span>
            </div>
          </div>
        ))}

        {/* Settings & Logout */}
        <div className="pt-40 space-y-4 text-sm text-gray-600 px-6">
          <button
            onClick={() => handleClick("/settings")}
            className="cursor-pointer hover:text-blue-500 flex items-center gap-2"
          >
            <Image src="/set.png" alt="Settings" width={20} height={20} />
            <span>Settings</span>
          </button>
          <div className="cursor-pointer hover:text-blue-500 flex items-center gap-2">
            <Image src="/out.png" alt="Logout" width={20} height={20} />
            <span>Logout</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center mt-8 px-6">
        © 2025, Findme
      </div>
    </aside>
  );
}

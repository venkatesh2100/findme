"use client";
import { useState } from "react";
import Image from "next/image";
import Admin from "./admin/page";
import UserManagement from "./usermanagement/page";
import Loading from "../../packages/ui/loading";

export function Sidebar({ onMenuItemClick }) {
  const [activeItem, setActiveItem] = useState("admin");

  const menuItems = [
    { id: "admin", label: "Admin Dashboard", icon: "/home.png", activeIcon: "/home-blue.png", content: <Admin /> },
    {
      id: "users",
      label: "User Management and Profile Analytics",
      content: <UserManagement />,
    },
    { id: "tools", label: "Admin", content: <Loading /> },
    { id: "performance", label: "Performance Metric", content: <Loading /> },
    { id: "feedback", label: "Feedback and Support", content: <Loading /> },
  ];

  const handleClick = (id, content) => {
    setActiveItem(id);
    onMenuItemClick(content);
  };

  return (
    <aside className="w-76 min-h-screen bg-white shadow-md flex flex-col justify-between">
      <div className="pr-6">
        {/* Header */}
        <h2 className="text-lg font-semibold mb-8 text-center px-6 pt-8 text-gray-800">
          Welcome to
          <br />
          Admin Dashboard
        </h2>

        {/* Menu Items */}
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id, item.content)}
            className="flex cursor-pointer group"
          >
            {/* Blue vertical bar */}
            <div
              className={`w-1 rounded-r transition-colors duration-200 ${
                activeItem === item.id ? "bg-blue-500" : "bg-transparent"
              }`}
            />
            {/* Icon & text container */}
            <div className="flex items-center gap-3  px-4 pr-8 py-2 w-full">
              {item.icon ? (
                <Image
                 src={activeItem==='admin' && item.activeIcon ? item.activeIcon : item.icon}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={`${activeItem === item.id ? "" : "opacity-70"}`}
                />
              ) : (
                <div className="w-4" />
              )}
              <span
                className={`transition-colors leading-none ${
                  activeItem === item.id
                    ? "text-blue-600 font-semibold"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              >
                {item.label}
              </span>
            </div>
          </div>
        ))}

        {/* Settings & Logout */}
        <div className="pt-40 space-y-4 text-sm text-gray-600 px-6">
          <div className="cursor-pointer hover:text-blue-500 flex items-center gap-2">
            <Image src="/set.png" alt="Settings" width={24} height={24} />
            <span>Settings</span>
          </div>
          <div className="cursor-pointer hover:text-blue-500 flex items-center gap-2">
            <Image src="/out.png" alt="Logout" width={24} height={23} />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-500 text-center mt-8 px-6">
        © 2025, Findme
      </div>
    </aside>
  );
}

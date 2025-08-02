"use client";
import { useState, useEffect } from "react";
import Admin from "./admin/page";
import UserManagement from "./usermanagement/page";

export function Sidebar({ onMenuItemClick }) {
  const [activeItem, setActiveItem] = useState(0);

  const menu = [
    {
      title: "Admin Dashboard",
      content: <Admin />,
    },
    {
      title: "User Management and Profile Analytics",
      content: <UserManagement />,
    },
    {
      title: "Admin Tools",
      content: "Administrative tools and configuration options...",
    },
    {
      title: "Performance Metric",
      content: "System performance metrics and reports...",
    },
    {
      title: "Feedback and Support",
      content: "User feedback and support ticket management...",
    },

  ];

  useEffect(() => {
    if (onMenuItemClick) {
      onMenuItemClick(menu[0].content);
    }
  }, []);

  const handleClick = (index) => {
    setActiveItem(index);
    onMenuItemClick(menu[index].content);
  };

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md px-6 py-8 flex flex-col justify-between">
      {/* Top: Menu */}
      <div>
        <h2 className="text-lg font-semibold mb-8 text-gray-800">
          Welcome to Admin Dashboard
        </h2>

        <nav className="space-y-4 text-gray-700">
          {menu.map((item, index) => (
            <p
              key={index}
              onClick={() => handleClick(index)}
              className={`cursor-pointer transition hover:text-blue-500 ${
                activeItem === index ? "text-blue-600 font-bold" : ""
              }`}
            >
              {item.title}
            </p>
          ))}
        </nav>

        {/* Settings & Logout */}
        <div className="pt-40 pl-4 space-y-4 text-sm text-gray-600">
          <div className="cursor-pointer hover:text-blue-500 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <span>Settings</span>
          </div>
          <div className="cursor-pointer hover:text-blue-500 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Bottom: Footer */}
      <div className="text-xs text-gray-500 text-center mt-8">
        © 2025, Findme
      </div>
    </aside>
  );
}

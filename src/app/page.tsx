"use client";
import React, { useState } from "react";
import Admin from "../componets/admin/page";
import { Sidebar } from "../componets/sidebar";
import HeaderRightProfile from "../componets/owner";

export default function Home() {
  const [content, setContent] = useState<React.ReactNode>(<Admin />);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        onMenuItemClick={(content: React.ReactNode) => setContent(content)}
      />
      <main className="flex-1 bg-[#e6f0fa] p">
          <HeaderRightProfile />
        {/* Header with owner profile */}
        <div className="flex justify-end mb-4">
        </div>

        {/* Page content */}
        <div className="p-6 rounded-xl shadow">{content}</div>
      </main>
    </div>
  );
}

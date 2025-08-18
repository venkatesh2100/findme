"use client";

import Sidebar from "@/componets/sidebar";
import Navbar from "../../../packages/ui/navbar";
import HeaderRightProfile from "@/componets/owner";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-[#e6f0fa]">
          <HeaderRightProfile />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}

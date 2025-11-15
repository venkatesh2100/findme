"use client";

import Sidebar from "@/componets/sidebar";
import Navbar from "../../../packages/ui/navbar";
import HeaderRightProfile from "@/componets/owner";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTrafficReport = pathname === "/traffic-report";

  return (
    <div className="w-full max-w-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex">
        {!isTrafficReport && <Sidebar />}
        <div className="flex-1 bg-[#e6f0fa] min-h-screen">
          {!isTrafficReport && <HeaderRightProfile />}
          <main style={{ paddingTop: "20px", paddingBottom: "50px" }}>{children}</main>
        </div>
      </div>
    </div>
  );
}

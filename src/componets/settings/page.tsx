"use client";
import { useState } from "react";
import AdminInfoForm from "./adminInfo";
import AdminMembersList from "./adminMemberList";
import TeamInfoForm from "./teamInfo";
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("adminInfo");

  return (
    <div className="min-h-screen ml-60 font-sans text-gray-900">
      <h1 className="text-xl font-semibold mb-8">Setting</h1>

      <nav className="flex space-x-8 text-sm mb-6 font-normal">
        <button
          onClick={() => setActiveTab("adminInfo")}
          className={`pb-1 ${
            activeTab === "adminInfo"
              ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Admin Info
        </button>
        <button
          onClick={() => setActiveTab("listAdmin")}
          className={`pb-1 ${
            activeTab === "listAdmin"
              ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          List of Admin Members
        </button>
        <button
          onClick={() => setActiveTab("teamInfo")}
          className={`pb-1 ${
            activeTab === "teamInfo"
              ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Team Info
        </button>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          List of Team Members
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          Verification Info
        </a>
      </nav>

      {activeTab === "adminInfo" && <AdminInfoForm />}
      {activeTab === "listAdmin" && <AdminMembersList />}
      {activeTab === 'teamInfo' && <TeamInfoForm/>}
    </div>
  );
}

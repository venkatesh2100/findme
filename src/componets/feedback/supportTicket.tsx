"use client";
import { Maximize2, Minimize2, Filter } from "lucide-react";
import { useState } from "react";
import AllTicket from "./supportTicket/allTicket";
export default function SupportTicket() {
  const [activeTab, setActiveTab] = useState("all");
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div>
      <div className="bg-white shadow-md rounded-2xl p-2">
        <div className="p-4 items-center">
          <h2 className="font-semibold text-gray-800">List of User Ticket</h2>

          <div className="flex gap-2 justify-between">
            <div className="flex gap-2 text-sm mt-1 pb-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`pb-1 mr-10 ${
                  activeTab === "all"
                    ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All Ticket
              </button>
              <button
                onClick={() => setActiveTab("new")}
                className={`pb-1 ml-10 mr-2 ${
                  activeTab === "new"
                    ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                New Ticket History
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`pb-1 ${
                  activeTab === "past"
                    ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Past Ticket History
              </button>
            </div>
            <div className="flex">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="flex items-center gap-1 mr-2 bg-black text-white text-xs px-3 py-1 rounded-full shadow-sm hover:bg-gray-800 transition"
              >
                <span>{isMaximized ? "Minimize" : "Expand"}</span>
                {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button className="bg-black text-white p-2 rounded-full shadow-sm hover:bg-gray-800 transition">
                <Filter size={14} />
              </button>
            </div>
          </div>
          {activeTab === "all" && <AllTicket isMaximized={isMaximized} />}
          {activeTab === "new" && <AllTicket isMaximized={isMaximized} />}
          {activeTab === "past" && <AllTicket isMaximized={isMaximized} />}
        </div>
      </div>

      {/* Bottom Detail Section - Hidden when maximized */}
      {!isMaximized && (
        <>
          <div className="mt-6 bg-white shadow-md rounded-2xl p-2">
            <div className="p-6">
              <h2 className="font-semibold text-gray-800 mb-6 text-lg">
                Over View of Issue from User
              </h2>

              <div className="space-y-4 text-gray-500 text-md">
                <p>
                  <span className="font-medium mr-1">User Name:</span>
                  {"  Jhon Smith"}
                </p>
                <p>
                  <span className="font-medium mr-1">Ticket ID:</span>
                  {"#2222 "}
                </p>
                <p>
                  <span className="font-medium mr-1">Date Submission:</span>
                  {"30/10/2025  and 11.00 PM "}
                </p>
                <p>
                  <span className="font-medium">Close Date:</span>{" "}
                </p>
                <p>
                  <span className="font-medium">Status:</span>
                  <select className="ml-2 border border-gray-300 rounded-md px-2 py-1">
                    <option>Open</option>
                    <option>Closed</option>
                    <option>In Progress</option>
                  </select>
                </p>

                <p>
                  <span className="font-medium">File and Attachment:</span>{" "}
                </p>
                <p>
                  <span className="font-medium">Assinged To:</span>
                  <select className="ml-2 border border-gray-300 rounded-md px-2 py-1">
                    <option>Open</option>
                    <option>Closed</option>
                    <option>In Progress</option>
                  </select>
                </p>
                <p className="flex items-start gap-4 w-full">
                  <label className="font-medium text-gray-700 mt-2">
                    Comment
                  </label>

                  <p className="flex-1 flex flex-col">
                    <textarea className="w-200 border border-gray-300 bg-gray-100 rounded-md px-3 py-2 text-sm outline-none resize-none h-20"></textarea>

                    <p className="flex ml-180 mt-2">
                      <button className="px-4 py-1 border rounded-md text-sm hover:bg-gray-200 transition">
                        Send
                      </button>
                    </p>
                  </p>
                </p>
              </div>

              <div className="flex gap-4 mt-16 justify-end">
                <button className="bg-[#1A4BB5] hover:bg-[#153d91] text-white px-6 py-2 rounded-lg shadow-sm font-medium transition">
                  Solve
                </button>
                <button className="bg-[#EAF2FA] hover:bg-[#d6e6f8] text-[#1A4BB5] px-6 py-2 rounded-lg shadow-sm font-medium transition">
                  Close
                </button>
                <button className="border border-gray-400 hover:bg-gray-100 px-6 py-2 rounded-lg shadow-sm text-gray-700 font-medium transition">
                  Read Next Comment
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-right text-[#2E6FF2] text-sm font-medium">
            <a href="#">Next Support Ticket Page →</a>
          </div>
        </>
      )}
    </div>
  );
}
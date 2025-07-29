"use client";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function UserDataFilters() {
  const [selectedDate, setSelectedDate] = useState("2025-01-19");
  const [selectedUserType, setSelectedUserType] = useState("All User Data");
  const [groupBy, setGroupBy] = useState("Week");

  const groupOptions = ["Day", "Week", "Month", "Year"];
  const userTypes = ["All User Data", "Verified Users", "Unverified Users"];

  return (
    <div className="bg-[#e6f0fa] px-6 py-4  justify-between rounded-lg shadow flex flex-wrap items-center gap-6">
      <div className="flex ">
        <div className="text-sm font-semibold text-gray-800 min-w-[100px]">
          User data
        </div>

        <div className="flex flex-col text-sm text-gray-600">
          <label className="mb-1">Select Time Period</label>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm shadow-sm focus:outline-none"
            />
            <ChevronDownIcon className="w-4 h-4 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col text-sm text-gray-600">
          <label className="mb-1">Select User type</label>
          <div className="relative">
            <select
              value={selectedUserType}
              onChange={(e) => setSelectedUserType(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm shadow-sm focus:outline-none"
            >
              {userTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            {/* <ChevronDownIcon className="w-4 h-4 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col text-sm text-gray-600">
        <label className="mb-1">Group By</label>
        <div className="flex gap-2 mt-1">
          {groupOptions.map((option) => (
            <button
              key={option}
              onClick={() => setGroupBy(option)}
              className={`px-4  rounded-4xl border py-2 text-sm transition-all ${
                groupBy === option
                  ? "bg-white text-blue-600  font-medium border-blue-500"
                  : "bg-[#f0f4f9] text-gray-600 border-transparent"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

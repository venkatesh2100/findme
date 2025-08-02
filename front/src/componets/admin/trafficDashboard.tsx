"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const deviceData = [
  { name: "Desktop", value: 700 },
  { name: "Mobile", value: 250 },
  { name: "Tablet", value: 150 },
];

const returningData = [
  { name: "Returning", value: 100 },
  { name: "New", value: 50 },
];

const COLORS = ["#009FFD", "#8CDEFC", "#D3F4FF"];
const returningColors = ["#009FFD", "#D3F4FF"];

const stateData = {
  CA: { value: 20 },
  NY: { value: 10 },
};

const TrafficDashboard = () => {
  const [selectedDate, setSelectedDate] = useState("19 January 2025");
  const [timeFrame, setTimeFrame] = useState("daily");


  return (
    <div className="min-h-screen p-6 text-sm space-y-6 bg-[#F4F7FA]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold text-[#1F1F1F] mb-2">Traffic Data</h1>
        <div className="flex gap-3 text-sm text-gray-600">
          {["Daily", "Weekly", "Monthly", "Yearly", "Till Date"].map(
            (label, idx, arr) => (
              <span key={label} className="flex items-center gap-1">
                <button
                  onClick={() => setTimeFrame(label.toLowerCase())}
                  className={`$ {
                    timeFrame === label.toLowerCase()
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  {label}
                </button>
                {idx < arr.length - 1 && <span className="text-gray-400">|</span>}
              </span>
            )
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1 text-sm">Select Time Period</label>
            <input
              type="text"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500 text-xs">Site Sessions</p>
              <h2 className="text-xl font-bold">1100</h2>
              <p className="text-green-500 text-xs mt-1">+32%</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-gray-500 text-xs">Unique Visitors</p>
              <h2 className="text-xl font-bold">150</h2>
              <p className="text-green-500 text-xs mt-1">+33%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow space-y-4">
          <div className="text-sm font-semibold mb-1">Sessions by Device</div>
          <ul className="space-y-1 text-xs">
            {deviceData.map((d, i) => (
              <li key={i} className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ background: COLORS[i] }}
                ></span>
                {d.name} — {d.value}
              </li>
            ))}
          </ul>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {deviceData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center font-bold text-lg">1100</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow space-y-4">
          <div className="text-sm font-semibold mb-1">New vs Returning Visitors</div>
          <ul className="space-y-1 text-xs">
            {returningData.map((d, i) => (
              <li key={i} className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ background: returningColors[i] }}
                ></span>
                {d.name} — {d.value}
              </li>
            ))}
          </ul>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={returningData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {returningData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={returningColors[index % returningColors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center font-bold text-lg">150</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <label className="block text-gray-600 mb-2 text-sm">Select Country</label>
        <select className="border border-gray-300 rounded px-3 py-2 w-full mb-4 text-sm">
          <option>United States</option>
        </select>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <p className="font-semibold text-sm">Sessions by United States</p>
          <ul className="text-xs text-right space-y-1">
            <li>NY &rarr; 10</li>
            <li>CA &rarr; 20</li>
          </ul>
        </div>

        <div className="border-2 border-purple-300 rounded-lg overflow-hidden">
          <div className="w-full h-[600px]">
            {/* <USAMap customize={mapStatesCustomConfig()} /> */}
            <Image
            src="/usa.png"
            width={600}
            height={600}
            alt="USA Map" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficDashboard;
"use client";

import { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

// Custom tick component for multi-line country names
const CustomXAxisTick = ({ x, y, payload }: any) => {
  const value = payload.value;
  const words = value.split(" ");

  if (words.length > 1 && value.length > 10) {
    const mid = Math.ceil(words.length / 2);
    const firstLine = words.slice(0, mid).join(" ");
    const secondLine = words.slice(mid).join(" ");
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={3}
          textAnchor="middle"
          fill="#1e293b"
          fontSize={10}
          fontFamily="Inter"
        >
          {firstLine}
        </text>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#1e293b"
          fontSize={10}
          fontFamily="Inter"
        >
          {secondLine}
        </text>
      </g>
    );
  }

  return (
    <text
      x={x}
      y={y}
      dy={10}
      textAnchor="middle"
      fill="#1e293b"
      fontSize={10}
      fontFamily="Inter"
    >
      {value}
    </text>
  );
};

// Color palette
const COUNTRY_COLORS = [
  "#E1F5FE", "#FF6B9D", "#C5E1A5", "#0288D1", "#81D4FA", "#90A4AE", "#B3E5FC", "#4FC3F7", "#CFD8DC", "#0277BD",
  "#FF7043", "#BA68C8", "#9E9D24", "#F48FB1", "#80DEEA", "#8D6E63", "#9575CD", "#F06292", "#4DB6AC", "#FFD54F",
  "#0D47A1", "#B71C1C", "#C62828", "#F44336", "#FF5722", "#FF9800", "#FFC107", "#FFEB3B", "#FFD700", "#FFA500",
  "#5D4037", "#8D6E63", "#BCAAA4", "#827717", "#689F38", "#558B2F", "#33691E", "#1B5E20", "#212121", "#000000",
  "#546E7A", "#78909C", "#90A4AE", "#E1BEE7", "#558B2F", "#689F38", "#9CCC65", "#CDDC39", "#8D6E63", "#FFD54F",
  "#F9A825", "#B71C1C", "#E57373", "#FFAB91", "#F8BBD0", "#42A5F5", "#90CAF9", "#BBDEFB", "#64B5F6", "#FF6F00",
  "#FF8F00", "#FFB74D", "#FF8A65", "#66BB6A", "#81C784", "#A5D6A7", "#C8E6C9", "#B39DDB", "#CE93D8", "#E1BEE7",
  "#9C27B0", "#7B1FA2", "#BA68C8", "#CE93D8", "#AB47BC", "#F06292", "#424242", "#757575", "#BDBDBD", "#9E9E9E",
  "#FF5252", "#FF4081", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688",
  "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#607D8B", "#9E9E9E",
];

const COUNTRIES = [
  "US", "Canada", "Japan", "Mexico", "Australia", "India", "China", "Germany", "UK", "Ethiopia",
  "Kenya", "South Africa", "Brazil", "Argentina", "France", "Italy", "Spain", "Russia", "South Korea", "Indonesia",
  "Turkey", "Saudi Arabia", "Poland", "Thailand", "Netherlands", "Belgium", "Sweden", "Switzerland", "Norway", "Denmark",
  "Finland", "Greece", "Portugal", "Czech Republic", "Romania", "Hungary", "Ireland", "New Zealand", "Singapore", "Malaysia",
  "Philippines", "Vietnam", "Bangladesh", "Pakistan", "Egypt", "Nigeria", "Ghana", "Morocco", "Algeria", "Tunisia",
  "Ukraine", "Belarus", "Kazakhstan", "Uzbekistan", "Azerbaijan", "Georgia", "Armenia", "Israel", "United Arab Emirates", "Qatar",
  "Kuwait", "Oman", "Jordan", "Lebanon", "Iraq", "Iran", "Afghanistan", "Nepal", "Sri Lanka", "Myanmar",
  "Cambodia", "Laos", "Mongolia", "North Korea", "Taiwan", "Hong Kong", "Macau", "Chile", "Peru", "Colombia",
  "Venezuela", "Ecuador", "Uruguay", "Paraguay", "Bolivia", "Cuba", "Jamaica", "Haiti", "Dominican Republic", "Costa Rica",
  "Panama", "Guatemala", "Honduras", "El Salvador", "Nicaragua", "Belize", "Trinidad and Tobago", "Barbados", "Bahamas", "Iceland",
];

const generateTrafficData = () =>
  COUNTRIES.map((country) => ({
    country,
    value: Math.floor(Math.random() * 2800) + 100,
  })).sort((a, b) => b.value - a.value);

// ✅ Dropdown
const CustomDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Default");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef} style={{ width: "215px" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white shadow-sm w-full text-left flex items-center justify-between"
        style={{
          fontFamily: "Inter",
          fontSize: "15px",
          height: "50px",
          border: "1px solid #d1d5db",
          borderRadius: "15px",
          padding: "0 16px",
          color: "#718EBF",
          cursor: "pointer",
        }}
      >
        <span>{selectedValue}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg z-50 w-full"
          style={{ border: "1px solid #e5e7eb" }}
        >
          {["Default", "Top 10", "Top 20"].map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelectedValue(option);
                setIsOpen(false);
              }}
              className="px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100"
              style={{
                fontFamily: "Inter",
                fontSize: "15px",
                color: "#374151",
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function TrafficReport({ data }: { data?: { country: string; value: number }[] }) {
  const trafficData = data || generateTrafficData();
  const containerWidth = 1200;
  const chartContentWidth = Math.max(1200, trafficData.length * 60);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <p className="text-gray-700 text-sm" style={{ fontFamily: "Inter" }}>
            This chart shows where our users are accessing Find Me from, based on country-level traffic.
          </p>
        </div>
        <CustomDropdown />
      </div>

      {/* Chart Box */}
      <div className="bg-white shadow-md" style={{ padding: "40px 36px", borderRadius: "35px" }}>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "Inter" }}>
            Traffic Location
          </h2>
        </div>

        {/* Wrapper for scrollable container and axis labels */}
        <div style={{ position: "relative", width: `${containerWidth}px` }}>
          {/* Scrollable chart container */}
          <div
            className="overflow-x-auto overflow-y-visible custom-scrollbar"
            style={{
              width: `${containerWidth}px`,
              scrollbarWidth: "thin",
              scrollbarColor: "#cbd5e1 #f1f5f9",
              maxHeight: "600px",
              outline: "none",
              border: "none",
              paddingBottom: "40px",
            }}
            onMouseDown={(e) => e.preventDefault()}
            onFocus={(e) => e.target.blur()}
            tabIndex={-1}
          >
            <div style={{ minWidth: `${chartContentWidth}px`, outline: "none" }}>
              <div style={{ width: "100%", height: "500px", outline: "none" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={trafficData}
                    // ✅ Bottom gap fix
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                    barCategoryGap={44.13}
                    style={{ outline: "none", border: "none" }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.3} />
                    <XAxis
                      dataKey="country"
                      // ✅ Reduced height
                      height={60}
                      interval={0}
                      axisLine={false}
                      tickLine={false}
                      tick={<CustomXAxisTick />}
                    />
                    <YAxis
                      label={{
                        value: "Number of Users",
                        angle: -90,
                        position: "insideLeft",
                        style: {
                          textAnchor: "center",
                          fontSize: "12px",
                          fill: "#1e293b",
                          fontFamily: "Inter",
                        },
                      }}
                      domain={[0, 3000]}
                      ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000]}
                      tick={{ fontSize: 10, fill: "#1e293b", fontFamily: "Inter" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value}`, "Users"]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        padding: "8px",
                        fontFamily: "Inter",
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                      {trafficData.map((entry, index) => {
                        const colorIndex = COUNTRIES.indexOf(entry.country);
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={COUNTRY_COLORS[colorIndex % COUNTRY_COLORS.length]}
                            stroke="none"
                          />
                        );
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* X-axis label - "Country" aligned with 1200px container */}
          <div
            className="text-gray-600"
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              width: `${containerWidth}px`,
              fontFamily: "Inter",
              fontSize: "12px",
              textAlign: "center",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <p>Country</p>
          </div>

          {/* Year label - aligned with 1200px container, above scrollbar */}
          <div
            className="text-gray-600"
            style={{
              position: "absolute",
              bottom: "2px",
              left: "50%",
              transform: "translateX(-50%)",
              width: `${containerWidth}px`,
              fontFamily: "Inter",
              fontSize: "10px",
              textAlign: "center",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <p>Year 2025-2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

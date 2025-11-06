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
          dy={5}
          textAnchor="middle"
          fill="#1e293b"
          fontSize={14}
          fontFamily="Inter"
        >
          {firstLine}
        </text>
        <text
          x={0}
          y={0}
          dy={18}
          textAnchor="middle"
          fill="#1e293b"
          fontSize={14}
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
      dy={12}
      textAnchor="middle"
      fill="#1e293b"
      fontSize={14}
      fontFamily="Inter"
    >
      {value}
    </text>
  );
};

// Custom Y-axis tick component with pointer and number positioned to the left
const CustomYAxisTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1={0} y1={0} x2={5} y2={0} stroke="#94a3b8" strokeWidth={0.5} />
      <text
        x={0}
        y={0}
        dx={-5}
        dy={4}
        textAnchor="end"
        fill="#1e293b"
        fontSize={10}
        fontFamily="Inter"
      >
        {payload.value}
      </text>
    </g>
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
  }));

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
    <div className="relative" ref={dropdownRef} style={{ width: "180px" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white shadow-sm w-full text-left flex items-center justify-between"
        style={{
          fontFamily: "Inter",
          fontSize: "14px",
          height: "42px",
          border: "1px solid #d1d5db",
          borderRadius: "12px",
          padding: "0 14px",
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
  const containerWidth = 1000;
  const chartContentWidth = Math.max(1000, trafficData.length * 100);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <p className="text-gray-700 text-sm lg:text-base" style={{ fontFamily: "Inter" }}>
              This chart shows where our users are accessing Find Me from, based on country-level traffic.
            </p>
          </div>
          <CustomDropdown />
        </div>
      </div>

      {/* Chart Box */}
      <div className="bg-white shadow-md rounded-[35px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-5 sm:py-6 lg:py-8">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "Inter", fontSize: "18px" }}>
            Traffic Location
          </h2>
        </div>

        {/* Wrapper for scrollable container and axis labels */}
        <div className="w-full lg:w-auto" style={{ position: "relative", maxWidth: `${containerWidth}px`, margin: "0 auto" }}>
          {/* Scrollable chart container */}
          <div
            className="overflow-x-auto overflow-y-visible custom-scrollbar w-full lg:w-auto"
            style={{
              width: "100%",
              maxWidth: `${containerWidth}px`,
              scrollbarWidth: "thin",
              scrollbarColor: "#cbd5e1 #f1f5f9",
              maxHeight: "600px",
              outline: "none",
              border: "none",
              paddingBottom: "8px",
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
                    barCategoryGap={30}
                    style={{ outline: "none", border: "none" }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.3} vertical={false} horizontal={false} />
                    <XAxis
                      dataKey="country"
                      // ✅ Reduced height
                      height={60}
                      interval={0}
                      axisLine={{ stroke: "#cbd5e1", strokeDasharray: "3 3", strokeOpacity: 0.6 }}
                      tickLine={{ stroke: "#94a3b8", strokeWidth: 0.5 }}
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
                          fill: "#94a3b8",
                          fontFamily: "Inter",
                        },
                      }}
                      domain={[-50, 3000]}
                      ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000]}
                      tick={<CustomYAxisTick />}
                      axisLine={{ stroke: "#cbd5e1", strokeDasharray: "3 3", strokeOpacity: 0.6 }}
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

          {/* X-axis label - "Year 2025-2026" aligned with container, styled like Y-axis */}
          <div
            className="w-full lg:w-auto"
            style={{
              position: "absolute",
              bottom: "25px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: `${containerWidth}px`,
              fontFamily: "Inter",
              fontSize: "12px",
              textAlign: "center",
              color: "#94a3b8",
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

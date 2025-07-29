"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { country: "US", value: 300 },
  { country: "Canada", value: 180 },
  { country: "Japan", value: 220 },
  { country: "India", value: 400 },
  { country: "Mexico", value: 250 },
  { country: "Australia", value: 180 },
];

const COLORS = [
  "#2563EB", 
  "#3B82F6",
  "#60A5FA",
  "#93C5FD",
  "#BFDBFE",
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-1 border border-gray-300 rounded shadow text-sm text-gray-800">
        {label}: {payload[0].value}
      </div>
    );
  }
  return null;
};

export const TrafficBarChart = () => (
  <div className="bg-white">
    <ResponsiveContainer width="100%" height={210}>
      <BarChart data={data} barSize={28}>
        <XAxis
          dataKey="country"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#1e293b", fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} stroke="none">
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" fillOpacity={1}/>
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

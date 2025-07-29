"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jul", all: 1, instagram: 0.5, linkedin: 0.3, website: 0.1 },
  { month: "Aug", all: 10, instagram: 4, linkedin: 2, website: 1 },
  { month: "Sep", all: 80, instagram: 40, linkedin: 20, website: 10 },
  { month: "Oct", all: 500, instagram: 200, linkedin: 100, website: 50 },
  { month: "Nov", all: 20, instagram: 10, linkedin: 5, website: 3 },
  { month: "Dec", all: 100, instagram: 50, linkedin: 20, website: 10 },
  { month: "Jan", all: 200, instagram: 100, linkedin: 40, website: 20 },
];

export default function SocialMediaChart() {
  return (
    <div className="bg-[#eaf0fa] rounded-2xl p-6 shadow border border-blue-100">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Social Media Engagement</h2>

      <div className="flex gap-6 text-sm font-medium text-gray-600 mb-2">
        <span className="flex items-center gap-1">
          <span className="w-4 h-0.5 bg-black" /> All
        </span>
        <span className="flex items-center gap-1 text-purple-500">
          <span className="w-4 h-0.5 bg-yellow-700" /> Instagram
        </span>
        <span className="flex items-center gap-1 text-blue-700">
          <span className="w-4 h-0.5 bg-purple-500" /> LinkedIn
        </span>
        <span className="flex items-center gap-1 text-yellow-400">
          <span className="w-4 h-0.5 bg-blue-400" /> Visit to Website
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: -10 }}>
          <defs>
            <linearGradient id="visit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000000" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#000000" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="insta" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="linked" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="visit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#facc15" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e7ff" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            scale="log"
            domain={[1, 1000]}
            tick={{ fill: "#64748b", fontSize: 12 }}
            tickFormatter={(val) => val.toString()}
            axisLine={false}
            tickLine={false}
            label={{ value: "Visitor Numbers", angle: -90, position: "insideLeft", offset: 10, fill: "#64748b" }}
          />

          <Tooltip />

          <Area type="monotone" dataKey="website" stroke="#facc15" fillOpacity={1} fill="url(#visit)" strokeWidth={2} />
          <Area type="monotone" dataKey="instagram" stroke="#a855f7" fillOpacity={1} fill="url(#insta)" strokeWidth={2} />
          <Area type="monotone" dataKey="linkedin" stroke="#1d4ed8" fillOpacity={1} fill="url(#linked)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>

      <div className="text-sm text-center text-gray-500 mt-4">2024 - 2025 YEAR</div>
    </div>
  );
}
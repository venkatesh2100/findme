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
  { month: "Jul", newUser: 10, activeUser: 5, downloadApp: 12 },
  { month: "Aug", newUser: 30, activeUser: 15, downloadApp: 35 },
  { month: "Sep", newUser: 60, activeUser: 25, downloadApp: 80 },
  { month: "Oct", newUser: 150, activeUser: 50, downloadApp: 200 },
  { month: "Nov", newUser: 40, activeUser: 20, downloadApp: 60 },
  { month: "Dec", newUser: 90, activeUser: 40, downloadApp: 110 },
  { month: "Jan", newUser: 130, activeUser: 60, downloadApp: 170 },
];

export default function EngagementChart() {
  return (
    <div className="bg-[#eaf0fa] rounded-xl p-6 shadow-inner border border-blue-200">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">User Engagement</h2>
      <div className="flex gap-6 mb-2 pl-2 text-sm font-medium">
        <span className="flex items-center gap-2 text-purple-700">
          <span className="w-3 h-1 bg-purple-700" /> New User
        </span>
        <span className="flex items-center gap-2 text-blue-700">
          <span className="w-3 h-1 bg-blue-700" /> Active User
        </span>
        <span className="flex items-center gap-2 text-yellow-400">
          <span className="w-3 h-1 bg-yellow-400" /> Download App
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
          <defs>
            <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1e40af" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#1e40af" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorDownload" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#facc15" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "#4b5563", fontSize: 12 }} />
          <YAxis
            scale="log"
            domain={[1, 1000]}
            tick={{ fill: "#4b5563", fontSize: 12 }}
            tickFormatter={(value) => (value >= 1000 ? "1000" : value.toString())}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="downloadApp"
            stroke="#facc15"
            fillOpacity={1}
            fill="url(#colorDownload)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="newUser"
            stroke="#a855f7"
            fillOpacity={1}
            fill="url(#colorNew)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="activeUser"
            stroke="#1e40af"
            fillOpacity={1}
            fill="url(#colorActive)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="text-sm text-center text-gray-500 mt-4">2024 - 2025 YEAR</div>
    </div>
  );
}

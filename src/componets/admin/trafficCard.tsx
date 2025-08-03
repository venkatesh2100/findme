"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"];

interface TrafficData {
  country: string;
  value: number;
}


export const TrafficBarChart = ({ data }: { data: TrafficData[] }) => {
  if (!data || data.length === 0) {
    return <div className="text-sm text-gray-500">No traffic data available</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <ResponsiveContainer width="100%" height={210}>
        <BarChart data={data} barSize={28}>
          <XAxis
            dataKey="country"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#1e293b", fontSize: 12 }}
          />
          <Tooltip  />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

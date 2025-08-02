'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Personal', value: 900 },
  { name: 'Academic', value: 700 },
  { name: 'Corporate', value: 600 },
  { name: 'Business', value: 500 },
  { name: 'Matrimonial', value: 400 },
  { name: 'Creative', value: 300 },
  { name: 'Volunteer', value: 250 },
  { name: 'Lifestyle', value: 200 },
  { name: 'Professional', value: 150 },
];

const COLORS = [
  '#1E3A8A', // blue-900
  '#1D4ED8', 
  '#2563EB',
  '#3B82F6',
  '#60A5FA',
  '#93C5FD',
  '#BFDBFE', // blue-300
  '#DBEAFE', // blue-200
  '#EFF6FF', // blue-100
];

export const PortfolioDonutChart = () => (
  <div className="bg-white shadow-md rounded-xl p-4">
    {/* Header with title and SVG icon */}
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold">User Create Portfolio Types</h3>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
        />
      </svg>
    </div>

    {/* Chart Content */}
    <div className="flex flex-col md:flex-row items-center justify-center">
      {/* Left Side: Legend */}
      <ul className="text-sm text-gray-700 space-y-2 md:mr-6">
        {data.map((item, index) => (
          <li key={item.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {item.name}
            <span className="ml-auto text-gray-400 hidden md:inline">• Users</span>
          </li>
        ))}
      </ul>

      {/* Right Side: Donut Chart */}
      <div className="relative w-60 h-60">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              dataKey="value"
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">50,000</span>
          <span className="text-sm text-gray-500">Total Portfolio Users</span>
        </div>
      </div>
    </div>
  </div>
);

export default PortfolioDonutChart;
import React from "react";
export default function DashboardOverview() {
  const COLORS = {
    text: "#000000",
    textDark: "#1A1A1A",
    subText: "#666666",
    border: "#CCCCCC",
    blue: "#4290F9",
    green: "#22C55E",
    red: "#EF4444",
    textGray: "#666666",
  };
  const adsData = [
    {
      platform: "Google Ads",
      spend: "$2.5k",
      progress: 30,
      conversions: 225,
      cost: "$13.44",
      statusColor: "green",
    },
    {
      platform: "Facebook",
      spend: "$4.2k",
      progress: 51,
      conversions: 105,
      cost: "$40.44",
      statusColor: "red",
    },
    {
      platform: "Instagram",
      spend: "$1.5k",
      progress: 18,
      conversions: 125,
      cost: "$13.44",
      statusColor: "green",
    },
  ];

  return (
    <div className="min-h-screen px-8 py-6 font-sans">
      {/* Title */}
      <h1 className="text-[22px] font-bold mb-8">Overview</h1>

      {/* Top Stats */}
      <div className="flex gap-4 ">
        {[
          { label: "User Feedback", value: "3,671" },
          { label: "Ticket Submit", value: "100" },
          { label: "Ticket Closed", value: "50" },
          { label: "Teams", value: "50" },
          { label: "Admin", value: "2" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow p-4 px-8  text-left"
          >
            <p className="text-gray-600 text-sm">{item.label}</p>
            <p className="text-[22px] font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* User Verification */}
      {/* User Verification */}
      <h2 className="text-[15px] font-bold mt-10 mb-4">User Verification</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Requests Pending */}
        <div className="rounded-lg shadow p-4 bg-gradient-to-br from-pink-50 to-white">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[13px] font-semibold text-gray-800">
              Requests Pending
            </h3>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-[22px] font-semibold mb-3">25</p>
            <button className="flex items-center gap-1 text-white bg-black px-3 py-0.5 rounded-full text-xs hover:bg-gray-800 transition">
              Expand
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                />
              </svg>
            </button>
          </div>
          <table className="w-full text-sm border text-center  border-gray-300">
            <tbody>
              <tr className="border-t border-b border-gray-300">
                <td className="py-2 border-r border-gray-300">Sam Owens</td>
                <td className="py-2 border-r border-gray-300">samowens678</td>
                <td className="py-2">Submitted 5 min ago</td>
              </tr>
              <tr className="border-t border-b border-gray-300">
                <td className="py-2 border-r border-gray-300">John Doe</td>
                <td className="py-2 border-r border-gray-300">johndoe0000</td>
                <td className="py-2">Submitted 15 min ago</td>
              </tr>
              <tr className="border-t border-b border-gray-300">
                <td className="py-2 border-r border-gray-300">Jane Smith</td>
                <td className="py-2 border-r border-gray-300">janesmith1234</td>
                <td className="py-2">Submitted 1 hr ago</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Requests Completed */}
        <div className="rounded-lg shadow p-4 bg-gradient-to-br from-pink-50 to-white">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[13px] font-semibold text-gray-800">
              Requests Completed
            </h3>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-[22px] font-semibold mb-3">578</p>
            <button className="flex items-center gap-1 text-white bg-black px-3 py-0.5 rounded-full text-xs hover:bg-gray-800 transition">
              Expand
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                />
              </svg>
            </button>
          </div>
          <table className="w-full text-sm border text-center border-gray-300">
            <tbody>
              <tr className="border-t border-b border-gray-300">
                <td className="py-2 border-r border-gray-300 flex items-center justify-center">
                  <svg className="w-2 h-2 mr-1" viewBox="0 0 10 10">
                    <circle cx="5" cy="5" r="5" fill="#10B981" /> {/* Green */}
                  </svg>
                  Alice Brown
                </td>{" "}
                <td className="py-2 border-r border-gray-300">
                  alicebrown2000
                </td>
                <td className="py-2">Submitted 5 min ago</td>
              </tr>
              <tr className="border-t border-b border-gray-300">
                <td className="py-2 border-r border-gray-300 flex items-center justify-center">
                  <svg className="w-2 h-2 mr-1" viewBox="0 0 10 10">
                    <circle cx="5" cy="5" r="5" fill="#EF4444" />
                  </svg>
                  Bob Martin
                </td>{" "}
                <td className="py-2 border-r border-gray-300">robertsmith99</td>
                <td className="py-2">Submitted 15 min ago</td>
              </tr>
              <tr className="border-t border-b border-gray-300">
                <td className="py-2 border-r border-gray-300 flex items-center justify-center">
                  <svg className="w-2 h-2 mr-1" viewBox="0 0 10 10">
                    <circle cx="5" cy="5" r="5" fill="#10B981" />
                  </svg>
                  Emma James
                </td>{" "}
                <td className="py-2 border-r border-gray-300">emmajames543</td>
                <td className="py-2">Submitted 1 hr ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Promotions Management */}
      <h2 className="text-[15px]  font-bold mt-20 mb-4">
        Promotions Management
      </h2>
      <div className="flex  gap-4">
        {[
          { label: "Ongoing Promotions", value: "2" },
          { label: "Upcoming Promotions", value: "3" },
          { label: "Past Promotions", value: "56" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow p-4 px-10 text-left"
          >
            <p className="text-gray-600 text-sm">{item.label}</p>
            <p className="text-[22px] font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-lg shadow p-4 mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[13px] font-semibold text-gray-800">
            Performance Summary
          </h3>
          <div className="flex gap-2">
            <button className="bg-black text-white text-xs px-3 py-1 rounded-full shadow">
              Expand
            </button>
            <button className="bg-black text-white text-xs px-3 py-1 rounded-full shadow">
              ⌕
            </button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300  text-left">
              <th className="py-2">Title</th>
              <th className="py-2">Status</th>
              <th className="py-2">Conversions Rate</th>
              <th className="py-2">Clicks/Last 24 Hours</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-300">
              <td className="py-2">Buy 1 Get 1 Free</td>
              <td className="py-2 ">Expires 3 days</td>
              <td className="py-2">22%</td>
              <td className="py-2">1,240</td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="py-2">30% off Selected Items</td>
              <td className="py-2 ">Expires 1 day</td>
              <td className="py-2">19%</td>
              <td className="py-2">1,090</td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="py-2">Black Friday Sale</td>
              <td className="py-2 ">Expired 1 week</td>
              <td className="py-2">25%</td>
              <td className="py-2">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Advertisements Management */}
      <h2 className="text-[20px] font-semibold mt-10 mb-4"> Advertisements Management </h2>
      <div className="w-full grid grid-cols-3 gap-[37px]">
        {adsData.map((item, idx) => (
          <div
            key={idx}
            className="
              bg-white rounded-[20px] border
              flex flex-col justify-start items-start
              p-4 shadow-sm
            "
            style={{ borderColor: COLORS.border }}
          >
            {/* Platform Name */}
            <p
              className="text-[13px] font-normal"
              style={{ color: COLORS.textGray }}
            >
              {item.platform}
            </p>

            {/* Spend */}
            <p
              className="text-[24px] font-semibold"
              style={{ color: COLORS.textDark }}
            >
              {item.spend}
            </p>

            {/* Spend Label */}
            <p className="text-[12px]" style={{ color: COLORS.subText }}>
              Spend this month
            </p>

            {/* Progress Bar */}
            <div className="w-full mt-2">
              <div className="w-full bg-gray-200 h-[4px] rounded-full">
                <div
                  className="h-[4px] bg-[#4290F9] rounded-full"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>

            {/* % Total Spending */}
            <p className="text-[12px] mt-1" style={{ color: COLORS.subText }}>
              {item.progress}% Total Spending
            </p>

            {/* Conversions */}
            <p
              className="text-[20px] font-semibold mt-2"
              style={{ color: COLORS.textDark }}
            >
              {item.conversions}
            </p>
            <p className="text-[12px]" style={{ color: COLORS.subText }}>
              Conversions
            </p>

            {/* Cost per Conversion */}
            <div className="flex items-center gap-1 mt-2">
              <p
                className="text-[16px] font-semibold"
                style={{ color: COLORS.textDark }}
              >
                {item.cost}
              </p>
              <img
                src={item.statusColor === "green" ? "/Ellipse 1114.svg" : "/Ellipse 1114 (1).svg"}
                alt="status-dot"
                className="w-[10px] h-[10px]"
              />
            </div>

            <p className="text-[12px]" style={{ color: COLORS.subText }}>
              Cost per conversion
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

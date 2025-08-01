import { useState } from "react";
import { ChartCard } from "./chartCard";
import EngagementChart from "./engagementCard";
import PortfolioDonutChart from "./portflioDonut";
import SocialMediaChart from "./socialMediua";
import { StatCard } from "./statCard";
import { TrafficBarChart } from "./trafficCard";
import UserDataFilters from "./userBar";

export default function Overview() {
    const [timeFrame, setTimeFrame] = useState("yearly");
      const [activeTab, setActiveTab] = useState("overview");


  return(
 <div>
    <div className="flex mt-4 mb-2 ">
      <h1 className=" text-3xl font-bold mb-2 pr-20">Overview</h1>
      <div className="flex gap-3 text-sm text-gray-600">
        {["daily", "weekly", "monthly", "yearly and Till Date"].map(
          (time, idx, arr) => (
            <span key={time} className="flex items-center gap-1">
              <button
                className={`${
                  timeFrame === time ? "text-blue-600 font-semibold" : ""
                }`}
                onClick={() => setTimeFrame(time)}
              >
                {time.charAt(0).toUpperCase() + time.slice(1)}
              </button>
              {idx < arr.length - 1 && <span className="text-gray-400">|</span>}
            </span>
          )
        )}
      </div>
    </div>

    {/* Full-width black underline */}
    <div className="w-full border-b-2 border-black mt-2 mb-6"></div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard title="New Users" value="100" change="+15.03%" />
      <StatCard title="Active Users" value="3,318" change="+6.03%" />
      <StatCard title="Total Profiles" value="3,318" change="+6.03%" />
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <ChartCard title="Traffic Location">
        <TrafficBarChart />
        <p className="text-blue-600 pl-94 pt-4 text-sm mt-2 cursor-pointer hover:underline">
          View More Report
        </p>
      </ChartCard>

      {/* <ChartCard title="User Create Portfolio Types" > */}

      <PortfolioDonutChart />
      {/* </ChartCard> */}
    </div>

    {/* Engagement Section */}
    <UserDataFilters />
    <div>
      <EngagementChart />
    </div>

    {/* Social Media Section */}
    <div className="border-b border-gray-200 pb-2 mt-8 flex gap-4 text-sm">
      <button
        className={`${
          activeTab === "marketing"
            ? "text-blue-600 font-bold"
            : "text-gray-600"
        }`}
        onClick={() => setActiveTab("marketing")}
      >
        Marketing
      </button>
      <span className="font-bold text-blue-600">Weekly</span>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 my-6">
      {[
        "Social Events",
        "Visits LinkedIn",
        "Visits Instagram",
        "Visits Website",
        "Download App",
      ].map((title, i) => (
        <StatCard key={i} title={title} value="3,671" change="-0.03%" />
      ))}
    </div>

    <UserDataFilters />
    <div>
      <SocialMediaChart />
    </div>
  </div>
  )

}

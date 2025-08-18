// app/feedback/page.tsx
"use client";

import { Maximize2, Filter } from "lucide-react";

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-[#EAF2FA] px-8 py-6 font-sans">
      {/* Top Nav */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">User Feedback</h1>
        <div className="flex gap-6 mt-1 text-sm">
          <a
            href="#"
            className="text-[#2E6FF2] font-medium border-b-2 border-[#2E6FF2] pb-1"
          >
            User Feedback
          </a>
          <a href="#" className="text-gray-600 hover:text-[#2E6FF2]">
            Support Ticket
          </a>
          <a href="#" className="text-gray-600 hover:text-[#2E6FF2]">
            Response Tracker
          </a>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-hidden p-2">
        <div className="p-4 flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">
            List of User Feedback
          </h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 bg-black text-white text-xs px-3 py-1 rounded-full shadow-sm">
              <span>Expand</span>
              <Maximize2 size={14} />
            </button>
            <button className="bg-black text-white p-2 rounded-full shadow-sm">
              <Filter size={14} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto p-2">
          <table className="w-full text-sm">
            <thead className="bg-[#F9FAFB] text-gray-600">
              <tr>
                <th className="p-3 text-left font-medium">UserName</th>
                <th className="p-3 text-left font-medium">Platform</th>
                <th className="p-3 text-left font-medium">Comment</th>
                <th className="p-3 text-left font-medium">Date Submission</th>
                <th className="p-3 text-left font-medium">Solved</th>
                <th className="p-3 text-left font-medium">Close Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Row 1 */}
              <tr className="hover:bg-gray-50">
                <td className="p-3 flex items-center gap-2">
                  <img
                    src="https://i.pravatar.cc/40?img=1"
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  John Smith
                </td>
                <td className="p-3">Web</td>
                <td className="p-3 text-[#2E6FF2] cursor-pointer">Read</td>
                <td className="p-3">1/2/24</td>
                <td className="p-3">✔</td>
                <td className="p-3">2/2/24</td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-gray-50">
                <td className="p-3 flex items-center gap-2">
                  <img
                    src="https://i.pravatar.cc/40?img=2"
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  Jolie Hoskins
                </td>
                <td className="p-3">Web</td>
                <td className="p-3 text-[#2E6FF2] font-semibold cursor-pointer">
                  Unread
                </td>
                <td className="p-3">2/3/25</td>
                <td className="p-3"></td>
                <td className="p-3"></td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-gray-50">
                <td className="p-3 flex items-center gap-2">
                  <img
                    src="https://i.pravatar.cc/40?img=3"
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  Pennington Joy
                </td>
                <td className="p-3">App</td>
                <td className="p-3 text-[#2E6FF2] font-semibold cursor-pointer">
                  Unread
                </td>
                <td className="p-3">4/11/24</td>
                <td className="p-3">✔</td>
                <td className="p-3">5/11/24</td>
              </tr>
              {/* Row 4 */}
              <tr className="hover:bg-gray-50">
                <td className="p-3 flex items-center gap-2">
                  <img
                    src="https://i.pravatar.cc/40?img=4"
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  Millie Marsden
                </td>
                <td className="p-3">Web</td>
                <td className="p-3 text-[#2E6FF2] font-semibold cursor-pointer">
                  Unread
                </td>
                <td className="p-3">5/10/25</td>
                <td className="p-3"></td>
                <td className="p-3"></td>
              </tr>
              {/* Row 5 */}
              <tr className="hover:bg-gray-50">
                <td className="p-3 flex items-center gap-2">
                  <img
                    src="https://i.pravatar.cc/40?img=5"
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                  John Smith
                </td>
                <td className="p-3">App</td>
                <td className="p-3 text-[#2E6FF2] cursor-pointer">Read</td>
                <td className="p-3">10/2/25</td>
                <td className="p-3"></td>
                <td className="p-3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Detail Section */}
   <div className="mt-6 bg-white shadow-md h-[28rem] rounded-2xl p-2">
  <div className="p-6">
    <h2 className="font-semibold text-gray-800 mb-6 text-lg">
      Over View of Comments from User
    </h2>

    <div className="space-y-4 text-gray-500 text-md">
      <p><span className="font-medium">Name:</span> </p>
      <p><span className="font-medium">Platform:</span> </p>
      <p><span className="font-medium">Date Submission:</span> </p>
      <p><span className="font-medium">Close Date:</span> </p>
      <p><span className="font-medium">File and Attachment:</span> </p>
      <p><span className="font-medium">Comment:</span></p>
    </div>

    <div className="flex gap-4 mt-16 justify-end">
      <button className="bg-[#1A4BB5] hover:bg-[#153d91] text-white px-6 py-2 rounded-lg shadow-sm font-medium transition">
        Solve
      </button>
      <button className="bg-[#EAF2FA] hover:bg-[#d6e6f8] text-[#1A4BB5] px-6 py-2 rounded-lg shadow-sm font-medium transition">
        Close
      </button>
      <button className="border border-gray-400 hover:bg-gray-100 px-6 py-2 rounded-lg shadow-sm text-gray-700 font-medium transition">
        Read Next Comment
      </button>
    </div>
  </div>
</div>


      <div className="mt-4 text-right text-[#2E6FF2] text-sm font-medium">
        <a href="#">Next Support Ticket Page →</a>
      </div>
    </div>
  );
}

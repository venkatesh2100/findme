import { useState } from "react";

interface AdminList {
  name: string;
  email: string;
  status: boolean;
  phoneNumber: string;
  role: string;
  admin: string;
  username: string;
}
export default function AdminMembersList() {
  const members: AdminList[] = [
    {
      name: "Sam",
      email: "Admin25@email.com",
      status: true,
      admin: "Admin 1",
      phoneNumber: "101-203-2939",
      role: "Admin",
      username: "Sam123",
    },
    {
      name: "Tom",
      email: "Admin225@gmail.com",
      status: true,
      admin: "Admin 2",
      phoneNumber: "101-203-3322",
      role: "Admin",
      username: "Tom123",
    },
  ];

  const [selectedEmail, setSelectedEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<AdminList | null>(null);
  const [adminStatus, setAdminStatus] = useState(Boolean);
  const handleResetClick = (email: string) => {
    setSelectedEmail(email);
    setShowPopup(true);
  };

  const handelClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowPopup(false);
    }
  };

  const handelAdminSelect = (Ticket: AdminList) => {
    setAdminStatus(Ticket.status);
    setSelectedTicket(Ticket)
  };
  return (
    <div className="relative">
      <div className=" bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          List of Admin Members
        </h2>
        <a href="#" className="text-sm underline mb-8 mx-3 inline-block">
          All Members
        </a>

        <table className="w-full">
          <thead>
            <tr className="bg-[#F8F9FA] border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Member Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                status
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Admin
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                Reset Password
              </th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr
                key={index}
                onClick={()=>handelAdminSelect(member)}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-[#F8F9FA]"
                }
                ${
                  member.username === selectedTicket?.username
                    ? "border-l-4 border-blue-400"
                    : ""
                }
                `}
              >
                <td className="py-4 px-4 text-sm text-gray-900">
                  {member.name}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  {member.email}
                </td>
                <td className="py-4 px-4">
                  {member.status && (
                    <div className="w-5 h-5 bg-blue-800 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  )}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    {member.status && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    )}
                    <span className="text-sm text-gray-600">
                      {member.admin}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => handleResetClick(member.email)}
                    className="text-sm text-blue-600 underline"
                  >
                    Link
                  </button>
                </td>
                <td
                onClick={()=>window.location.reload()}

                className="py-4 px-4">
                  <button className="bg-gray-900 text-white px-6 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-800">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex items-center justify-end font-semibold text-[#666666]">
          <button className="flex items-center text-sm hover:text-gray-900">
            <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center mr-2">
              <span className="text-lg leading-none">+</span>
            </div>
            Add Admin Member
          </button>
        </div>
      </div>

      {/* overview of Admin  */}
      {selectedTicket && (
        <>
          <div className="mt-6 bg-white shadow-md rounded-2xl p-2">
            <div className="p-6">
              <h2 className="font-semibold text-gray-800 mb-6 text-lg">
                Over View of Admin
              </h2>
              <div className="space-y-4 text-gray-500 text-md">
                <div>
                  <span className="font-medium mr-1">Full Name:</span>
                  {selectedTicket.name}
                </div>
                  <div>
                  <span className="font-medium mr-1">Email address:</span>
                  {selectedTicket.email}
                </div>
                  <div>
                  <span className="font-medium mr-1">Phone number:</span>
                  {selectedTicket.phoneNumber}
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <select
                    value={adminStatus ? "Active" : "InActive"}
                    onChange={(e) =>
                      setAdminStatus(e.target.value === "Active")
                    }
                    className="ml-2 border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value="Active">Active</option>
                    <option value="InActive">InActive</option>
                  </select>
                </div>
                  <div>
                  <span className="font-medium mr-1">Role:</span>
                  {selectedTicket.role}
                </div>
                  <div>
                  <span className="font-medium mr-1">Username:</span>
                  {selectedTicket.username}
                </div>
              </div>
              <div className="flex gap-4 mt-16 justify-end">
                <button className="bg-[#1A4BB5] hover:bg-[#153d91] text-white px-6 py-2 rounded-lg shadow-sm font-medium transition">
                  Save
                </button>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="bg-[#EAF2FA] hover:bg-[#d6e6f8] text-[#1A4BB5] px-6 py-2 rounded-lg shadow-sm font-medium transition"
                >
                  Close
                </button>
                <button className="border bg-[#1B1B1B]  px-6 py-2 rounded-lg shadow-sm text-gray-100 font-medium transition">
                  Next Admin
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 text-right text-[#2E6FF2] text-sm font-medium">
            <a href="#" className="hover:underline">
              Next Setting Page →
            </a>
          </div>
        </>
      )}
      {/* --- Popup Modal --- */}
      {showPopup && (
        <div
          onClick={handelClose}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div className="bg-white w-[600px] mt-40 rounded-md shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Reset password</h3>
            </div>
            <div className="px-6 py-6 text-gray-600 text-center">
              Reset password link has been sent to{" "}
              <span className="font-semibold text-gray-900">
                {selectedEmail}
              </span>
            </div>
            <button
              onClick={() => alert("Resend clicked")}
              className="w-full bg-[#0573E9] text-white py-3 font-semibold  transition"
            >
              Resend link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

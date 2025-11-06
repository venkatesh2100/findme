import { useState } from "react";

export default function AdminMembersList() {
  const members = [
    { name: "Sam", email: "Admin25@email.com", active: true, admin: "Admin 1" },
    { name: "Tom", email: "Admin225@gmail.com", active: true, admin: "Admin 2" },
  ];

  const [selectedEmail, setSelectedEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleResetClick = (email:string) => {
    setSelectedEmail(email);
    setShowPopup(true);
  };

  const handelClose =(e: React.MouseEvent<HTMLDivElement>)=>{
    if(e.target === e.currentTarget){
      setShowPopup(false);
    }
  }
  return (
    <div className="min-h-screen mx-4 relative">
      <div className="max-w-4xl bg-white rounded-lg shadow-sm p-6">
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
                Active
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
                className={`border-b border-gray-100 ${
                  index % 2 === 0 ? "bg-white" : "bg-[#F8F9FA]"
                }`}
              >
                <td className="py-4 px-4 text-sm text-gray-900">{member.name}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{member.email}</td>
                <td className="py-4 px-4">
                  {member.active && (
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
                    {member.active && (
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
                    <span className="text-sm text-gray-600">{member.admin}</span>
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
                <td className="py-4 px-4">
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

      {/* --- Popup Modal --- */}
      {showPopup && (
        <div
        onClick={handelClose}
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[600px] mt-40 rounded-md shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Reset password</h3>
            </div>
            <div className="px-6 py-6 text-gray-600 text-center">
              Reset password link has been sent to{" "}
              <span className="font-semibold text-gray-900">{selectedEmail}</span>
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

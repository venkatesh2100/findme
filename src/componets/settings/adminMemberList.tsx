import { FiCheck } from "react-icons/fi";
import Image from "next/image";
export default function AdminMembersList() {
  const members = [
    { name: "Sam", email: "Admin25@email.com", active: true, admin: "Admin 1" },
    {
      name: "Tom",
      email: "Admin225@gmail.com",
      active: true,
      admin: "Admin 2",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="font-semibold text-base mb-2">List of Admin Members</h2>
      <a href="#" className="text-sm text-blue-600 underline block mb-4">
        All Members
      </a>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Member Name
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Email
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Active
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Admin
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : "bg-white"}>
              <td className="py-3 px-4">{m.name}</td>
              <td className="py-3 px-4">{m.email}</td>
              <td className="py-3 px-4">
                {m.active && (
                  <Image src={"/check.png"} width={24} height={24} alt="c"/>
                  // <FiCheck className="text-blue-600 bg-blue-100 rounded-full p-0.5 inline-block w-5 h-5" />
                )}
              </td>
              <td className="py-3 px-4 flex items-center">
                {m.active && (
                  <FiCheck className="text-white bg-blue-600 rounded-full p-1 inline-block w-5 h-5 mr-2" />
                )}
                {m.admin}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

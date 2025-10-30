
export default function AllTicket({ isMaximized}: { isMaximized: boolean }) {
  const tickets = [
    {
      id: "#2222",
      name: "John Smith",
      submission: "1/2/24",
      view: "Read",
      assigned: "Sam",
      close: "2/2/24",
      time: "60 hr",
      status: "Closed",
    },
    {
      id: "#3333",
      name: "Jolie Hoskins",
      submission: "2/3/25",
      view: "Unread",
      assigned: "Sam",
      close: "-",
      time: "0 min",
      status: "Open",
    },
    {
      id: "#4444",
      name: "Pennington Joy",
      submission: "4/11/24",
      view: "Read",
      assigned: "Sam",
      close: "5/11/24",
      time: "60 hr",
      status: "Closed",
    },
    {
      id: "#5555",
      name: "Millie Marsden",
      submission: "5/10/25",
      view: "Unread",
      assigned: "Sam",
      close: "-",
      time: "0 min",
      status: "Open",
    },
    {
      id: "#6666",
      name: "John Smith",
      submission: "10/2/25",
      view: "Unread",
      assigned: "Sam",
      close: "-",
      time: "0 min",
      status: "Open",
    },
    {
      id: "#7777",
      name: "Sarah Connor",
      submission: "15/3/25",
      view: "Read",
      assigned: "John",
      close: "16/3/25",
      time: "24 hr",
      status: "Closed",
    },
    {
      id: "#8888",
      name: "Mike Johnson",
      submission: "20/4/25",
      view: "Unread",
      assigned: "Emma",
      close: "-",
      time: "0 min",
      status: "Open",
    },
    {
      id: "#9999",
      name: "Lisa Anderson",
      submission: "25/5/25",
      view: "Read",
      assigned: "Sam",
      close: "26/5/25",
      time: "12 hr",
      status: "Closed",
    },
    {
      id: "#1010",
      name: "David Brown",
      submission: "1/6/25",
      view: "Unread",
      assigned: "John",
      close: "-",
      time: "0 min",
      status: "Open",
    },
    {
      id: "#1111",
      name: "Emma Wilson",
      submission: "5/7/25",
      view: "Read",
      assigned: "Emma",
      close: "7/7/25",
      time: "48 hr",
      status: "Closed",
    },
  ];

  const displayTickets = isMaximized ? tickets : tickets.slice(0, 5);

  return (
    <div className="overflow-x-auto mt-4 rounded-xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-[#F9FAFB] text-gray-600 text-[13px]">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Ticket ID</th>
            <th className="px-4 py-3 text-left font-medium">User Name</th>
            <th className="px-4 py-3 text-left font-medium">Date Submission</th>
            <th className="px-4 py-3 text-left font-medium">View</th>
            <th className="px-4 py-3 text-left font-medium">Assigned to</th>
            <th className="px-4 py-3 text-left font-medium">Close Date</th>
            <th className="px-4 py-3 text-left font-medium">Time Spend</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="text-[13px]">
          {displayTickets.map((ticket, index) => (
            <tr
              key={ticket.id}
              className={`transition-colors duration-150 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100`}
            >
              <td className="px-4 py-3">{ticket.id}</td>
              <td className="px-4 py-3">{ticket.name}</td>
              <td className="px-4 py-3">{ticket.submission}</td>
              <td className="px-4 py-3">
                {ticket.view === "Read" ? (
                  <span className="font-medium cursor-pointer">Read</span>
                ) : (
                  <span className="border-b font-semibold cursor-pointer">
                    Unread
                  </span>
                )}
              </td>
              <td className="px-4 py-3">{ticket.assigned}</td>
              <td className="px-4 py-3">{ticket.close}</td>
              <td className="px-4 py-3">{ticket.time}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ticket.status === "Closed"
                      ? "bg-[#D1EFFE] text-[#62B1F4]"
                      : "bg-[#D4EDFB] text-[#2C678A]"
                  }`}
                >
                  {ticket.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

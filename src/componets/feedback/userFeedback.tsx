import { Minimize2, Maximize2, Filter } from "lucide-react";
import FeedbackFilter from "./feedback/feebackFilter";
import AllFeebacks from "./feedback/allFeeback";
import { useState, useMemo } from "react";
interface Feedback {
  id: number;
  name: string;
  avatar: string;
  platform: string;
  comment: string;
  isRead: boolean;
  dateSubmission: string;
  solved: boolean;
  closeDate: string;
}

interface Filters {
  userName: string;
  platform: string[];
  commet: string[];
  status: string[];
}

export default function UserFeedback() {
  const feedbacks: Feedback[] = [
    {
      id: 1,
      name: "John Smith",
      avatar: "https://i.pravatar.cc/40?img=1",
      platform: "Web",
      comment: "Hi I'm Venky",
      isRead: true,
      dateSubmission: "1/2/24",
      solved: true,
      closeDate: "2/2/24",
    },
    {
      id: 2,
      name: "Jolie Hoskins",
      avatar: "https://i.pravatar.cc/40?img=2",
      platform: "Web",
      comment: "Hi I'm Venky",
      isRead: false,
      dateSubmission: "2/3/25",
      solved: false,
      closeDate: "",
    },
    {
      id: 3,
      name: "Pennington Joy",
      avatar: "https://i.pravatar.cc/40?img=3",
      platform: "App",
      comment: "Hi I'm Venky",
      isRead: false,
      dateSubmission: "4/11/24",
      solved: true,
      closeDate: "5/11/24",
    },
    {
      id: 4,
      name: "Millie Marsden",
      avatar: "https://i.pravatar.cc/40?img=4",
      platform: "Web",
      comment: "Hi I'm Venky",
      isRead: false,
      dateSubmission: "5/10/25",
      solved: false,
      closeDate: "",
    },
    {
      id: 5,
      name: "John Smith",
      avatar: "https://i.pravatar.cc/40?img=5",
      platform: "App",
      comment: "Hi I'm Venky",
      isRead: true,
      dateSubmission: "10/2/25",
      solved: false,
      closeDate: "",
    },
    {
      id: 6,
      name: "Sarah Connor",
      avatar: "https://i.pravatar.cc/40?img=6",
      platform: "Web",
      comment: "Hi I'm Venky",
      isRead: false,
      dateSubmission: "15/3/25",
      solved: true,
      closeDate: "16/3/25",
    },
    {
      id: 7,
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/40?img=7",
      platform: "App",
      comment: "Hi I'm Venky",
      isRead: true,
      dateSubmission: "20/4/25",
      solved: false,
      closeDate: "",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      avatar: "https://i.pravatar.cc/40?img=8",
      platform: "Web",
      comment: "Hi I'm Venky",
      isRead: false,
      dateSubmission: "25/5/25",
      solved: true,
      closeDate: "26/5/25",
    },
    {
      id: 9,
      name: "David Brown",
      avatar: "https://i.pravatar.cc/40?img=9",
      platform: "App",
      comment: "Hi I'm Venky",
      isRead: true,
      dateSubmission: "1/6/25",
      solved: false,
      closeDate: "",
    },
    {
      id: 10,
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/40?img=10",
      platform: "Web",
      comment: "Hi I'm Venky",
      isRead: false,
      dateSubmission: "5/7/25",
      solved: true,
      closeDate: "7/7/25",
    },
  ];

  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Feedback | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    userName: "",
    platform: [],
    commet: [],
    status: [],
  });

  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    userName: "",
    platform: [],
    commet: [],
    status: [],
  });

  const handleTicketSelect = (Ticket: Feedback) => {
    setSelectedTicket(Ticket);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const handleClearFilters = () => {
    const emptyFilters: Filters = {
      userName: "",
      platform: [],
      commet: [],
      status: [],
    };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  const filteredTickets = useMemo(() => {
    return feedbacks.filter((ticket) => {
      const matchesUserName =
        appliedFilters.userName === "" ||
        ticket.name
          .toLowerCase()
          .includes(appliedFilters.userName.toLowerCase());
      const matchesPlatform =
        appliedFilters.platform.length === 0 ||
        appliedFilters.platform.includes(ticket.platform);
      const matchesComment =
        appliedFilters.commet.length === 0 ||
        appliedFilters.commet.includes("Read")  ||
        appliedFilters.commet.includes("Unread");
      const matchesStatus =
        appliedFilters.status.length === 0 ||
        (appliedFilters.status.includes("Solved") && ticket.solved) ||
        (appliedFilters.status.includes("Unsolved") && !ticket.solved);

      return (
        matchesUserName && matchesPlatform && matchesComment && matchesStatus
      );
    });
  }, [appliedFilters, feedbacks]);


  return (
    <div>
      <div className="bg-white shadow-md rounded-2xl overflow-hidden p-2">
        <div className="p-4 flex   justify-between items-center">
          <h2 className="font-semibold text-gray-800">List of User Ticket</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="flex items-center gap-1 bg-black text-white text-xs px-3 py-1 rounded-full shadow-sm hover:bg-gray-800 transition"
            >
              <span>{isMaximized ? "Minimize" : "Expand"}</span>
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-black text-white p-2 rounded-full shadow-sm hover:bg-gray-800 transition"
            >
              <Filter size={14} />
            </button>
          </div>
        </div>
        {isFilterOpen && (
          <FeedbackFilter
            filters={filters}
            onFilterChange={setFilters}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />
        )}
           <AllFeebacks
            isMaximized={isMaximized}
            onTicketSelect={handleTicketSelect}
            tickets={filteredTickets}
          />


      </div>

      {!isMaximized && (
        <>
          <div className="mt-6 bg-white shadow-md h-[28rem] rounded-2xl p-2">
            <div className="p-6">
              <h2 className="font-semibold text-gray-800 mb-6 text-lg">
                Over View of Comments from User
              </h2>

              <div className="space-y-4 text-gray-500 text-md">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                </p>
                <p>
                  <span className="font-medium">Platform:</span>{" "}
                </p>
                <p>
                  <span className="font-medium">Date Submission:</span>{" "}
                </p>
                <p>
                  <span className="font-medium">Close Date:</span>{" "}
                </p>
                <p>
                  <span className="font-medium">File and Attachment:</span>{" "}
                </p>
                <p>
                  <span className="font-medium">Comment:</span>
                </p>
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
        </>
      )}
    </div>
  );
}

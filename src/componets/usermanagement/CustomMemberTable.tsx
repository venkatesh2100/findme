"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FiltersPanel from "./FilterPanel";
import HeaderBar from "./header";
import Loading from "../../../packages/ui/loading";

type Filters = {
  portfolioVerification: string[];
  idVerification: string[];
  subscription: string[];
  numberOfPortfolios: (number | string)[];
  sizeLimit: number;
  location: string[];
};

type Member = {
  avatar?: string;
  "Member Name": string;
  Username: string;
  "No. Of Portfolios": string;
  "ID Verification": string;
  "Portfolio Verification": string;
  Location: string;
  "Size (KB)": string;
  Subscription: string;
};

const getBadgeClass = (status: string) => {
  switch (status?.toLowerCase()) {
    case "verified":
      return "bg-[#A4DCFD] text-[#2C678A]";
    case "not verified":
      return "bg-[#093488] text-white";
    case "in progress":
      return "bg-[#D1EFFE] text-[#53A8F3]";
    default:
      return "bg-gray-200 text-black";
  }
};

const CustomMemberTable = () => {
  const [data, setData] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState<Filters>({
    portfolioVerification: [],
    idVerification: [],
    subscription: [],
    numberOfPortfolios: [],
    sizeLimit: 50000,
    location: [],
  });

  const filteredData = data.filter((row) => {
    const usernameMatch =
      searchQuery === "" ||
      row.Username.toLowerCase().includes(searchQuery.toLowerCase());

    const sizeMatch = Number(row["Size (KB)"]) <= filters.sizeLimit;
    const portfolioMatch =
      filters.portfolioVerification.length === 0 ||
      filters.portfolioVerification.includes(row["Portfolio Verification"]);
    const idMatch =
      filters.idVerification.length === 0 ||
      filters.idVerification.includes(row["ID Verification"]);
    const subscriptionMatch =
      filters.subscription.length === 0 ||
      filters.subscription.includes(row.Subscription);
    const portfolioCountMatch =
      filters.numberOfPortfolios.length === 0 ||
      filters.numberOfPortfolios.includes(
        row["No. Of Portfolios"] === "4"
          ? "4 or more"
          : row["No. Of Portfolios"]
      );
    const locationMatch =
      filters.location.length === 0 ||
      filters.location.some((loc) =>
        row.Location.toLowerCase().includes(loc.toLowerCase())
      );

    return (
      usernameMatch &&
      sizeMatch &&
      portfolioMatch &&
      idMatch &&
      subscriptionMatch &&
      portfolioCountMatch &&
      locationMatch
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  //? Paginated Data n-1 * r , n 
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/members");
        const json = await res.json();
        if (json.success) {
          const formatted: Member[] = json.data.map((item: Member) => ({
            avatar: item.avatar || "",
            "Member Name": item["Member Name"],
            Username: item.Username,
            "No. Of Portfolios": item["No. Of Portfolios"]?.toString() || "0",
            "ID Verification": item["ID Verification"],
            "Portfolio Verification": item["Portfolio Verification"],
            Location: item.Location,
            "Size (KB)": item["Size (KB)"]?.toString() || "0",
            Subscription: item.Subscription,
          }));
          setData(formatted);
        }
      } catch (error) {
        console.error(" Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <Loading />;
  if (!data.length)
    return <div className="p-4 text-gray-600">No data available</div>;

  return (
    <>
      <HeaderBar
        filtersVisible={filtersVisible}
        onOpenFilters={() => setFiltersVisible(true)}
        onCloseFilters={() => setFiltersVisible(false)}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      {filtersVisible && (
        <div className="mt-4 mb-10">
          <FiltersPanel filters={filters} setFilters={setFilters} />
        </div>
      )}

      <div
  className="p-4 bg-white text-gray-600 rounded-lg shadow-md"
  style={{
    scrollbarGutter: "stable both-edges",
  }}
>
  {/* Scroll container */}
  <div
    className="overflow-x-auto overflow-y-auto"
    style={{
      maxWidth:"1100px",
      maxHeight: "500x",
      whiteSpace: "nowrap",
    }}
  >
    <table className="text-sm min-w-max">
      <thead className="bg-gray-50 text-gray-500 text-xs uppercase sticky top-0 z-10">
        <tr>
          {[
            "Member Name",
            "Username",
            "No. Of Portfolios",
            "ID Verification",
            "Portfolio Verification",
            "Location",
            "Size",
            "Subscription",
          ].map((header) => (
            <th
              key={header}
              className="px-4 py-2 text-left whitespace-nowrap"
            >
              {header}
            </th>
          ))}
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {paginatedData.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="px-4 py-2 flex items-center gap-3 whitespace-nowrap">
              <span className="w-5 h-5 flex items-center justify-center rounded-full text-gray-700 text-xl font-bold">
                +
              </span>
              {row.avatar ? (
                <Image
                  src={row.avatar}
                  alt={row["Member Name"]}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                  {row["Member Name"].charAt(0).toUpperCase()}
                </div>
              )}
              <span className="font-medium">{row["Member Name"]}</span>
            </td>
            <td className="px-4 py-2 text-gray-500 whitespace-nowrap">
              {row.Username}
            </td>
            <td className="px-4 py-2 text-center whitespace-nowrap">
              {row["No. Of Portfolios"]}
            </td>
            <td className="py-2 text-center whitespace-nowrap">
              <span
                className={`${getBadgeClass(
                  row["ID Verification"]
                )} rounded-full px-3 py-2 text-xs font-semibold`}
              >
                {row["ID Verification"]}
              </span>
            </td>
            <td className="px-4 py-2 text-center whitespace-nowrap">
              <span
                className={`${getBadgeClass(
                  row["Portfolio Verification"]
                )} rounded-full px-3 py-2 text-xs font-semibold`}
              >
                {row["Portfolio Verification"]}
              </span>
            </td>
            <td className="px-4 py-2 text-center whitespace-nowrap">
              {(() => {
                const parts = row.Location.split(",");
                const firstLine = parts.slice(0, -1).join(",").trim();
                const secondLine = parts.slice(-1)[0]?.trim();
                return (
                  <div className="flex flex-col leading-tight">
                    <span>{firstLine}</span>
                    <span className="text-gray-500">{secondLine}</span>
                  </div>
                );
              })()}
            </td>
            <td className="px-4 py-2 text-right whitespace-nowrap">
              {Number(row["Size (KB)"]).toLocaleString()} KB
            </td>
            <td className="px-4 py-2 text-center whitespace-nowrap">
              {row.Subscription}
            </td>
            <td className="px-4 py-2 text-center text-gray-400 font-bold">
              ⋮
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination controls */}
  <div className="flex items-center justify-center gap-6 px-4 py-4  bottom-0 bg-white">
    <div className="flex space-x-2">
      <button
        className="px-3 py-2 rounded bg-gray-200 text-gray-600"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(Math.max(1, currentPage - 3))}
      >
        &lt;
      </button>
      {Array.from({ length: 3 }, (_, i) => {
        const page = Math.floor((currentPage - 1) / 3) * 3 + i + 1;
        return (
          page <= totalPages && (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded ${
                currentPage === page
                  ? "bg-blue-100 border border-blue-500 text-blue-600"
                  : "bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        );
      })}
      <button
        className="px-3 py-2 rounded bg-gray-200 text-gray-600"
        disabled={currentPage + 3 > totalPages}
        onClick={() =>
          setCurrentPage(Math.min(currentPage + 3, totalPages))
        }
      >
        &gt;
      </button>
    </div>
    <div className="flex items-center gap-2">
      <select
        value={rowsPerPage}
        onChange={(e) => {
          setRowsPerPage(Number(e.target.value));
          setCurrentPage(1);
        }}
        className="border rounded px-2 py-2"
      >
        {[10, 20, 50, 100].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <span>/Page</span>
    </div>
  </div>
</div>

    </>
  );
};

export default CustomMemberTable;

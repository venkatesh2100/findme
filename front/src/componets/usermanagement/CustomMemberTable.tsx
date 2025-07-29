"use client";

import React, { useEffect, useState } from "react";
import FiltersPanel from "./FilterPanel";
import HeaderBar from "./header";

type Filters = {
  portfolioVerification: string[];
  idVerification: string[];
  subscription: string[];
  numberOfPortfolios: (number | string)[];
  sizeLimit: number;
  location: string[];
};

type Member = {
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
      return "bg-blue-300 text-gray-700 rounded-full px-4 py-2 font-semibold";
    case "not verified":
      return "bg-blue-900 text-white rounded-full px-4 py-2 font-semibold";
    case "in progress":
      return "bg-blue-200 text-black rounded-full px-4 py-2 font-semibold";
    default:
      return "bg-gray-200 text-black rounded-full px-4 py-2 font-semibold";
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
    // Username search filter
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

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    const fetchLatestCSV = async () => {
      try {
        const res = await fetch("http://localhost:4000/read-latest-upload");
        const json = await res.json();

        if (json.success) {
          setData(json.data);
        } else {
          alert("No CSV found in uploads");
        }
      } catch (error) {
        alert("Error fetching CSV");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCSV();
  }, []);

  if (loading) return <div className="p-4 text-gray-600">Loading...</div>;
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

      <div className="p-4 bg-white text-gray-600 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
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
                <th key={header} className="px-4 py-2 group">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-left">{header}</span>
                    <button className="opacity-100 group-hover:opacity-100 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                        />
                      </svg>
                    </button>
                  </div>
                </th>
              ))}
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2">{row["Member Name"]}</td>
                <td className="px-4 py-2">{row.Username}</td>
                <td className="px-4 py-2 text-center">
                  {row["No. Of Portfolios"]}
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`whitespace-nowrap px-2 py-1 rounded text-xs font-semibold ${getBadgeClass(
                      row["ID Verification"]
                    )}`}
                  >
                    {row["ID Verification"]}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`whitespace-nowrap px-2 py-1 rounded text-xs font-semibold ${getBadgeClass(
                      row["Portfolio Verification"]
                    )}`}
                  >
                    {row["Portfolio Verification"]}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  {(() => {
                    const parts = row.Location.split(",");
                    const firstLine = parts.slice(0, -1).join(",").trim();
                    const secondLine = parts.slice(-1)[0].trim();

                    return (
                      <div className="flex flex-col leading-tight">
                        <span>{firstLine}</span>
                        <span>{secondLine}</span>
                      </div>
                    );
                  })()}
                </td>
                <td className="px-4 py-2 text-right">
                  {Number(row["Size (KB)"]).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}{" "}
                  KB
                </td>
                <td className="px-4 py-2 text-center">{row.Subscription}</td>
                <td className="px-4 py-2 text-center text-gray-400 font-bold">
                  ⋮
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination UI */}
        <div className="flex items-center justify-center gap-6 px-4 py-4">
          <div className="flex space-x-2">
            {/* Previous Group */}
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-600"
              disabled={currentPage === 1}
              onClick={() => {
                const newPage = Math.max(1, currentPage - 3);
                setCurrentPage(newPage);
              }}
            >
              &lt;
            </button>

            {/* Show only 3 pages at a time */}
            {(() => {
              const currentGroupStart =
                Math.floor((currentPage - 1) / 3) * 3 + 1;
              const pagesToShow = Array.from(
                { length: 3 },
                (_, i) => currentGroupStart + i
              ).filter((page) => page <= totalPages);

              return pagesToShow.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-blue-100 border border-blue-500 text-blue-600"
                      : "bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ));
            })()}

            {/* Next Group */}
            <button
              className="px-3 py-1 rounded bg-gray-200 text-gray-600"
              disabled={currentPage + 3 > totalPages}
              onClick={() => {
                const newPage = Math.min(currentPage + 3, totalPages);
                setCurrentPage(newPage);
              }}
            >
              &gt;
            </button>
          </div>

          {/* Rows per page selector */}
          <div className="flex items-center gap-2">
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1"
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
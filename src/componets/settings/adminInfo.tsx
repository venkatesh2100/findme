"use client";

export default function AdminInfoForm() {
  return (
    <div>
      <h2 className="font-semibold text-sm mb-6">Admin Information</h2>
      <form className="max-w-lg space-y-5">
        {/* First and Last Name */}
        <div>
          <label className="block text-xs mb-1 font-semibold">
            Enter First and Last Name
          </label>
          <input
            type="text"
            defaultValue="Sam"
            className="w-full rounded-md px-3 py-2 text-sm text-[#666666] outline-none ring-1 ring-[#9ea5b0]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs mb-1 font-semibold">Email Address</label>
          <input
            type="email"
            defaultValue="Name25@email.com"
            className="w-full rounded-md px-3 py-2 text-sm text-[#666666] outline-none ring-1 ring-[#9ea5b0]"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs mb-1 font-semibold">Phone Number</label>
          <input
            type="tel"
            defaultValue="+ 1 (111) - (000) - (01010)"
            className="w-full rounded-md px-3 py-2 text-sm text-[#666666] outline-none ring-1 ring-[#9ea5b0]"
          />
        </div>

        {/* Office Address */}
        <div>
          <label className="block text-xs mb-1 font-semibold">Office Address</label>
          <textarea
            placeholder="Enter Street, City, State, Country, Zip-code"
            rows={3}
            className="w-full rounded-md px-3 py-2 text-sm resize-none outline-none ring-1 ring-[#9ea5b0]"
          ></textarea>
        </div>

        {/* Role */}
        <div>
          <label className="block text-xs mb-1 font-semibold">Role</label>
          <input
            type="text"
            placeholder="Enter Role"
            className="w-full rounded-md px-3 py-2 text-sm outline-none ring-1 ring-[#9ea5b0]"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-xs mb-1 font-semibold">Username</label>
          <input
            type="text"
            defaultValue="sampp24"
            className="w-full rounded-md px-3 py-2 text-sm outline-none ring-1 ring-[#9ea5b0]"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs mb-1 font-semibold">Password</label>
          <input
            type="password"
            defaultValue="password123"
            className="w-full rounded-md px-3 py-2 text-sm outline-none ring-1 ring-[#9ea5b0]"
          />
          <p className="text-[10px] text-gray-500 mt-1">
            Your password is between 4 and 12 characters
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-8 ">
          <button
            type="button"
            className="bg-[#abe3ff] text-[#2c678a] px-6 py-2 rounded text-sm font-semibold hover:bg-[#9bd0e8] transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#1b1b1b] text-white px-6 py-2 rounded text-sm font-semibold hover:bg-[#3a3a3a] transition"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
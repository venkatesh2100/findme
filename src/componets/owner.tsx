"use client";

import Image from "next/image";

export default function HeaderRightProfile() {
  return (
    <div className="w-full flex items-center justify-end px-6 py-4 bg-[#e6f0fa] shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full overflow-hidden">
          <Image
            src="/o.png" // Replace with correct path
            alt="Devanshi Chitalia"
            width={360}
            height={360}
            className="object-cover rounded-2xl"
          />
        </div>
        <div className="text-right">
          <h4 className="text-sm font-medium text-gray-800">Devanshi Chitalia</h4>
          <p className="text-xs text-gray-500 -mt-0.5">Owner</p>
        </div>
      </div>
    </div>
  );
}

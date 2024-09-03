"use client";

import Link from "next/link";
import { BiSolidCategory } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { HiChartPie } from "react-icons/hi";
import { IoBook } from "react-icons/io5";
import { MdMeetingRoom } from "react-icons/md";
import { RiCalendarTodoFill, RiReservedFill } from "react-icons/ri";

export default function SideNavbar() {
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8082/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Force a full page reload to the login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="w-[220px] max-w-xs h-[calc(100vh-4rem)] fixed left-0 top-16 z-40 bg-white-800 text-gray border-r border-white-700">
      <div className="h-full px-4 py-4">
        <div className="mt-8">
          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 p-3 rounded-md text-gray-400 hover:bg-red-700 hover:text-white transition-colors"
            >
              <HiChartPie className="text-lg" />
              <span className="text-base">Dashboard</span>
            </Link>
            <Link
              href="/transactions"
              className="flex items-center gap-3 p-3 rounded-md text-gray-400 hover:bg-red-700 hover:text-white transition-colors"
            >
              <RiCalendarTodoFill className="text-lg" />
              <span className="text-base">Transactions management</span>
            </Link>
            <Link
              href="/books"
              className="flex items-center gap-3 p-3 rounded-md text-gray-400 hover:bg-red-700 hover:text-white transition-colors"
            >
              <IoBook className="text-lg" />
              <span className="text-base">Books management</span>
            </Link>
            <Link
              href="/rooms"
              className="flex items-center gap-3 p-3 rounded-md text-gray-400 hover:bg-red-700 hover:text-white transition-colors"
            >
              <MdMeetingRoom className="text-lg" />
              <span className="text-base">Rooms management</span>
            </Link>
            <Link
              href="/reservations"
              className="flex items-center gap-3 p-3 rounded-md text-gray-400 hover:bg-red-700 hover:text-white transition-colors"
            >
              <RiReservedFill className="text-lg" />
              <span className="text-base">Reservations management</span>
            </Link>
            <Link
              href="/categories"
              className="flex items-center gap-3 p-3 rounded-md text-gray-400 hover:bg-red-700 hover:text-white transition-colors"
            >
              <BiSolidCategory className="text-lg" />
              <span className="text-base">Categories management</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center gap-3 p-3 rounded-md text-gray-400 hover:bg-red-700 hover:text-white transition-colors"
            >
              <FaRegUserCircle className="text-lg" />
              <span className="text-base">Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-400 py-2 px-4 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </aside>
  );
}

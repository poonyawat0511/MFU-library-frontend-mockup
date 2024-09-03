import Link from "next/link";
import { FaBook, FaHome } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
export default function SideNavbar() {
  return (
    <aside className="w-[220px] max-w-xs h-screen fixed left-0 top-0 z-40 bg-gray-800 text-white border-r border-gray-700">
      <div className="h-full px-4 py-4">
        <h3 className="text-xl font-semibold text-center">SideNavbar</h3>
        <div className="mt-8">
          <nav className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition-colors"
            >
              <FaHome className="text-lg" />
              <span className="text-base">Home</span>
            </Link>
            <Link
              href="/transactions"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition-colors"
            >
              <GrTransaction className="text-lg" />
              <span className="text-base">Transactions management</span>
            </Link>
            <Link
              href="/books"
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition-colors"
            >
              <FaBook className="text-lg" />
              <span className="text-base">Book management</span>
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}

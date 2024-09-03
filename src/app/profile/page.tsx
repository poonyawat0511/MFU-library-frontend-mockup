"use client";

import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call the logout endpoint on the server
      await fetch("http://localhost:8082/api/auth/logout", {
        method: "POST",
        credentials: "include", // Ensure cookies are included in the request
      });

      // Redirect to the login page
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Profile Page</h2>
        <p>This is your profile page.</p>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

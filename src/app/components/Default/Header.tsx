export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 h-16 bg-gray-800 text-white shadow-md z-50 flex items-center justify-between px-8">
      <div className="flex items-center">
        <div className="text-lg font-semibold">
          <h3>MyApp</h3>
        </div>
      </div>
      <nav className="flex items-center gap-6"></nav>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <img
            src="/images.jpg"
            alt="User Profile"
            className="w-8 h-8 rounded-full border-2 border-gray-600"
          />
          <span className="ml-2">John Doe</span>
        </div>
      </div>
    </header>
  );
}

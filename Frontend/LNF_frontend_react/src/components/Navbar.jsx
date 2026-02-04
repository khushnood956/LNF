import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="text-3xl">🔍</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Lost & Found</h1>
              <p className="text-xs text-gray-500 tracking-wide">Track System</p>
            </div>
          </Link>
          
          {/* Add Item Button */}
          <Link
            to="/add"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm transition-all hover:bg-blue-700 active:scale-95"
          >
            + Add Item
          </Link>
        </div>
      </div>
    </nav>
  );
}

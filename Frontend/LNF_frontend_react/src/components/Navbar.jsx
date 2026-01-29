import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 backdrop-blur-xl bg-zinc-950/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative text-4xl animate-float">�</div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">LOST</span>
                <span className="text-zinc-500 mx-1">/</span>
                <span className="text-zinc-200">FOUND</span>
              </h1>
              <p className="text-xs text-zinc-500 tracking-widest uppercase">Track System</p>
            </div>
          </Link>
          
          <Link
            to="/add"
            className="group relative px-6 py-3 font-bold text-sm tracking-wider overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 transition-transform group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex items-center gap-2">
              <span className="text-2xl">+</span>
              <span>ADD ITEM</span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

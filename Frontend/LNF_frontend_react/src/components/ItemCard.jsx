import { Link } from 'react-router-dom';

export default function ItemCard({ item }) {
  const isFound = item.found;
  const accentColor = isFound ? 'from-emerald-500 to-cyan-500' : 'from-amber-500 to-orange-500';
  const statusText = isFound ? 'FOUND' : 'LOST';

  return (
    <div className="group relative animate-slide-up">
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${accentColor} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`}></div>
      
      {/* Card content */}
      <div className="relative h-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-300">
        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1 bg-gradient-to-r ${accentColor} text-white text-xs font-black tracking-widest rounded-full`}>
            {statusText}
          </div>
        </div>
        
        {/* Icon */}
        <div className="mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accentColor} flex items-center justify-center text-2xl shadow-lg`}>
            {isFound ? '✓' : '❗'}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 pr-20 line-clamp-1">
          {item.itemName}
        </h3>
        
        {/* Description */}
        <p className="text-zinc-400 text-sm mb-6 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
              {item.ownerName?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <span className="text-sm font-medium text-zinc-300">{item.ownerName}</span>
          </div>
          
          <Link
            to={`/item/${item.id}`}
            className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm flex items-center gap-1 group/link"
          >
            <span>VIEW</span>
            <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';

export default function ItemCard({ item }) {
  const isFound = item.found;
  const statusBg = isFound ? 'bg-green-50' : 'bg-orange-50';
  const statusColor = isFound ? 'text-green-700' : 'text-orange-700';
  const statusBadgeBg = isFound ? 'bg-green-100' : 'bg-orange-100';
  const statusText = isFound ? 'FOUND' : 'LOST';

  return (
    <div className="animate-slide-up">
      <Link
        to={`/item/${item.id}`}
        className="card-base card-hover block h-full p-5 group"
      >
        {/* Status badge and icon */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 ${statusBadgeBg} ${statusColor} text-xs font-semibold rounded-full`}>
            {statusText}
          </span>
          <span className="text-2xl">{isFound ? '✓' : '❗'}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {item.itemName}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
              {item.ownerName?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <span className="text-sm text-gray-600">{item.ownerName}</span>
          </div>
          
          <span className="text-blue-600 font-medium text-xs group-hover:text-blue-700 transition-colors">View</span>
        </div>
      </Link>
    </div>
  );
}

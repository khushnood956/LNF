import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import itemApi from '../services/itemApi';

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, found, lost
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await itemApi.getAllItems();
      if (response.success) {
        setItems(response.data || []);
      }
    } catch (error) {
      setToast({ message: error.message || 'Failed to fetch items', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'found') return item.found === true;
    if (filter === 'lost') return item.found === false;
    return true;
  });

  const filterButtons = [
    { key: 'all', label: 'All Items', count: items.length },
    { key: 'found', label: 'Found', count: items.filter(i => i.found).length },
    { key: 'lost', label: 'Lost', count: items.filter(i => !i.found).length },
  ];

  return (
    <div className="min-h-screen bg-white">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Lost & Found Items</h1>
          <p className="text-gray-600">Help find lost items or report found items</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {filterButtons.map(btn => {
            const isActive = filter === btn.key;
            return (
              <button
                key={btn.key}
                onClick={() => setFilter(btn.key)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {btn.label}
                <span className="ml-2 font-semibold text-xs">({btn.count})</span>
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'lost' && 'No lost items reported yet'}
              {filter === 'found' && 'No found items reported yet'}
              {filter === 'all' && 'Be the first to report an item'}
            </p>
            <Link
              to="/add"
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <span>+</span>
              <span>Add Item</span>
            </Link>
          </div>
        )}

        {/* Items Grid */}
        {!loading && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Floating Action Button */}
      <Link
        to="/add"
        className="md:hidden fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg-soft flex items-center justify-center text-2xl hover:scale-110 transition-transform z-50"
      >
        +
      </Link>
    </div>
  );
}

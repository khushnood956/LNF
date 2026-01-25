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
    { key: 'all', label: 'All', count: items.length },
    { key: 'found', label: 'Found', count: items.filter(i => i.found).length },
    { key: 'lost', label: 'Lost', count: items.filter(i => !i.found).length },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4">
            <div className="text-6xl mb-4 animate-float">🔍</div>
          </div>
          <h2 className="text-5xl font-black tracking-tight mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Item Tracker
            </span>
          </h2>
          <p className="text-zinc-400 text-lg">Discover what's been lost and found</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {filterButtons.map((btn, index) => {
            const gradients = {
              all: 'from-purple-500 to-pink-500',
              found: 'from-emerald-500 to-cyan-500',
              lost: 'from-amber-500 to-orange-500'
            };
            const isActive = filter === btn.key;
            
            return (
              <button
                key={btn.key}
                onClick={() => setFilter(btn.key)}
                className={`group relative p-6 rounded-2xl transition-all duration-300 ${
                  isActive ? 'scale-105' : 'hover:scale-105'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[btn.key]} rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                <div className={`relative bg-zinc-900 border rounded-2xl p-6 ${
                  isActive ? 'border-transparent' : 'border-zinc-800'
                }`}>
                  <div className="text-4xl font-black text-white mb-2">{btn.count}</div>
                  <div className="text-sm font-bold tracking-widest uppercase text-zinc-400">
                    {btn.label} Items
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-30 animate-glow"></div>
              <div className="relative text-8xl">📦</div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">
              Nothing to see here
            </h3>
            <p className="text-zinc-400 mb-8 text-lg">
              {filter === 'lost' && 'No lost items reported yet'}
              {filter === 'found' && 'No found items reported yet'}
              {filter === 'all' && 'Be the first to report an item'}
            </p>
            <Link
              to="/add"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-purple-500 hover:to-cyan-500 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
            >
              <span className="text-2xl">+</span>
              <span>ADD FIRST ITEM</span>
            </Link>
          </div>
        )}

        {/* Items Grid */}
        {!loading && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Floating Action Button */}
      <Link
        to="/add"
        className="md:hidden fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform duration-300 z-50 animate-glow"
      >
        +
      </Link>
    </div>
  );
}

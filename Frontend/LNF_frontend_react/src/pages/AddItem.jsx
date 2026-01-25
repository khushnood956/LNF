import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemForm from '../components/ItemForm';
import Toast from '../components/Toast';
import itemApi from '../services/itemApi';

export default function AddItem() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await itemApi.createItem(formData);
      
      if (response.success) {
        setToast({ message: response.message || 'Item added successfully!', type: 'success' });
        // Wait a moment for user to see the success message, then navigate
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      setToast({ message: error.message || 'Failed to add item', type: 'error' });
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-4xl font-black text-white mb-3">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              ADD NEW ITEM
            </span>
          </h2>
          <p className="text-zinc-400 text-lg">Report a lost or found item to the system</p>
        </div>

        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>
          
          {/* Form container */}
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10">
            <ItemForm 
              onSubmit={handleSubmit} 
              onCancel={handleCancel}
              isLoading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen bg-white">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Item</h1>
          <p className="text-gray-600">Report a lost or found item to the system</p>
        </div>

        <div className="card-base p-6 md:p-8">
          <ItemForm 
            onSubmit={handleSubmit} 
            onCancel={handleCancel}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
}

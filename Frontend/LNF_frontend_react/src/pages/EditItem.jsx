import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import itemApi from '../services/itemApi';

export default function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [originalItem, setOriginalItem] = useState(null);
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    found: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const response = await itemApi.getItemById(id);
      if (response.success) {
        setOriginalItem(response.data);
        setFormData({
          itemName: response.data.itemName,
          description: response.data.description,
          found: response.data.found,
        });
      }
    } catch (error) {
      setToast({ message: error.message || 'Failed to fetch item', type: 'error' });
      setTimeout(() => navigate('/'), 2000);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.itemName.trim()) {
      newErrors.itemName = 'Item name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    // CRITICAL: Only send changed fields (PATCH, not PUT)
    const updates = {};
    if (formData.itemName !== originalItem.itemName) {
      updates.itemName = formData.itemName;
    }
    if (formData.description !== originalItem.description) {
      updates.description = formData.description;
    }
    if (formData.found !== originalItem.found) {
      updates.found = formData.found;
    }

    // If nothing changed, just go back
    if (Object.keys(updates).length === 0) {
      setToast({ message: 'No changes to save', type: 'info' });
      setTimeout(() => navigate(`/item/${id}`), 1500);
      return;
    }

    try {
      setSubmitting(true);
      const response = await itemApi.updateItem(id, updates);
      
      if (response.success) {
        setToast({ message: 'Item updated successfully!', type: 'success' });
        setTimeout(() => navigate(`/item/${id}`), 1500);
      }
    } catch (error) {
      setToast({ message: error.message || 'Failed to update item', type: 'error' });
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to={`/item/${id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Item
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Item</h1>
          <p className="text-gray-600">Update item details</p>
        </div>

        <div className="card-base p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Item Name */}
            <div>
              <label htmlFor="itemName" className="block text-sm font-semibold text-gray-900 mb-2">
                Item Name *
              </label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                disabled={submitting}
                className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.itemName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Wallet, Phone, Keys"
              />
              {errors.itemName && <p className="mt-1 text-sm text-red-600">{errors.itemName}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={submitting}
                rows="4"
                className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Provide details about the item..."
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Status Toggle */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <input
                type="checkbox"
                id="found"
                name="found"
                checked={formData.found}
                onChange={handleChange}
                disabled={submitting}
                className="w-5 h-5 text-green-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-green-500 cursor-pointer"
              />
              <label htmlFor="found" className="text-sm font-medium text-gray-900 cursor-pointer">
                ✓ Mark as Found
              </label>
            </div>

            {/* Non-editable fields info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 border border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Owner:</strong> {originalItem?.ownerName} <span className="text-gray-500">(read-only)</span>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Contact:</strong> {originalItem?.contactNo} <span className="text-gray-500">(read-only)</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {submitting ? 'Updating...' : 'Update Item'}
              </button>
              
              <Link
                to={`/item/${id}`}
                className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

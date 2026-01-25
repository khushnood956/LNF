import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
import itemApi from '../services/itemApi';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const response = await itemApi.getItemById(id);
      if (response.success) {
        setItem(response.data);
      }
    } catch (error) {
      setToast({ message: error.message || 'Failed to fetch item', type: 'error' });
      setTimeout(() => navigate('/'), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    try {
      setActionLoading(true);
      const newStatus = !item.found;
      const response = await itemApi.updateItem(id, { found: newStatus });
      
      if (response.success) {
        setItem(prev => ({ ...prev, found: newStatus }));
        setToast({ 
          message: `Item marked as ${newStatus ? 'Found' : 'Lost'}`, 
          type: 'success' 
        });
      }
    } catch (error) {
      setToast({ message: error.message || 'Failed to update status', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      const response = await itemApi.deleteItem(id);
      
      if (response.success) {
        setToast({ message: 'Item deleted successfully', type: 'success' });
        setTimeout(() => navigate('/'), 1500);
      }
    } catch (error) {
      setToast({ message: error.message || 'Failed to delete item', type: 'error' });
      setActionLoading(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h2>
          <Link to="/" className="text-indigo-600 hover:underline">Go back to home</Link>
        </div>
      </div>
    );
  }

  const statusColor = item.found ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';
  const statusText = item.found ? 'Found' : 'Lost';

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        isLoading={actionLoading}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Item Detail Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Header with Status */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
            <div className="flex-1 mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.itemName}</h1>
              <span className={`${statusColor} inline-block px-4 py-2 rounded-full text-sm font-semibold uppercase`}>
                {statusText}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
            <p className="text-gray-600 whitespace-pre-wrap">{item.description}</p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Owner Name</h3>
              <p className="text-lg text-gray-900">{item.ownerName}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Contact Number</h3>
              <p className="text-lg text-gray-900">{item.contactNo}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleToggleStatus}
              disabled={actionLoading}
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition-colors duration-200"
            >
              {actionLoading ? 'Updating...' : `Mark as ${item.found ? 'Lost' : 'Found'}`}
            </button>
            
            <Link
              to={`/edit/${item.id}`}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-center"
            >
              Edit Item
            </Link>
            
            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={actionLoading}
              className="sm:flex-initial px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

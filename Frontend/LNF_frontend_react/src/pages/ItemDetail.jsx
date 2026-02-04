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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h2>
          <Link to="/" className="text-blue-600 hover:underline">Go back to home</Link>
        </div>
      </div>
    );
  }

  const statusBg = item.found ? 'bg-green-50' : 'bg-orange-50';
  const statusColor = item.found ? 'text-green-700' : 'text-orange-700';
  const statusText = item.found ? 'Found' : 'Lost';

  return (
    <div className="min-h-screen bg-white">
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
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Item Detail Card */}
        <div className="card-base p-6 md:p-8">
          {/* Header with Status */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 pb-6 border-b border-gray-100">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{item.itemName}</h1>
              <span className={`${statusBg} ${statusColor} inline-block px-3 py-1 rounded-full text-xs font-semibold`}>
                {statusText}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 pb-6 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Owner Name</h3>
              <p className="text-lg text-gray-900">{item.ownerName}</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">Contact Number</h3>
              <p className="text-lg text-gray-900">{item.contactNo}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleToggleStatus}
              disabled={actionLoading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-all"
            >
              {actionLoading ? 'Updating...' : `Mark as ${item.found ? 'Lost' : 'Found'}`}
            </button>
            
            <Link
              to={`/edit/${item.id}`}
              className="flex-1 bg-gray-100 text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center"
            >
              Edit Item
            </Link>
            
            <button
              onClick={() => setShowDeleteModal(true)}
              disabled={actionLoading}
              className="sm:flex-initial px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 disabled:opacity-50 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

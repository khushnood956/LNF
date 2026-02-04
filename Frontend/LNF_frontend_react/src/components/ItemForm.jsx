import { useState } from 'react';

export default function ItemForm({ initialData = null, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    itemName: initialData?.itemName || '',
    description: initialData?.description || '',
    ownerName: initialData?.ownerName || '',
    contactNo: initialData?.contactNo || '',
    found: initialData?.found || false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.itemName.trim()) {
      newErrors.itemName = 'Item name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required';
    }
    
    if (!formData.contactNo.trim()) {
      newErrors.contactNo = 'Contact number is required';
    } else if (!/^03\d{9}$/.test(formData.contactNo)) {
      newErrors.contactNo = 'Contact must be 11 digits starting with 03';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
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
          disabled={isLoading}
          className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            errors.itemName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., Wallet, Phone, Keys"
        />
        {errors.itemName && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <span>⚠</span> {errors.itemName}
          </p>
        )}
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
          disabled={isLoading}
          rows="4"
          className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Provide details about the item..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <span>⚠</span> {errors.description}
          </p>
        )}
      </div>

      {/* Owner Name */}
      <div>
        <label htmlFor="ownerName" className="block text-sm font-semibold text-gray-900 mb-2">
          Owner Name *
        </label>
        <input
          type="text"
          id="ownerName"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            errors.ownerName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your name"
        />
        {errors.ownerName && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <span>⚠</span> {errors.ownerName}
          </p>
        )}
      </div>

      {/* Contact Number */}
      <div>
        <label htmlFor="contactNo" className="block text-sm font-semibold text-gray-900 mb-2">
          Contact Number *
        </label>
        <input
          type="tel"
          id="contactNo"
          name="contactNo"
          value={formData.contactNo}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            errors.contactNo ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="03XXXXXXXXX"
        />
        {errors.contactNo && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <span>⚠</span> {errors.contactNo}
          </p>
        )}
      </div>

      {/* Mark as Found */}
      <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
        <input
          type="checkbox"
          id="found"
          name="found"
          checked={formData.found}
          onChange={handleChange}
          disabled={isLoading}
          className="w-5 h-5 text-green-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-green-500 cursor-pointer"
        />
        <label htmlFor="found" className="text-sm font-medium text-gray-900 cursor-pointer">
          ✓ Mark as Found
        </label>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : initialData ? 'Update Item' : 'Add Item'}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

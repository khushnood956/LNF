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
      <div>
        <label htmlFor="itemName" className="block text-sm font-bold text-zinc-300 mb-3 tracking-wide uppercase">
          Item Name *
        </label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-5 py-4 bg-zinc-900 border-2 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-all ${
            errors.itemName ? 'border-red-500' : 'border-zinc-800'
          }`}
          placeholder="e.g., Wallet, Phone, Keys"
        />
        {errors.itemName && (
          <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
            <span>⚠</span> {errors.itemName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-bold text-zinc-300 mb-3 tracking-wide uppercase">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={isLoading}
          rows="4"
          className={`w-full px-5 py-4 bg-zinc-900 border-2 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-all resize-none ${
            errors.description ? 'border-red-500' : 'border-zinc-800'
          }`}
          placeholder="Provide details about the item..."
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
            <span>⚠</span> {errors.description}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="ownerName" className="block text-sm font-bold text-zinc-300 mb-3 tracking-wide uppercase">
          Owner Name *
        </label>
        <input
          type="text"
          id="ownerName"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-5 py-4 bg-zinc-900 border-2 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-all ${
            errors.ownerName ? 'border-red-500' : 'border-zinc-800'
          }`}
          placeholder="Your name"
        />
        {errors.ownerName && (
          <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
            <span>⚠</span> {errors.ownerName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contactNo" className="block text-sm font-bold text-zinc-300 mb-3 tracking-wide uppercase">
          Contact Number *
        </label>
        <input
          type="tel"
          id="contactNo"
          name="contactNo"
          value={formData.contactNo}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-5 py-4 bg-zinc-900 border-2 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-all ${
            errors.contactNo ? 'border-red-500' : 'border-zinc-800'
          }`}
          placeholder="03XXXXXXXXX"
        />
        {errors.contactNo && (
          <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
            <span>⚠</span> {errors.contactNo}
          </p>
        )}
      </div>

      <div className="relative">
        <div className="flex items-center gap-4 bg-zinc-900 border-2 border-zinc-800 p-5 rounded-xl hover:border-zinc-700 transition-all cursor-pointer">
          <input
            type="checkbox"
            id="found"
            name="found"
            checked={formData.found}
            onChange={handleChange}
            disabled={isLoading}
            className="w-6 h-6 text-cyan-500 bg-zinc-800 border-zinc-700 rounded focus:ring-cyan-500 focus:ring-offset-zinc-900 cursor-pointer"
          />
          <label htmlFor="found" className="text-sm font-bold text-zinc-300 cursor-pointer tracking-wide">
            🎯 MARK AS FOUND
          </label>
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex-1 py-4 px-6 font-bold text-sm tracking-widest rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 transition-transform group-hover:scale-105"></div>
          <span className="relative">
            {isLoading ? 'SUBMITTING...' : initialData ? 'UPDATE ITEM' : 'ADD ITEM'}
          </span>
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-4 border-2 border-zinc-800 rounded-xl font-bold text-sm text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 disabled:opacity-50 transition-all tracking-widest"
          >
            CANCEL
          </button>
        )}
      </div>
    </form>
  );
}

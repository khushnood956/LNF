import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: '✓',
      color: 'text-green-700',
      iconBg: 'bg-green-100'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: '✕',
      color: 'text-red-700',
      iconBg: 'bg-red-100'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'ℹ',
      color: 'text-blue-700',
      iconBg: 'bg-blue-100'
    }
  };

  const style = styles[type] || styles.info;

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-up">
      <div className={`${style.bg} border ${style.border} rounded-lg shadow-lg-soft px-4 py-4 flex items-center gap-3 max-w-sm`}>
        {/* Icon */}
        <div className={`${style.iconBg} ${style.color} w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0`}>
          {style.icon}
        </div>
        
        {/* Message */}
        <p className={`flex-1 ${style.color} font-medium text-sm`}>{message}</p>
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className={`${style.color} hover:opacity-60 font-bold text-lg transition-opacity`}
        >
          ×
        </button>
      </div>
    </div>
  );
}

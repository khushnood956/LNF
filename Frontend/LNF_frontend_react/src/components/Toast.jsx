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
      gradient: 'from-emerald-500 to-cyan-500',
      icon: '✓',
      glow: 'shadow-emerald-500/50'
    },
    error: {
      gradient: 'from-red-500 to-pink-500',
      icon: '✕',
      glow: 'shadow-red-500/50'
    },
    info: {
      gradient: 'from-blue-500 to-purple-500',
      icon: 'ℹ',
      glow: 'shadow-blue-500/50'
    }
  };

  const style = styles[type] || styles.info;

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-up">
      <div className="relative">
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${style.gradient} rounded-xl blur opacity-60`}></div>
        
        {/* Toast content */}
        <div className={`relative bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl ${style.glow} px-6 py-4 flex items-center gap-4 max-w-md`}>
          {/* Icon */}
          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${style.gradient} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
            {style.icon}
          </div>
          
          {/* Message */}
          <p className="flex-1 text-white font-medium">{message}</p>
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-white font-bold text-2xl leading-none transition-colors"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

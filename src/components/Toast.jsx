import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

const Toast = () => {
  const { toast, hideToast } = useApp();

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toast.show, hideToast]);

  if (!toast.show) return null;

  const getIconClass = (type) => {
    switch (type) {
      case 'success':
        return 'fa-check-circle text-green-500';
      case 'error':
        return 'fa-exclamation-circle text-red-500';
      case 'warning':
        return 'fa-exclamation-triangle text-yellow-500';
      default:
        return 'fa-info-circle text-blue-500';
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500';
      case 'error':
        return 'border-l-red-500';
      case 'warning':
        return 'border-l-yellow-500';
      default:
        return 'border-l-blue-500';
    }
  };

  return (
    <div className="toast-container">
      <div className={`toast bg-white rounded-lg shadow-xl border-l-4 ${getBorderColor(toast.type)} p-4 max-w-sm w-full`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <i className={`fas ${getIconClass(toast.type)} text-lg`}></i>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {toast.message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={hideToast}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;

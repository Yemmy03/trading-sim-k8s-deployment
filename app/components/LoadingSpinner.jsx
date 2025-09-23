import React from 'react';
import { RefreshCw } from 'lucide-react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <RefreshCw className="h-12 w-12 text-emerald-600 animate-spin mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
        <p className="text-gray-600">Please wait while we load your data...</p>
        
        {/* Progress bar */}
        <div className="mt-6 w-48 bg-gray-200 rounded-full h-2 mx-auto">
          <div className="bg-emerald-600 h-2 rounded-full animate-pulse" style={{
            animation: 'progress 3s ease-in-out'
          }}></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
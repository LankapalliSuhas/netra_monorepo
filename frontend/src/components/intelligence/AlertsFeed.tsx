import React from 'react';
import { useStore } from '../../context/StoreContext';
import { AlertCircle, AlertTriangle, Activity } from 'lucide-react';

const AlertsFeed: React.FC = () => {
  const { storeData, isConnected } = useStore();

  if (!storeData) return null;
  
  const actions = storeData.active_actions || [];

  return (
    <div className={`p-6 flex-1 overflow-y-auto ${!isConnected ? 'grayscale opacity-50' : ''}`}>
      <div className="flex items-center gap-2 mb-4">
        <Activity className="text-gray-400" size={20} />
        <h2 className="font-bold text-white tracking-wide">DECISION ENGINE STREAM</h2>
      </div>

      {actions.length === 0 ? (
        <div className="text-gray-500 text-sm italic">
          System nominal. No active operational alerts.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {actions.map((action) => {
            const isCritical = action.severity === 'CRITICAL';
            
            return (
              <div 
                key={action.action_id} 
                className={`p-3 rounded border flex items-start gap-3 ${
                  isCritical 
                    ? 'bg-red-950/30 border-red-900/50' 
                    : 'bg-amber-950/30 border-amber-900/50'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCritical ? (
                    <AlertCircle className="text-netra-critical animate-pulse" size={18} />
                  ) : (
                    <AlertTriangle className="text-netra-warning" size={18} />
                  )}
                </div>
                <div>
                  <div className={`text-xs font-bold mb-1 ${isCritical ? 'text-netra-critical' : 'text-netra-warning'}`}>
                    {action.source}
                  </div>
                  <div className="text-gray-300 text-sm leading-snug">
                    {action.message}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AlertsFeed;

import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Users } from 'lucide-react';

const QueuePanel: React.FC = () => {
  const { storeData, isConnected } = useStore();
  
  if (!storeData) return null;

  const { queue_intelligence } = storeData;
  const isSurge = queue_intelligence.estimated_wait_time_minutes > 4.0;
  
  const bgClass = isSurge ? 'bg-red-900/30 border-red-500/50' : 'bg-gray-800 border-gray-700';

  return (
    <div className={`p-6 border-b transition-colors ${bgClass} ${!isConnected ? 'grayscale opacity-50' : ''}`}>
      <div className="flex items-center gap-2 mb-4">
        <Users className={isSurge ? 'text-netra-critical' : 'text-gray-400'} size={20} />
        <h2 className="font-bold text-white tracking-wide">CHECKOUT QUEUE INTELLIGENCE</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900/50 p-4 rounded border border-gray-700/50">
          <div className="text-gray-400 text-xs mb-1">CURRENT FOOTFALL</div>
          <div className="text-3xl font-bold text-white">
            {queue_intelligence.people_in_queue}
            <span className="text-sm font-normal text-gray-500 ml-2">people</span>
          </div>
        </div>
        
        <div className={`p-4 rounded border ${isSurge ? 'bg-red-950/50 border-red-500/30' : 'bg-gray-900/50 border-gray-700/50'}`}>
          <div className="text-gray-400 text-xs mb-1">ESTIMATED WAIT TIME</div>
          <div className={`text-3xl font-bold ${isSurge ? 'text-netra-critical' : 'text-white'}`}>
            {queue_intelligence.estimated_wait_time_minutes.toFixed(1)}
            <span className="text-sm font-normal text-gray-500 ml-2">min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueuePanel;

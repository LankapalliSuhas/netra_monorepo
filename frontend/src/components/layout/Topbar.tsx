import React from 'react';
import axios from 'axios';
import { useStore } from '../../context/StoreContext';
import { Activity, ServerCrash } from 'lucide-react';

const Topbar: React.FC = () => {
  const { storeData, isConnected } = useStore();

  const toggleMode = async () => {
    if (!storeData) return;
    const newMode = storeData.system.mode === 'LIVE' ? 'SIMULATED' : 'LIVE';
    try {
      await axios.post('http://127.0.0.1:8000/api/settings/mode', { mode: newMode });
    } catch (e) {
      console.error("Failed to toggle mode", e);
    }
  };

  return (
    <div className="flex flex-col">
      {!isConnected && (
        <div className="w-full bg-amber-500 text-black py-2 text-center font-bold animate-pulse flex items-center justify-center gap-2">
          <ServerCrash size={20} />
          ⚠️ EDGE NETWORK DISCONNECTED - ATTEMPTING RECONNECTION... LAST KNOWN STATE DISPLAYED.
        </div>
      )}
      <div className="bg-gray-900 border-b border-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Activity className="text-netra-live" size={24} />
          <h1 className="text-xl font-bold tracking-wider">NETRA COMMAND CENTER</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">MODE:</span>
            <button
              onClick={toggleMode}
              className="bg-gray-800 border border-gray-700 px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-700 transition-colors"
            >
              <div className={`w-3 h-3 rounded-full animate-pulse ${
                storeData?.system.mode === 'LIVE' ? 'bg-netra-live' : 'bg-blue-400'
              }`} />
              <span className="font-semibold">{storeData?.system.mode || 'CONNECTING...'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

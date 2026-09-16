import React from 'react';
import { IShelf } from '../../types/netra';
import { useStore } from '../../context/StoreContext';
import { Package } from 'lucide-react';

interface ShelfCardProps {
  shelf: IShelf;
}

const ShelfCard: React.FC<ShelfCardProps> = ({ shelf }) => {
  const { storeData } = useStore();
  const mode = storeData?.system.mode;
  
  const isPhysical = shelf.is_physical_node;
  const isSimulatedMode = mode === 'SIMULATED';
  const isLiveMode = mode === 'LIVE';
  
  // If false and mode is "LIVE", dim the card (opacity-50)
  const isDimmed = !isPhysical && isLiveMode;
  
  let borderClass = 'border-gray-700';
  if (isPhysical) {
    borderClass = 'border-netra-live shadow-[0_0_10px_rgba(74,222,128,0.5)]';
  } else if (shelf.status === 'CRITICAL') {
    borderClass = 'border-netra-critical shadow-[0_0_10px_rgba(239,68,68,0.5)]';
  }
  
  const bgClass = shelf.status === 'CRITICAL' ? 'bg-red-900/20' : 'bg-gray-800';
  
  return (
    <div className={`rounded-lg border p-4 flex flex-col gap-2 transition-all ${borderClass} ${bgClass} ${isDimmed ? 'opacity-50 grayscale' : 'opacity-100'}`}>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-white text-sm line-clamp-2" title={shelf.name}>
          {shelf.name}
        </h3>
        {isPhysical && (
          <span className="text-[10px] bg-netra-live text-black px-1.5 py-0.5 rounded font-bold whitespace-nowrap">
            EDGE NODE
          </span>
        )}
      </div>
      <div className="text-xs text-gray-400 font-mono">
        {shelf.shelf_id}
      </div>
      
      <div className="mt-auto pt-2 flex items-center justify-between border-t border-gray-700/50">
        <div className="flex items-center gap-1.5 text-gray-300">
          <Package size={14} />
          <span className="text-sm">Stock</span>
        </div>
        <div className={`font-bold text-xl ${shelf.status === 'CRITICAL' ? 'text-netra-critical' : 'text-white'}`}>
          {shelf.current_stock}
        </div>
      </div>
    </div>
  );
};

export default ShelfCard;

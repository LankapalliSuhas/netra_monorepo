import React from 'react';
import { useStore } from '../../context/StoreContext';
import ShelfCard from './ShelfCard';

const ProductGrid: React.FC = () => {
    const { storeData } = useStore();

    if (!storeData) {
        return (
            <div className="flex-1 flex items-center justify-center p-8 text-gray-500">
                Waiting for initial state from edge network...
            </div>
        );
    }

    const shelves = storeData.shelves || [];

    return (
        <div className="flex-1 overflow-y-auto p-6">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Inventory Operations</h2>
                    <p className="text-gray-400 text-sm">Real-time edge load cell telemetry</p>
                </div>
                <div className="text-sm text-gray-400">
                    <span className="text-white font-bold">{shelves.length}</span> Nodes Monitored
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {shelves.map((shelf) => (
                    <ShelfCard key={shelf.shelf_id} shelf={shelf} />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;

import React from 'react';
import { StoreProvider } from './context/StoreContext';
import Topbar from './components/layout/Topbar';
import ProductGrid from './components/dashboard/ProductGrid';
import QueuePanel from './components/intelligence/QueuePanel';
import AlertsFeed from './components/intelligence/AlertsFeed';
import './index.css';

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col font-sans">
      <Topbar />
      <div className="flex-1 flex overflow-hidden">
        {/* Left main pane */}
        <div className="w-2/3 flex flex-col border-r border-gray-800">
          <ProductGrid />
        </div>
        
        {/* Right intelligence pane */}
        <div className="w-1/3 bg-gray-900 flex flex-col">
          <QueuePanel />
          <AlertsFeed />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;

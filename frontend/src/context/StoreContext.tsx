import React, { createContext, useContext, useEffect, useState } from 'react';
import { IStorePayload } from '../types/netra';
import { connectWebSocket } from '../api/wsClient';

interface StoreContextType {
  storeData: IStorePayload | null;
  isConnected: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storeData, setStoreData] = useState<IStorePayload | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const disconnect = connectWebSocket(
      (data) => {
        setStoreData(data as IStorePayload);
      },
      (status) => {
        setIsConnected(status);
      }
    );

    return () => {
      disconnect();
    };
  }, []);

  return (
    <StoreContext.Provider value={{ storeData, isConnected }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

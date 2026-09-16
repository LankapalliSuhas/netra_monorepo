export interface ISystemState {
  mode: "LIVE" | "SIMULATED";
  timestamp: number;
}

export interface IStoreMetrics {
  current_occupancy: number;
}

export interface IQueueIntelligence {
  people_in_queue: number;
  estimated_wait_time_minutes: number;
}

export interface IShelf {
  product_id: string;
  name: string;
  shelf_id: string;
  is_physical_node: boolean;
  current_stock: number;
  reorder_threshold: number;
  status: "CRITICAL" | "OK" | "WARNING";
}

export interface IActiveAction {
  action_id: string;
  severity: "CRITICAL" | "WARNING";
  source: string;
  message: string;
  timestamp: number;
  acknowledged: boolean;
}

export interface IStorePayload {
  system: ISystemState;
  store_metrics: IStoreMetrics;
  queue_intelligence: IQueueIntelligence;
  shelves: IShelf[];
  active_actions: IActiveAction[];
}

let ws: WebSocket | null = null;

export const connectWebSocket = (
  onMessage: (data: any) => void,
  onStatusChange: (connected: boolean) => void
) => {
  if (ws) {
    ws.close();
  }

  const connect = () => {
    ws = new WebSocket('ws://127.0.0.1:8000/ws/live');

    ws.onopen = () => {
      console.log('Connected to NETRA Edge WebSocket');
      onStatusChange(true);
    };

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        onMessage(parsed);
      } catch (e) {
        console.error("Failed to parse websocket frame", e);
      }
    };

    ws.onclose = () => {
      console.warn('WebSocket disconnected. Attempting to reconnect in 2s...');
      onStatusChange(false);
      setTimeout(() => {
        connect();
      }, 2000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error', error);
      ws?.close();
    };
  };

  connect();

  return () => {
    if (ws) {
      ws.onclose = null;
      ws.close();
    }
  };
};

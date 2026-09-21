import { create } from 'zustand';
import * as signalR from '@microsoft/signalr';
import { WeatherForecast } from '../models/weather-forecast';

interface WeatherHubState {
  hubConnection: signalR.HubConnection | null;
  connectionState: signalR.HubConnectionState;
  latestforecast: WeatherForecast[];

  startConnection: () => Promise<void>;
}

export const WeatherHubService = create<WeatherHubState>((set, get) => ({
  hubConnection: null,
  connectionState: signalR.HubConnectionState.Disconnected,
  latestforecast: [],

  startConnection: async () => {
    const { hubConnection, connectionState } = get();
    
    if (
      hubConnection ||
      connectionState === signalR.HubConnectionState.Connecting ||
      connectionState === signalR.HubConnectionState.Connected) {
      return;
    }

    set({ connectionState: signalR.HubConnectionState.Connecting });

    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/weatherForecastHub')
      .build();

    connection.on('ForecastUpdated', (forecast: WeatherForecast[]) => {
      set({ latestforecast: forecast });
    });

    try {
      await connection.start();
      console.log('SignalR connection started');

      set({
        hubConnection: connection,
        connectionState: signalR.HubConnectionState.Connected,
      });
    } catch (err) {
      console.error('Error connecting to SignalR', err);
      set({ connectionState: signalR.HubConnectionState.Disconnected });
    }
  },
}));
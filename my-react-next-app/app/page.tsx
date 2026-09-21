'use client';
import { useEffect } from "react";
import { WeatherHubService } from "./store/weather-hub.service";

export default function Home() {
  const { latestforecast, startConnection } = WeatherHubService();

  useEffect(() => {
    startConnection();
  }, [startConnection]); // Added dependency array to run only on mount

  return (
    <div>
      <main>
        <h1>Weather Forecast</h1>
        <table>
          <thead> 
            <tr>
              <th>Date</th>
              <th>Temp (C)</th>
              <th>Temp (F)</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {latestforecast.map(item => (
              <tr key={item.date}>
                <td>{item.date}</td>
                <td>{item.temperatureC}</td>
                <td>{item.temperatureF}</td>
                <td>{item.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

async function getForeCasts() : Promise<WeatherForecast[]> {
  const data = await fetch('http://localhost:5000/WeatherForecast');
  const forecasts = await data.json() as WeatherForecast[];
  return forecasts;
}

export default async function Home() {
  const forecasts: WeatherForecast[] = await getForeCasts();

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
            {forecasts.map(item => (
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

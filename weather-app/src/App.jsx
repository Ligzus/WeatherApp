import React, { useState } from "react";
import { getWeather } from "./utils/weatherApi";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import styles from "./App.module.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const data = await getWeather(city);
      setWeather({
        city: city,
        temp: data.currentData.main.temp,
        windSpeed: data.currentData.wind.speed,
        humidity: data.currentData.main.humidity,
        icon: data.currentData.weather[0].icon,
      });
      setError("");
      setCity("");
      console.log(data);
    } catch (err) {
      if (err.message === "City not found or API error") {
        setError("Упс, кажется где-то опечатка");
      } else {
        setError("Что-то сломалось, попробуй позже");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Где смотрим погоду?"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Поиск</button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;

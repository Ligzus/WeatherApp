import React, { useState } from "react";
import { getWeather } from "../../utils/weatherApi";
import WeatherCard from "../WeatherCard/WeatherCard";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./CityWeather.module.css";

function CityWeather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forecastWeather, setForecastaWeather] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    try {
      const data = await getWeather(city);
      setWeather({
        city: city,
        temp: data.currentData.main.temp,
        windSpeed: data.currentData.wind.speed,
        humidity: data.currentData.main.humidity,
        icon: data.currentData.weather[0].icon,
      });
      setForecastaWeather({
        temp: data.forecastData.main.temp,
        windSpeed: data.forecastData.wind.speed,
        humidity: data.forecastData.main.humidity,
        icon: data.forecastData.weather[0].icon,
      });
      setError("");
    } catch (err) {
      if (err.message === "City not found or API error") {
        setError("Упс, кажется где-то опечатка");
      } else {
        setError("Что-то сломалось, попробуй позже");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <SearchBar onSearch={fetchWeather} />
      {loading && <p className={styles.loader}>загружаем погоду...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {weather && !loading && <WeatherCard weather={weather} />}
    </div>
  );
}

export default CityWeather;
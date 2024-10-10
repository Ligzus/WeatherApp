import React, { useEffect, useState } from "react";
import { getDefaultWeather } from "../../utils/weatherApi";
import WeatherCard from "../WeatherCard/WeatherCard";
import styles from "./DefaultWeather.module.css";

function DefaultWeather() {
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true);
      try {
        const data = await getDefaultWeather();
        setWeather([
          {
            city: "Лондон",
            temp: data.firstCityData.main.temp,
            windSpeed: data.firstCityData.wind.speed,
            humidity: data.firstCityData.main.humidity,
            icon: data.firstCityData.weather[0].icon,
          },
          {
            city: "Париж",
            temp: data.secondCityData.main.temp,
            windSpeed: data.secondCityData.wind.speed,
            humidity: data.secondCityData.main.humidity,
            icon: data.secondCityData.weather[0].icon,
          },
          {
            city: "Саранск",
            temp: data.thirdCityData.main.temp,
            windSpeed: data.thirdCityData.wind.speed,
            humidity: data.thirdCityData.main.humidity,
            icon: data.thirdCityData.weather[0].icon,
          },
        ]);
        setError("");
      } catch (err) {
        setError("Что-то сломалось, попробуй позже");
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultWeather();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Ты точно мечтаешь тут побывать:</h2>
      {loading && <p className={styles.loader}>загружаем погоду...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {weather.length > 0 && !loading && weather.map((cityWeather, index) => (
        <WeatherCard key={index} weather={cityWeather} />
      ))}
    </div>
  );
}

export default DefaultWeather;

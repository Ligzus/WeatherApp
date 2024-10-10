import React from "react";
import styles from "./WeatherCard.module.css";

const WeatherCard = ({ weather }) => {
  return (
    <div className={styles.card}>
      <div className={styles.city}>
        <h2>{weather.city.toUpperCase()}</h2>
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
          alt="weather icon"
        />
      </div>
      <p>Температура: {weather.temp}°C</p>
      <p>Скорость ветра: {weather.windSpeed} м/с</p>
      <p>Влажность: {weather.humidity}%</p>
    </div>
  );
};

export default WeatherCard;

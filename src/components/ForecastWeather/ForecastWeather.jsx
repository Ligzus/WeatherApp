import styles from "./ForecastWeather.module.css";
import { ForecastWeatherCard } from "./ForecastWeatherCard/ForecastWeatherCard";

export const ForecastWeather = ({ weather }) => {
  return (
    <div className={styles.forecastWeather}>
      <div className={styles.forecastContainer}>
        {weather.map((dayWeather, index) => (
          <ForecastWeatherCard key={index} weather={dayWeather} />
        ))}
      </div>
    </div>
  );
};

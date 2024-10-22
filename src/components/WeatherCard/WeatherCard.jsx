import styles from "./WeatherCard.module.css";

const WeatherCard = ({ weather }) => {
  return (
    <div className={styles.card}>
      <div className={styles.city}>
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
            alt="weather icon"
          />
          <h3>{weather.city.toUpperCase()}</h3>
        </div>
        <div className={styles.weather}>
          <p className={styles.temp}>{Math.round(weather.temp)}</p>
          <span>°C</span>
        </div>
      </div>

      <p>💨Скорость ветра: {weather.windSpeed} м/с</p>
      <p>💧Влажность: {weather.humidity}%</p>
    </div>
  );
};

export default WeatherCard;

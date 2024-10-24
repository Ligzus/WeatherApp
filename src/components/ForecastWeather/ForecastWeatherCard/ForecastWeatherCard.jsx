import styles from "./ForecastWeatherCard.module.css";

export const ForecastWeatherCard = ({ weather }) => {
  const timestamp = weather.date * 1000;
  const date = new Date(timestamp);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}`;

  return (
    <div className={styles.forecast}>
      <p className={styles.date}>{formattedDate}</p>
      <div className={styles.forecastTemp}>
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
          alt="weather icon"
        />
        <div className={styles.weather}>
          <p className={styles.temp}>{Math.round(weather.temp)}</p>
          <span>°C</span>
        </div>
      </div>

      <div className={styles.weatherBottom}>
        <p>💨 {weather.windSpeed.toFixed(1)} м/с</p>
        <p>💧 {weather.humidity}%</p>
      </div>
    </div>
  );
};

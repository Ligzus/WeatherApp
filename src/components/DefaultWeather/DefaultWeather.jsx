import { useEffect, useState } from "react";
import { getDefaultWeather } from "../../utils/weatherApi";
import { DEFAULT_CITIES } from "../../constants/cities";
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

        setWeather(
          DEFAULT_CITIES.map((city, index) => ({
            city,
            temp: data[index].main.temp,
            windSpeed: data[index].wind.speed,
            humidity: data[index].main.humidity,
            icon: data[index].weather[0].icon,
          }))
        );

        setError("");
      } catch (err) {
        setError(err.message || "Что-то сломалось, попробуй позже");
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultWeather();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Ты точно мечтаешь тут побывать:</h2>

      <div className={styles.cardContainer}>
        {loading && <p className={styles.loader}>загружаем погоду...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {weather.length > 0 &&
          !loading &&
          weather.map((cityWeather, index) => (
            <WeatherCard key={index} weather={cityWeather} />
          ))}
      </div>
    </div>
  );
}

export default DefaultWeather;

import { DEFAULT_CITIES } from "../constants/cities";

const API_KEY = "58d01c8612f83fc2e68ef14809854068";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export async function getWeather(city) {
  const currentWeatherResponse = await fetch(
    `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`,
  );
  const forecastResponse = await fetch(
    `${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`,
  );

  if (!currentWeatherResponse.ok || !forecastResponse.ok) {
    throw new Error("Город не найден");
  }

  const currentData = await currentWeatherResponse.json();
  const forecastData = await forecastResponse.json();

  const currentDate = new Date().toLocaleDateString("ru-RU");

  const forecastArray = Object.values(
    forecastData.list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("ru-RU");

      // Исключаем сегодняшние данные из прогноза
      if (date !== currentDate) {
        acc[date] = acc[date] || item;
      }
      return acc;
    }, {}),
  ).slice(0, 5);

  return { currentData, forecastArray };
}

export async function getDefaultWeather() {
  try {
    const responses = await Promise.all(
      DEFAULT_CITIES.map((city) =>
        fetch(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`),
      ),
    );

    if (responses.some((response) => !response.ok)) {
      throw new Error("Город не найден");
    }

    // Возвращаем массив данных о погоде
    return await Promise.all(responses.map((res) => res.json()));
  } catch (error) {
    throw new Error("Город не найден");
  }
}

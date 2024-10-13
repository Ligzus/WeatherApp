const API_KEY = "58d01c8612f83fc2e68ef14809854068";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export async function getWeather(city) {
  const currentWeatherResponse = await fetch(
    `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  const forecastResponse = await fetch(
    `${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!currentWeatherResponse.ok || !forecastResponse.ok) {
    throw new Error("City not found or API error");
  }

  const currentData = await currentWeatherResponse.json();
  const forecastData = await forecastResponse.json();

  // Сгруппировать прогноз по дням, оставив только первый прогноз на каждый день
  const forecastArray = Object.values(
    forecastData.list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-GB');
      acc[date] = acc[date] || item; // Добавляем только первый элемент для каждой даты
      return acc;
    }, {})
  ).slice(0, 5); // Берем только 5 дней

  return { currentData, forecastArray };
}

export async function getDefaultWeather() {
  const cities = ["Лондон", "Париж", "Саранск"];

  try {
    const responses = await Promise.all(
      cities.map((city) =>
        fetch(`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`),
      ),
    );

    if (responses.some((response) => !response.ok)) {
      throw new Error("City not found or API error");
    }

    const weatherData = await Promise.all(responses.map((res) => res.json()));

    return {
      firstCityData: weatherData[0],
      secondCityData: weatherData[1],
      thirdCityData: weatherData[2],
    };
  } catch (error) {
    throw new Error("City not found or API error");
  }
}

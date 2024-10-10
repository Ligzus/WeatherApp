const API_KEY = "58d01c8612f83fc2e68ef14809854068";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export async function getWeather(city) {
  const currentWeather = await fetch(
    `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`,
  );
  const weatherForecast = await fetch(
    `${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`,
  );

  if (!currentWeather.ok || !weatherForecast.ok) {
    throw new Error("City not found or API error");
  }

  const currentData = await currentWeather.json();
  const forecastData = await weatherForecast.json();
  return { currentData, forecastData };
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

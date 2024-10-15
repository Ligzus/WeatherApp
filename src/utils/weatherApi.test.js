import { getWeather, getDefaultWeather } from "./weatherApi";

global.fetch = require("jest-fetch-mock");

describe("Weather API", () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  test("getWeather получает данные о текущей погоде и прогноз", async () => {
    // Мокируем ответ для текущей погоды
    fetch.mockResponseOnce(
      JSON.stringify({
        weather: [{ description: "Clear sky" }],
        main: { temp: 15, humidity: 60 },
        wind: { speed: 5 },
        name: "Москва",
      }),
    );

    // Мокируем ответ для прогноза
    fetch.mockResponseOnce(
      JSON.stringify({
        list: [
          {
            dt: 1601529600,
            main: { temp: 15, humidity: 60 },
            wind: { speed: 5 },
            weather: [{ icon: "04d" }],
          },
          {
            dt: 1601616000,
            main: { temp: 18, humidity: 65 },
            wind: { speed: 4 },
            weather: [{ icon: "02d" }],
          },
          {
            dt: 1601702400,
            main: { temp: 20, humidity: 70 },
            wind: { speed: 3 },
            weather: [{ icon: "01d" }],
          },
          {
            dt: 1601788800,
            main: { temp: 22, humidity: 75 },
            wind: { speed: 2 },
            weather: [{ icon: "01d" }],
          },
          {
            dt: 1601875200,
            main: { temp: 19, humidity: 68 },
            wind: { speed: 1 },
            weather: [{ icon: "02d" }],
          },
          {
            dt: 1601961600,
            main: { temp: 16, humidity: 65 },
            wind: { speed: 2 },
            weather: [{ icon: "04d" }],
          },
        ],
      }),
    );

    const { currentData, forecastArray } = await getWeather("Москва");

    expect(currentData.name).toBe("Москва");
    expect(currentData.main.temp).toBe(15);
    expect(forecastArray).toHaveLength(5);
    expect(forecastArray[0].main.temp).toBe(18);
  });

  test("getWeather прокидывает ошибку для неизвестного города", async () => {
    fetch.mockResponseOnce("", { status: 404 });
    fetch.mockResponseOnce("", { status: 404 });

    await expect(getWeather("НеверныйГород")).rejects.toThrow(
      "Город не найден",
    );
  });

  test("getDefaultWeather получает данные о погоде дефолтных городов", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        weather: [{ description: "Clear sky" }],
        main: { temp: 15, humidity: 60 },
        wind: { speed: 5 },
        name: "Лондон",
      }),
    );

    fetch.mockResponseOnce(
      JSON.stringify({
        weather: [{ description: "Rain" }],
        main: { temp: 12, humidity: 80 },
        wind: { speed: 3 },
        name: "Париж",
      }),
    );

    fetch.mockResponseOnce(
      JSON.stringify({
        weather: [{ description: "Snow" }],
        main: { temp: -5, humidity: 90 },
        wind: { speed: 1 },
        name: "Саранск",
      }),
    );

    const data = await getDefaultWeather();

    expect(data[0].name).toBe("Лондон");
    expect(data[0].main.temp).toBe(15);
    expect(data[1].name).toBe("Париж");
    expect(data[1].main.temp).toBe(12);
    expect(data[2].name).toBe("Саранск");
    expect(data[2].main.temp).toBe(-5);
  });

  test("getDefaultWeather прокидывает ошибку, если город не найден", async () => {
    fetch.mockResponseOnce("", { status: 404 });
    fetch.mockResponseOnce(
      JSON.stringify({
        weather: [{ description: "Clear sky" }],
        main: { temp: 15, humidity: 60 },
        wind: { speed: 5 },
        name: "Париж",
      }),
    );

    fetch.mockResponseOnce("", { status: 404 });

    await expect(getDefaultWeather()).rejects.toThrow("Город не найден");
  });
});

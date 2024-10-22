import React from "react";
import { render } from "@testing-library/react";
import WeatherCard from "./WeatherCard";
import "@testing-library/jest-dom/";

// Мокаем о погоде
const mockWeather = {
  icon: "04d",
  city: "Москва",
  temp: 15,
  windSpeed: 5,
  humidity: 60,
};

describe("WeatherCard", () => {
  test("компонент WeatherCard отображает данные о погоде", () => {
    const { getByText, getByAltText } = render(
      <WeatherCard weather={mockWeather} />
    );

    // Проверяем, что название города отображается
    expect(getByText(/Москва/i)).toBeInTheDocument();

    // Проверяем, что температура отображается
    expect(getByText(/15/i)).toBeInTheDocument();

    // Проверяем, что скорость ветра отображается
    expect(getByText(/💨Скорость ветра: 5 м\/с/i)).toBeInTheDocument();

    // Проверяем, что влажность отображается
    expect(getByText(/💧Влажность: 60%/i)).toBeInTheDocument();

    // Проверяем, что иконка погоды отображается
    const weatherIcon = getByAltText("weather icon");
    expect(weatherIcon).toHaveAttribute(
      "src",
      "http://openweathermap.org/img/wn/04d.png"
    );
  });
});

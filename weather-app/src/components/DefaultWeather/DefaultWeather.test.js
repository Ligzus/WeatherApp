import React from "react"; // Добавь этот импорт
import { render, act } from "@testing-library/react";
import DefaultWeather from "./DefaultWeather";

test("компонент DefaultWeather рендерится корректно", async () => {
  await act(async () => {
    const { asFragment } = render(<DefaultWeather />);
    expect(asFragment()).toMatchSnapshot();
  });
});
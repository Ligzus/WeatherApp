import React from "react"; // Добавь этот импорт
import { render, act } from "@testing-library/react";
import DefaultWeather from "./DefaultWeather";

test("renders DefaultWeather component correctly", async () => {
  await act(async () => {
    const { asFragment } = render(<DefaultWeather />);
    expect(asFragment()).toMatchSnapshot();
  });
});

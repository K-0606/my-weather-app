import React, { useCallback, useEffect, useState, useMemo } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import CloudyIcon from "./images/day-cloudy.svg?react";
import AirFlowIcon from "./images/airFlow.svg?react";
import RainIcon from "./images/rain.svg?react";
import RefreshIcon from "./images/refresh.svg?react";
import WeatherIcon from "./WeatherIcon";
import sunriseAndSunsetData from "./sunrise-sunset.json";
import SunCalc from "suncalc";
import LoadingIcon from "./images/loading.svg?react";
import WeatherCard from "./WeatherCard";
import useWeatherApi from "./useWeatherApi";
import WeatherSetting from "./WeatherSetting";
import { findLocation } from './utils';

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const theme = {
  light: {
    backgroundColor: "#ededed",
    foregroundColor: "#f9f9f9",
    boxShadow: "0 1px 3px 0 #999999",
    titleColor: "#212121",
    temperatureColor: "#757575",
    textColor: "#828282",
  },
  dark: {
    backgroundColor: "#1F2022",
    foregroundColor: "#121416",
    boxShadow:
      "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)",
    titleColor: "#f9f9fa",
    temperatureColor: "#dddddd",
    textColor: "#cccccc",
  },
};


const getMoment = () => {
  
  

  const latitude = 24.147495;
  const longitude = 120.67591;
  const now = new Date(); // 取得當前時間
  const times = SunCalc.getTimes(now, latitude, longitude); // 使用 SunCalc 計算日出日落時間
  const sunrise = times.sunrise; // 日出時間
  const sunset = times.sunset; // 日落時間

  const nowTimestamp = now.getTime(); // 當前時間的時間戳
  const sunriseTimestamp = sunrise.getTime(); // 日出時間的時間戳
  const sunsetTimestamp = sunset.getTime(); // 日落時間的時間戳

  // 如果當前時間在日出和日落之間，返回 "day"，否則返回 "night"
  return nowTimestamp >= sunriseTimestamp && nowTimestamp <= sunsetTimestamp
    ? "day"
    : "night";
};

const WeatherApp = () => {
  
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [currentPage, setCurrentPage] = useState("WeatherCard")

  const storageCity = localStorage.getItem('cityName');
  const [currentCity, setCurrentCity] = useState(storageCity || '臺中市');
  const currentLocation = findLocation(currentCity) || {};

  const [weatherElement, fetchData] = useWeatherApi(currentLocation);

  const moment = useMemo(
    () => getMoment(weatherElement.locationName),
    [weatherElement.locationName]
  );
  console.log(moment);

  useEffect(() => {
    setCurrentTheme(moment === "day" ? "light" : "dark");
  }, [moment]);

  useEffect(() => {
    localStorage.setItem('cityName', currentCity);
  }, [currentCity]);

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
      {currentPage === 'WeatherCard' && (
          <WeatherCard
          cityName={currentLocation.cityName}
            weatherElement={weatherElement}
            moment={moment}
            fetchData={fetchData}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'WeatherSetting' && (
          <WeatherSetting 
          setCurrentPage={setCurrentPage}
          cityName={currentLocation.cityName}
          setCurrentCity={setCurrentCity}
          />
        )}
       </Container>
    </ThemeProvider>
  );
};

export default WeatherApp;

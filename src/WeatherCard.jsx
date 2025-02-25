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
import CogIcon from "./images/cog.svg?react";

const WeatherCardWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
`;

const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? '1.5s' : '0s')};
  }

  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;

const RefreshIconStyled = styled(RefreshIcon)`
  margin-left: 10px;
  width: 15px;
  height: 15px;
`;
const LoadingIconStyled = styled(LoadingIcon)`
  margin-left: 10px;
  width: 15px;
  height: 15px;
`;

const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const WeatherCard = ({ weatherElement, moment, fetchData, setCurrentPage, cityName }) => {

    const {
      observationTime,
      temperature,
      windSpeed,
      description,
      weatherCode,
      rainPossibility,
      comfortability,
      isLoading,
      } = weatherElement;

    return(
        <WeatherCardWrapper>
        <Cog onClick={() => setCurrentPage('WeatherSetting')} />
        <Location>{cityName}</Location>
        <Description>
          {description} {comfortability}
        </Description>
        <CurrentWeather>
          <Temperature>
            {Math.round(temperature)} <Celsius>°C</Celsius>
          </Temperature>
          <WeatherIcon
            currentWeatherCode={weatherCode}
            moment={moment || 'day'}
          />
        </CurrentWeather>
        <AirFlow>
          <AirFlowIcon />
          {windSpeed} m/h
        </AirFlow>
        <Rain>
          <RainIcon />
          {Math.round(rainPossibility)} %
        </Rain>
        <Refresh onClick={fetchData} isLoading={isLoading}>
          最後觀測時間：
          {new Intl.DateTimeFormat('zh-TW', {
            hour: 'numeric',
            minute: 'numeric',
          }).format(new Date(observationTime))}{' '}
          {isLoading ? <LoadingIcon /> : <RefreshIcon />}
        </Refresh>
      </WeatherCardWrapper>
    )
}
export default WeatherCard;
import { useState, useEffect, useCallback } from "react";

const authorizationKey = "CWA-F1920963-658E-4BD7-9612-FC270F472025";
const fetchCurrentWeather = (locationName) => {
  return fetch(
    // `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}&stationName=${locationName}`
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}&StationName=${locationName}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Current", data);
      //console.log(data.records.Station[6].GeoInfo.CountyName);
      console.log(data.records.Station[6]);
      console.log(locationName)
      const locationData = data.records.Station[0];

      const weatherElements = {
        WindSpeed: locationData.WeatherElement.WindSpeed,
        AirTemperature: locationData.WeatherElement.AirTemperature,
        RelativeHumidity: locationData.WeatherElement.RelativeHumidity,
      };

      return {
        observationTime: locationData.ObsTime.DateTime,
        locationName: locationData.GeoInfo.CountyName,
        temperature: weatherElements.AirTemperature,
        windSpeed: weatherElements.WindSpeed,
        humid: weatherElements.RelativeHumidity,
      };
    });
};

const fetchWeatherForecast = (cityName) => {
  return fetch(
    `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorizationKey}&locationName=${cityName}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const locationData = data.records.location[0];
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (["Wx", "PoP", "CI"].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter;
          }
          return neededElements;
        },
        {}
      );

      return {
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName,
      };
    });
};
const useWeatherApi = (currentLocation) => {
  const { locationName, cityName } = currentLocation;
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: "",
    humid: 0,
    temperature: 0,
    windSpeed: 0,
    description: "",
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: "",
    isLoading: true,
  });

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(locationName),
        fetchWeatherForecast(cityName),
      ]);
      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading: false,
      });
    };
    // SunriseSunset();
    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    fetchingData();
  }, [locationName, cityName]);

  useEffect(() => {
    console.log("execute function");
    fetchData();
  }, [fetchData]);
  console.log("new fetch");
  return [weatherElement, fetchData];
};
export default useWeatherApi;

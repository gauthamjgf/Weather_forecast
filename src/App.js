import React, { useState } from "react";
import Weather from "./Weather";
import Forecast from "./Forecast";
import "./styles.css";

const App = () => {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const apiKey = "3d9aebe1e55a6a68b50cdf57338d93ad";

  const fetchWeather = async (city) => {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    try {
      const weatherResponse = await fetch(weatherApiUrl);
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);

      const forecastResponse = await fetch(forecastApiUrl);
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchWeatherByCoordinates = async (latitude, longitude) => {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
      const weatherResponse = await fetch(weatherApiUrl);
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);

      const forecastResponse = await fetch(forecastApiUrl);
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSearch = () => {
    if (cityName) {
      fetchWeather(cityName);
    }
  };

  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="app">
      <video
        className="background-video"
        src={`/videos/vid1.mp4`}
        autoPlay
        muted
        loop
      />
      <div className="container">
        {!weatherData && (
          <div className="input-section">
            <h1 className="title">WEATHER</h1>
            <video
              className="img"
              src={`/videos/vid.mp4`}
              autoPlay
              muted
              loop
              alt="Strome"
            />
            <div className="input-container">
              <input
                autoFocus
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                onKeyDown={handleKeyPress}
                className="city-input"
                placeholder="Enter city name"
              />
              <button onClick={handleSearch} className="search-button">
                Search
              </button>
              <br />
              <button
                onClick={handleLocationSearch}
                className="find-location-button"
              >
                Find My Location
              </button>
            </div>
          </div>
        )}
        {weatherData && (
          <div className="content-container">
            <div className="top-container">
              <div className="city-name">{weatherData.name}</div>
              <div className="timezone">
                Timezone: GMT{(weatherData.timezone / 3600).toFixed(1)}
              </div>
              <Weather data={weatherData} />
            </div>
            <div className="forecast-container">
              {forecastData && <Forecast data={forecastData} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

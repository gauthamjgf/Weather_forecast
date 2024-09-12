import React, { useEffect, useState } from "react";

const Weather = ({ data }) => {
  const [videoUrl, setvideoUrl] = useState("");

  const weatherDescription = data.weather[0].description;
  const temperature = (data.main.temp - 273.15).toFixed(2);
  const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  useEffect(() => {
    const setBackgroundVideoBasedOnWeather = (weatherDescription) => {
      if (weatherDescription.includes("sunny")) {
        setvideoUrl(`/videos/sun.mp4`);
      } else if (weatherDescription.includes("cloud")) {
        setvideoUrl(`/videos/cloud.mp4`);
      } else if (
        weatherDescription.includes("rain") ||
        weatherDescription.includes("shower")
      ) {
        setvideoUrl(`/videos/rainy.mp4`);
      } else if (
        weatherDescription.includes("drizzle") ||
        weatherDescription.includes("thunderstorm")
      ) {
        setvideoUrl(`/videos/drizzle.mp4`);
      } else if (weatherDescription.includes("haze")) {
        setvideoUrl(`/videos/haze.mp4`);
      } else if (weatherDescription.includes("sky")) {
        setvideoUrl(`/videos/sky.mp4`);
      } else if (weatherDescription.includes("mist")) {
        setvideoUrl(`/videos/mist.mp4`);
      } else {
        setvideoUrl(`/videos/default.mp4`);
      }
    };

    setBackgroundVideoBasedOnWeather(weatherDescription);
  }, [weatherDescription, videoUrl]);

  return (
    <div className="weather-info">
      <video autoPlay loop muted className="background-video">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="weather-details">
        <p>Weather: {weatherDescription}</p>
        <p>Temperature: {temperature}°C</p>
        <p>Sunrise: {sunriseTime}</p>
        <p>Sunset: {sunsetTime}</p>
      </div>
    </div>
  );
};

export default Weather;

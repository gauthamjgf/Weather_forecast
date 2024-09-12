import React from 'react';
import './weather-icons.min.css';
import './weather-icons-wind.min.css';

const Forecast = ({ data }) => {
  const forecastItems = data.list.filter((item, index) => index % 8 === 0).map((item) => {
    const date = new Date(item.dt * 1000);
    const weatherDescription = item.weather[0].description;
    const temperature = (item.main.temp - 273.15).toFixed(2); 

    const getIconClassName = (description) => {
      if (description.includes('clear')) return 'wi-day-sunny';
      if (description.includes('cloud')) return 'wi-day-cloudy';
      if (description.includes('rain') || description.includes('shower')) return 'wi-day-rain';
      if (description.includes('snow')) return 'wi-day-snow';
      if (description.includes('thunderstorm')) return 'wi-day-thunderstorm';
      if (description.includes('mist') || description.includes('fog')) return 'wi-day-fog';
      return 'wi-day-sunny'; 
    };

    const iconClass = `wi ${getIconClassName(weatherDescription)}`;

    return (
      <div key={item.dt} className="forecast-item">
        <p>{date.toLocaleString()}</p>
        <i className={iconClass}></i>
        <p>{weatherDescription}</p>
        <p>{temperature}°C</p>
      </div>
    );
  });

  return (
    <div className="forecast">
      <div className="forecast-container">
        {forecastItems}
      </div>
    </div>
  );
};

export default Forecast;
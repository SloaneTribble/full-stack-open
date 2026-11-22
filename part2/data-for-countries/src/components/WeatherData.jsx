import weatherService from "../services/weather"

import { useState, useEffect } from "react";

const [weatherIconPrefix, weatherIconSuffix] = ["https://openweathermap.org/payload/api/media/file/", ".png"]

const WeatherData = ({ capitalName, coordinates }) => {

  const [weather, setWeather] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState(null)

    useEffect(() => {
    weatherService
      .getWeather(coordinates)
      .then((response) => {
        console.log(response)
        setWeather(response)
        const weatherIconCode = response.weather[0].icon
        const weatherIconSrc = `${weatherIconPrefix}${weatherIconCode}${weatherIconSuffix}`
        const weatherIconAlt = response.weather[0].description

        setWeatherIcon({weatherIconSrc, weatherIconAlt})
      })

  }, [])

  console.log(weather)

  if(!weather){
    return null
  }

  return (
    <div>
        <h3>Weather in {capitalName}</h3>
        <span>Temperature: {weather.main.temp} Kelvin </span>
        <span>Wind: {weather.wind.speed} m/s</span>
        <img src={weatherIcon.weatherIconSrc} alt={weatherIcon.weatherIconAlt}></img>

    </div>
  )
  
}

export default WeatherData
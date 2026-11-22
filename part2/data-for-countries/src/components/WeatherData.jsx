import weatherService from "../services/weather"

import { useEffect } from "react";

const WeatherData = ({ coordinates }) => {

    console.log(coordinates)
    useEffect(() => {
    weatherService
      .getWeather(coordinates)
      .then((response) => {
        console.log(response)
      })

  }, [])

  return (
    <div>
        weather
    </div>
  )
  
}

export default WeatherData
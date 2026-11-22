import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather"


const getWeather = ([lat, lon]) => {
  const requestString = `${weatherUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`
  const request = axios.get(requestString);
  
  return request.then((response) => response.data);
};

const getWeatherIcon = (iconCode) => {
  const requestString = `${weatherIconPrefix}${sampleCode}${weatherIconSuffix}`
  console.log(requestString)
  const request = axios.get(requestString);
  
  return request.then((response) => {
    console.log(response.data)
    return response.data});
};

export default {
  getWeather,
  getWeatherIcon
}
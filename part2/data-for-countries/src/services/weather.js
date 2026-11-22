import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

console.log(`API Key: ${apiKey}`);

const getWeather = ([lat, lon]) => {
  const requestString = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`
  console.log(requestString)
  const request = axios.get(requestString);
  
  return request.then((response) => response.data);
};

export default {
  getWeather,
}
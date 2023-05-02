import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from "react-router-dom";

const WeatherLatitude = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [finalatitude, setFinalatitude] = useState("");
  const [finalongitude, setFinalongitude] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState();
    
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!finalatitude) {
        setError("Please enter the Latitude of your location");
        return;      
    }
    else if(!finalongitude){
      setError("Please enter the Longitude of your location"); 
      return;     
    }

    try {
      
      const api_key = "b34fd620f1f001d33939eeaf8fe8d5bd";
      const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${finalatitude}&lon=${finalongitude}&appid=${api_key}`

      const response = await axios.get(api_url);
      setWeatherData(response.data)
      setError(null)
      // setWeatherData(null)

    } catch (error) {
      setWeatherData(null)
      setError("Wrong geolocation or bad network please try again later")
      console.error(error)
    }

  }

  const handleGeolocation = (event) => {
    event.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      })
    }
    else{
      setLatitude("Geolocation is not supported by this browser");
      setLongitude("Geolocation is not supported by this browser")
    }
  }
  return (
    <Wrapper>
      <div className='container'>
        <div className="geolocation">
          <h1>Get Your Geolocation by clicking the below button</h1>
          <form action="">
            <div className="input-field">
              <input 
              type="text" 
              value={latitude}
              id="" readOnly/>
              <input 
              type="text" 
              value={longitude}
              id="" readOnly/>
            </div>
            <button onClick={handleGeolocation}>Get your Geolocation</button>
          </form>
        </div>
        <div className="weather-description">
          <h1>Get to know the exact weather in your location</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="input-filed-two">
              <input 
              type="search"
              value={finalatitude}
              onChange={(event) => setFinalatitude(event.target.value)} 
              id="" />
              <input 
              type="search"
              value={finalongitude}
              onChange={(event) => setFinalongitude(event.target.value)} 
              id="" />
            </div>
            <button type="submit">Get your location weather</button>
          </form>
          {error && (<p>{error}</p>)}
          {weatherData  && (
            <div className="weather-information">
              <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} />
              <p>{weatherData.weather[0].description}</p>
              <p>{Math.round(weatherData.main.temp - 273.15)} &#8451;</p>
              <p>{Math.round(weatherData.main.temp_max - 273.15)} &#8451;</p>
              <p>{Math.round(weatherData.main.temp_min - 273.15)} &#8451;</p>
              <p>{weatherData.timezone}</p>
              <p>{weatherData.wind.speed} m/s</p>
            </div>
          )}
        </div>
        <button><Link to={"/"}>Link to home</Link></button>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`



`
export default WeatherLatitude;
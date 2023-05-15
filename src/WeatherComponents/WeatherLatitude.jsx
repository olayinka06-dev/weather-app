import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from "react-router-dom";
import bgdesktop from "../images/pexels-pixabay-531756.jpg";
import bgdesktop1 from "../images/pexels-pixabay-314726.jpg";
import bgdesktop2 from "../images/pexels-lumn-311039 (1).jpg";
import bgdesktop3 from "../images/pexels-iconcom-216599.jpg";
import bgdesktop4 from "../images/pexels-prashant-gautam-3783385.jpg";

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
              placeholder='Get your latitude'
              id="" readOnly/>
              <input 
              type="text" 
              value={longitude}
              placeholder='Get your longitude'
              id="" readOnly/>
            </div>
            <button onClick={handleGeolocation}>Get your Geolocation</button>
          </form>
        </div>
        <div className="weather-description">
          <h1>Get to know the exact weather Update in your location</h1>
          <form action="" onSubmit={handleSubmit}>
            <div className="input-filed-two">
              <input 
              type="search"
              value={finalatitude}
              placeholder='Enter your latitude'
              onChange={(event) => setFinalatitude(event.target.value)} 
              id="" />
              <input 
              type="search"
              value={finalongitude}
              placeholder='Enter your longitude'
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

  *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .container{
      width: 100%;
      min-height: 100vh;
      background-image: url(${bgdesktop});
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 30px;
      animation: animate 10s linear infinite;
    }
    @keyframes animate {
      0%{
        background-image: url(${bgdesktop});
        background-repeat: no-repeat;
        object-fit: cover;
        overflow: hidden;
        background-size: cover;    
      }
      25%{
        background-image: url(${bgdesktop1});
        background-repeat: no-repeat;
        object-fit: cover;
        overflow: hidden;
        background-size: cover;
      }
      50%{
        background-image: url(${bgdesktop2});
        background-repeat: no-repeat;
        object-fit: cover;
        overflow: hidden;
        background-size: cover;
      }
      75%{
        background-image: url(${bgdesktop3});
        background-repeat: no-repeat;
        object-fit: cover;
        overflow: hidden;
        background-size: cover;
      }
      100%{
        background-image: url(${bgdesktop4});
        background-repeat: no-repeat;
        object-fit: cover;
        overflow: hidden;
        background-size: cover;
      }
    }

`
export default WeatherLatitude;
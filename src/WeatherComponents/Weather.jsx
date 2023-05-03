import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import bgdesktop from "../images/pexels-pixabay-531756.jpg";
function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState();


  const handleSubmit = async (event) => {
      event.preventDefault();
      if(!city){
          setError("please  enter a city/country name");
          setWeatherData("")
          return;
      }
        try {
            const apiKey = "b34fd620f1f001d33939eeaf8fe8d5bd";
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            const response = await axios.get(apiUrl)
            setWeatherData(response.data)
            setCity("");
            setError(null);
          } catch (error) {
            setError("Invalid city name. Please try again.");
            setWeatherData(null)
            console.error(error);
          }
    }; 

  return (
    <Wrapper>
        <div className="container">
            <div className="main">
                <h1>My Weather App</h1>
                <form action="" onSubmit={handleSubmit}>
                    <input 
                    type="text"
                    value={city}
                    onChange={(event) => setCity(event.target.value)} 
                    id="" />
                    <button type="submit">Search Your City/Country</button>
                </form>
                {error && (
                    <p>{error}</p>
                )}
                {
                    weatherData &&(
                        <div className="description">
                            <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} />
                            <p>Description: {weatherData.weather[0].description}</p>
                            <p>Temperature: {Math.round(weatherData.main.temp - 273.15)} &#8451;</p>
                            <p>Min Temperature: {Math.round(weatherData.main.temp_min - 273.15)} &#8451;</p>
                            <p>Max Temperature: {Math.round(weatherData.main.temp_max - 273.15)} &#8451;</p>
                            <p>Timezone: {weatherData.timezone}</p>
                            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                        </div>
                    )
                }
                <Link to={"/latitude"}>Link to latitude</Link>
            </div>
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
    }
    .main{
        width: 100%;
        max-width: 500px;
        background-color: rgb(242,243,245);
        min-height: 40vh;
        padding: 0 10px;
        display: flex;
        flex-direction: column;
    }
    .description{
        margin-top: 30px;
        padding-bottom: 20px;
        
    }
    .description p{
        background-color: white;
        padding: 10px;
        margin-top: 5px;
        border-radius:10px;
    }
    form{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }
    input{
        width: 60%;
        padding: 15px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        border: 1px solid #0563bb;
    }
    button{
        width: 40%;
        padding: 15px 0;
        background: #0563bb;
        color: white;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        outline-color: #0563bb;
        border: 1px solid #0563bb;
        cursor: pointer;
    }

    @media screen and (max-width: 950px){
        form{
            flex-direction: column;
            gap: 20px;
        }
        input{
            width: 100%;
            border-radius: 20px;
        }
        button{
            width: 100%;
            border-radius: 20px;
        }
    }

`

export default Weather;

import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios";
import bgdesktop from "../../images/pexels-pixabay-531756.jpg";
import bgdesktop1 from "../../images/pexels-pixabay-314726.jpg";
import bgdesktop2 from "../../images/pexels-lumn-311039 (1).jpg";
import bgdesktop3 from "../../images/pexels-iconcom-216599.jpg";
import bgdesktop4 from "../../images/pexels-prashant-gautam-3783385.jpg";
import WeatherData from "../Weather data/WeatherData";
import MapSketch from "../Map page/MapSketch";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              getWeatherByCoordinates(latitude, longitude);
            },
            (error) => {
              console.error('Error getting current location:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      };

    getCurrentLocation();
  }, []);



  const getWeatherByCoordinates = async (latitude, longitude) => {
    setLoading(true);
    try {
        const API_KEY = "b34fd620f1f001d33939eeaf8fe8d5bd";
        const API_URL =  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        const response = await axios.get(API_URL);
        const myCity = response.data.name;
        setWeatherData(response.data);
        setError("Loading");
        setLoading(false);
        setCity(myCity);
    } catch (error) {

        if (error.response) {
            setError(`cannot get weather update for `)
            setWeatherData(null);
            setLoading(false);
        }
        else if (error.request) {
            setError(`Poor Internet Connection, please try again later`)
            setWeatherData(null);
            setLoading(false);
        }
        else{
            setError("Something happened unexpectedly")
            setWeatherData(null);
            setLoading(false);
        }
        console.error(error);
    }
  };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        setError("")
        if(!city){
          setError("please  enter a city/country name");
          setWeatherData("")
          setLoading(false);
          return;
        }
        getCurrentWeather();
    };

    const getCurrentWeather = async () => {

        try {
            const apiKey = "b34fd620f1f001d33939eeaf8fe8d5bd";
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            const response = await axios.get(apiUrl)
            setWeatherData(response.data)
            setError("");
            setLoading(false);

          } catch (error) {
                if (error.response) {
                    setError(`cannot get weather update for ${city}`)
                    setWeatherData(null);
                    setLoading(false);

                }
                else if (error.request) {
                    setError(`Poor Internet Connection, please try again later`)
                    setWeatherData(null);
                    setLoading(false);

                }
                else{
                    setError("Something happened unexpectedly")
                    setWeatherData(null);
                    setLoading(false);

                }
            console.error(error);
          }
    };

  return (
    <Wrapper>
        <div className="container">
            <WeatherDetails className="main">
                <h1>My Weather App</h1>
                <form action="" onSubmit={handleSubmit}>
                    <input 
                    type="search"
                    placeholder="Enter the name of your city or country..."
                    value={city}
                    onChange={(event) => setCity(event.target.value)} 
                    id="" />
                    <button type="submit">Search Your City/Country</button>
                </form>
                {error && (
                    <Error>{error}</Error>
                )}
                {
                    loading ? ( 
                        <Loading>
                            <div></div>
                            <p>Loading...</p>
                        </Loading>
                    ) : (
                        <WeatherData
                        weatherData={weatherData}
                        city={city}
                    />
                    )
                }
            </WeatherDetails>
            <MapView>
                {
                    loading ? ( 
                        <Loading>
                            <div></div>
                            <p>Loading...</p>
                        </Loading>
                    ) : (
                        <MapSketch
                        weatherData={weatherData}
                        />
                    )
                }

            </MapView>
        </div>
    </Wrapper>
  )
}
const Error = styled.p`
    color: red;
`
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
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 0 30px;
        animation: animate 10s linear infinite;
        gap: 20px;
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
        outline-color: #0563bb;
    }
    button{
        width: 40%;
        padding: 15px 0;
        background: #0563bb;
        color: white;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        border: 1px solid #0563bb;
        cursor: pointer;
    }

    @media screen and (max-width: 950px){
        .container{
            flex-direction: column;
        }
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

`;
const WeatherDetails = styled.div`
    width: 100%;
    max-width: 500px;
    min-height: 40vh;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 2px solid white;
    h1{
        color: white;
    }
`;
const MapView = styled.div`
    width: 100%;
    min-height: 40vh;
    border: 2px solid white;
    border-radius: 10px;

`;
const Loading = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    color: white;

    div{
        width: 50px;
        height: 50px;
        border-left: 5px solid white;
        border-right: 5px solid white;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-radius: 50%;
        animation: loading 4s linear infinite;
    }
    @keyframes loading {
        0%{transform: rotate(0deg);}
        100%{transform: rotate(360deg);}
    }
`;

export default Weather;

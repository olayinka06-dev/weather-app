import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
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
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState(""); 

  const handleSubmit = async (event) => {
    setError(true)
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
            setError(null);
            setLoading(false);

          } catch (error) {
            setLoading(false);


                if (error.response) {
                    setError(`cannot get weather update for ${city}`)
                    setWeatherData(null);

                }
                else if (error.request) {
                    setError(`Poor Internet Connection, please try again later`)
                    setWeatherData(null);

                }
                else{
                    setError("Something happened unexpectedly")
                    setWeatherData(null);

                }
            console.error(error);
          }
    };

    const handleGeolocation = async () => {
        setLoading(true);
        
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

        try {
            const api_key = "b34fd620f1f001d33939eeaf8fe8d5bd";
            const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`

            const locationResponse = await axios.get(api_url);
            setWeatherData(locationResponse.data)
            setError(null);
            setLoading(false);
            // setCity()

        } catch (error) {
            setLoading(false);

            if (error.response) {
                setError(`cannot get weather update for ${city}`)
                setWeatherData(null);

            }
            else if (error.request) {
                setError(`Poor Internet Connection, please try again later`)
                setWeatherData(null);

            }
            else{
                setError("Something happened unexpectedly")
                setWeatherData(null);

            }
            console.error(error);
        }
      }
      useEffect(() => {
        handleGeolocation();
      });
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
                        <div>
                            <div></div>
                            <p>Loading...</p>
                        </div>
                    ) : (
                        <WeatherData
                        weatherData={weatherData}
                        city={city}
                    />
                    )
                }
                <Link to={"/latitude"}>Link to latitude</Link>
            </WeatherDetails>
            <Map>
                <MapSketch/>
            </Map>
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
    /* background-color: rgb(242,243,245); */
    min-height: 40vh;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    h1{
        color: white;
    }
`;
const Map = styled.div`
    
`

export default Weather;

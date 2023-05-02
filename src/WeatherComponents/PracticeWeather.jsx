import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';


const PracticeWeather = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState();
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (map && weatherData) {
            const leafletMap = L.map(map).setView([weatherData.coord.lat, weatherData.coord.lon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(leafletMap);
            L.marker([weatherData.coord.lat, weatherData.coord.lon]).addTo(leafletMap)
                .bindPopup(`<b>${weatherData.name}</b><br>${weatherData.weather[0].description}<br>Temperature: ${Math.round(weatherData.main.temp - 273.15)} °C`)
                .openPopup();
            return () => leafletMap.remove();
        }
    }, [map, weatherData]);
    
      
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
    // useEffect(() => {
    //     if(city){
    //         const apiKey = "b34fd620f1f001d33939eeaf8fe8d5bd";
    //         const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    //         axios.get(apiUrl)
    //         .then((response) => {
    //             setWeatherData(response.data)
    //             setError(null);
    //             setCity(null)
    //         })
    //         .catch((error)=> {
    //             setError("Invalid city name. Please try again.");
    //             setWeatherData(null);
    //             console.error(error)
    //         })
    //     }
    // }, [city])

    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     if(!city){
    //         setError("please  enter a city/country name");
    //         return;
    //     }
    //     // setWeatherData(null);
    //     // setError(null);
    //     setCity(city)
    // }
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
                            <div id="map" style={{ height: "400px" }} ref={(el) => setMap(el)}></div>
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
        background-color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 30px;
    }
    .main{
        width: 100%;
        max-width: 500px;
        background-color: orange;
        min-height: 40vh;
        padding: 0 10px;
        display: flex;
        flex-direction: column;
    }
    .description{
        margin-top: 30px;
        padding-bottom: 20px;
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
        border: none;
    }
    button{
        width: 40%;
        padding: 15px 0;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        border: none;
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
export default PracticeWeather;
import React from 'react';
import styled from 'styled-components';

const WeatherData = ({weatherData, city}) => {
  return (
    <Wrapper>
        {
            weatherData &&(
                <Description className="description">
                    <h2>The Weather information {city} is :</h2>
                    <div>Weather-Icon: <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} /></div>
                    <p>Description: {weatherData.weather[0].description}</p>
                    <p>Temperature: {Math.round(weatherData.main.temp - 273.15)} &#8451;</p>
                    <p>Min Temperature: {Math.round(weatherData.main.temp_min - 273.15)} &#8451;</p>
                    <p>Max Temperature: {Math.round(weatherData.main.temp_max - 273.15)} &#8451;</p>
                    <p>Timezone: {weatherData.timezone}</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </Description>
            )
        }
    </Wrapper>
  )
}
const Wrapper = styled.div`
    
`;
const Description = styled.div`

    margin-top: 30px;
    padding-bottom: 20px;
        
    div{
        background-color: white;
        padding: 1px; 
        border-radius:10px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding-left: 10px;
    }
    h2{
        color: white;
    }
    p{
        background-color: white;
        padding: 10px;
        margin-top: 5px;
        border-radius:10px;
    }
`
export default WeatherData;
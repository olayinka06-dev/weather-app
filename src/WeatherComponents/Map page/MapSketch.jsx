import React, { useState, useEffect } from 'react';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import styled from 'styled-components';
import '../../index.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';

const MapSketch = ({weatherData}) => {
    const [map, setMap] = useState(null);


    useEffect(() => {
        if (map && weatherData) {
            const leafletMap = L.map(map).setView([weatherData.coord.lat, weatherData.coord.lon], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
            }).addTo(leafletMap);
            L.marker([weatherData.coord.lat, weatherData.coord.lon], {
                icon: L.divIcon({
                  html: ReactDOMServer.renderToString(<FaMapMarkerAlt style={{fontSize: "30px",position: "relative", bottom: "10px", right: "10px",}} />)
                })
              })
                .addTo(leafletMap)
                .bindPopup(`<b>Country: ${weatherData.sys.country}</b><br>City: ${weatherData.name}<br>`)
                .openPopup();
            return () => leafletMap.remove();
        }
    }, [map, weatherData]);


      
  return (
    <Wrapper>
      <Map id="map"  ref={(el) => setMap(el)}></Map>
    </Wrapper>
  )
}
const Wrapper = styled.div`
    
`;
const Map = styled.div`
  height: 60vh;
  width: 100%;
`;
export default MapSketch;
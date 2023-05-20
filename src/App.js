import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WeatherLatitude from './WeatherComponents/WeatherLatitude';
import Weather from './WeatherComponents/search weather/Weather';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Weather/>}/>
        <Route path="/latitude" element={<WeatherLatitude/>}/>
      </Routes> 
    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import Weather from '../search weather/Weather';
import Preloader from '../Preloader page/Preloader';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setInterval(()=> {
        setIsLoading(false);
    }, 3000)
  }, []);

  return (
    <main>
      {isLoading ? (<Preloader />) : (<Weather />)}
    </main>
  );
}

export default Home;
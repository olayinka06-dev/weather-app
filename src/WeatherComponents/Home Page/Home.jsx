import React, { useState } from 'react';
import Weather from '../search weather/Weather';
import Preloader from '../Preloader page/Preloader';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    window.addEventListener("load", ()=>{
        setIsLoading(false)
    })
  return (
    <main>
        {
            isLoading ? (<Preloader/>) : (<Weather/>)
        }
    </main>
  )
}

export default Home;
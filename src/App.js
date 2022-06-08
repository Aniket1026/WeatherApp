import React from 'react';
import './App.css';
import WeatherData from './Components/weather_data';

// import background from './images/weather-background.webp'

const App = () => {
  return (
    <div className='backgorund'>
      {/* <img src={background} alt='bg-images' ></img> */}
      <div className='img'></div>
      <WeatherData/>
    </div>
  )
}

export default App;

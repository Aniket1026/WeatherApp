/* eslint-disable react-hooks/exhaustive-deps */
import  {React , useState, useEffect} from "react";
import axios from "axios";
import './weather_data.css'
import weather from '../images/weather-background.webp'
import cloud from '../images/cloud-background.jpg'
import clear from '../images/clear-background.jpg'
import haze from "../images/haze-background.jpg";
import rain from "../images/rain-background.jpg";
import smoke from "../images/smoke-background.webp";


const WeatherData = () => {
    
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(weather);
  
  
  
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;
  
  const background =(event) => {
    if (data.weather) {
      if (data.weather[0].main === "Clear") {
        setImage(clear);
        console.log("hui");
      } else if (data.weather[0].main === "Clouds") {
        setImage(cloud);
      } else if (data.weather[0].main === "Haze") {
        setImage(haze);
      } else if (data.weather[0].main === "Rain") {
        setImage(rain);
      } else if (data.weather[0].main === "Smoke") {
        setImage(smoke);
      } else {
        setImage(weather)
      }
    }
  }
  
  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        if (response.status === 404) {
          throw Error("The entered place is not valid ")
        }
        else {
          setData(response.data);
          console.log(response.data);
        }
      }).catch(error => console.log(error.message));
      setLocation("");
    }
  };
  
  useEffect(() => {
    background()
  }, [background,location])
  
    
    return (
      <div className="weather_data" >
        <div className="img"> <img src={image} alt='backgorund' /></div>
        <input
          type="text"
          placeholder="Enter Location "
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
          onKeyPress={background && searchLocation}
          
        />
        <div className=" temperature">
          <div className="data-display">
            <div className="city"> {data.name}</div>
            <div className=" temp">
              {" "}
              {data.main ? data.main.temp.toFixed() : ""}F{" "}
            </div>
          </div>
          <div className="detail">
            {" "}
            {data.weather ? data.weather[0].main : ""}
          </div>
        </div>
        <div className="all-details">
          <div className="feels">
            <li> {data.main ? data.main.feels_like.toFixed() : ""}F</li>
            <li> Feels Like</li>
          </div>
          <div className="humidity">
            <li> {data.main ? data.main.humidity.toFixed() : ""} %</li>
            <li> humidity</li>
          </div>
          <div className="speed">
            <li> {data.wind ? data.wind.speed.toFixed() : ""} MPH</li>
            <li> Winds</li>
          </div>
        </div>
      </div>
    );
}
export default WeatherData;
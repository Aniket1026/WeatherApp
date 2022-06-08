import  {React , useState } from "react";
import axios from "axios";
import './weather_data.css'

const WeatherData = () => {
    
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

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
    
    return (
      <div className="weather_data">
        <input
          type="text"
          placeholder="Enter Location "
          value={location}
                onChange={(event) => {
                    setLocation(event.target.value)
                }}
          onKeyPress={searchLocation}
        />
        <div className=" temperature">
          <div className="data-display">
            <div className="city"> {data.name }</div>
                    <div className=" temp"> {data.main ? data.main.temp.toFixed() : ""}F </div>
          </div>
                <div className="detail"> { data.weather ? data.weather[0].main : ""}</div>
        </div>
        <div className="all-details">
          <div className="feels">
            <li> {data.main? data.main.feels_like.toFixed() : ""}F</li>
            <li> Feels Like</li>
          </div>
          <div className="humidity">
            <li> {data.main ? data.main.humidity.toFixed(): ""} %</li>
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
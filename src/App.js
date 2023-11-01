import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import axios from 'axios';
import { useEffect, useState } from "react";

function App() {

  const apiKey = "4bb4a46aa787985edaaebbb8b6d917ce"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})

  const  getWetherDetails = (cityName) => {

    if(!cityName) return
    const apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)

      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  }

  const handleSearch = () => {
    getWetherDetails(inputCity)
  }

  const handleChangeInput = (e) =>{
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  return (
    <div classname="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control" value={inputCity} onChange={handleChangeInput}/>
          <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
        </div>
      </div>
      
{Object.keys(data).length > 0 && 
      <div className="resultSection">
          <div className="shadow rounded wetherResultBox">
            <img className="weatherIcon" src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />

            <h5 className="weatherCity">{data?.name}</h5>
            <h6 className="weatherTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
          </div>
      </div>
}

    </div>
  );
}

export default App;

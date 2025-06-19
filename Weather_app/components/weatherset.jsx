import React from "react";
import './style.css'
import { useState,useEffect } from "react";

function Weather(){
    const [city,setCity]=useState("");
    const [temperature,setTemperature]=useState("");
    const [humidity,setHumidity]=useState("");
    const [windspeed,setWindspeed]=useState("");
    const [cities,setCities]=useState("");
    // const [icons,setIcons]=useState("");
    

    function handleinput(e){
        setCity(e.target.value);
    }

    function handlesearch(){
        if(city.trim()===""){
            alert("You haven't provided anything");
            return;
        }
        setCities(city);
        setCity("");
    }

    useEffect(()=>{
       async function fetching (){
         
         try{
            const report=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=0b7cc7890b097980b40cc4c8f3225228&units=metric`);
            const data=await report.json();

            if(report.ok){
                setTemperature(`${data.main.temp} °C`);
                setHumidity(`${data.main.humidity} %`);
                setWindspeed(`${data.wind.gust} m/s`);
                // setIcons(`https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`);

            }
            else{
                console.error("City not found:",data.message);
            }
         }
         catch(err){
            console.error("Error fetching weather data:", err);
         }
       }
       fetching();
    },[cities])
    
    return(
       <div className="container">
          <div className="searchbar">
            <input className="inputbar" type="text" placeholder="search" value={city} onChange={handleinput} />
           <button className="searchbutton" onClick={handlesearch}> <i className="fa-solid fa-magnifying-glass"></i> </button> 
          </div>

          <div className="weathericon">
              <i className="sunicon" class="fa-solid fa-sun"></i>
          </div>

          <div className="cityname">
            <p>{temperature}</p>
            <p>{cities}</p>
          </div>

          <div className="weatherterms">
            <div className="humidity_measure">
                <div className="humidity_symbol"><span><i class="fa-solid fa-water"></i></span></div>
                <div className="humidity">
                    <p>{humidity}</p>
                    <p>Humidity</p>
                </div>
            </div>
            <div className="windspeed_measure">
                <div className="windspeed_symbol"><span><i class="fa-solid fa-wind"></i></span></div>
                <div className="windspeed">
                    <p>{windspeed}</p>
                    <p>Wind Speed</p>
                </div>
            </div>
          </div>

       </div>

    );

}


export default Weather;
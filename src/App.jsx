import React, { useEffect, useState } from 'react'
import TopButtons from './components/TopButtons.jsx'
import Inputs from './components/Inputs.jsx'
import TimeandLocation from './components/TimeandLocation.jsx'
import TemperatureAndDetails from './components/TemperatureAndDetails.jsx'
import Forecast from './components/Forecast.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getFormattedWeather from './services/Weather.js'
import { Audio } from 'react-loader-spinner'
import Loader from './components/Loader.jsx'

function App() {

  const [query,setQuery]=useState({q:"Bangalore"});
  const [units,setUnits]=useState("metric");
  const [weather , setWeather]=useState(null);


  useEffect(()=>{
    const fetchWeather= async ()=>{
    const message =query.q?query.q:"current location";

    // toast.info("Fetching weather for "+ message);



     await getFormattedWeather({...query,units}).then(
      (data)=>{
        toast.success(
          `Successfully fetched weather for ${data.name} , ${data.country}`
        )
        setWeather(data);
      }
     );
    };
  fetchWeather();
  },[query,units]);

const formatBackground=()=>{
  if(!weather) return "from-cyan-700 to-blue-700";
  const threshold=units === "metric" ? 20:60;
  if(weather.temp <= threshold) return "from-cyan-700 to-blue-700"

  return "from-yellow-700 to-orange-700";
}

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 shadow-xl shadow-gray-400 ${formatBackground()}`}>
         <TopButtons setQuery={setQuery}/>
         <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
         {weather && (
            <div>
         <TimeandLocation weather={weather} />
         <TemperatureAndDetails weather={weather} />
         <Forecast title='Hourly Podcast' items={weather.hourly} />
         <Forecast title='Daily Podcast' items={weather.daily}/>
         <ToastContainer autoClose={1000} theme='colored' newestOnTop={true} />
            </div>
         )}

    </div>
  )
}



export default App;
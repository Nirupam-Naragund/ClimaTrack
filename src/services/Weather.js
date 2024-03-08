import { DateTime } from "luxon";


const API_KEY="8fa7ea1ea00dfaa19d8b0124458917f0";
const BASE_URL="https://api.openweathermap.org/data/2.5"


const getWeatherData=(infoType,searchParams)=>{
    const url=new URL(BASE_URL+"/"+infoType);
    url.search=new URLSearchParams({...searchParams,appid:API_KEY})


    return fetch(url)
    .then((res)=>res.json())
   

};

const formatCurrentWeather=(data)=>{
    const {
        coord:{lat,lon},
        main:{temp,feels_like,temp_min,temp_max,humidity},
        name,
        dt,
        sys:{country,sunrise,sunset},
        weather,
        wind:{speed}
    }=data
     
    const {main:details,icon}=weather[0]


    return {lat ,lon,temp,temp_max,temp_min,humidity,name,country,speed,dt,country,sunrise,sunset,details,icon,feels_like}
}


const formatForecastWeather = (data) => {
    let daily;
    let hourly;
    let timezone = "Asia/kolkata";

    daily = data.list
        .filter((_, index) => index % 8 === 0)
        .map((d) => ({
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.main.temp,
            icon: d.weather[0].icon
        }));

    hourly = data.list.slice(0, 5)
        .map((d) => ({
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.main.temp,
            icon: d.weather[0].icon
        }));

    return { timezone, daily, hourly };
};



const getFormattedWeather= async (searchParams)=>{
    const formattedCurrentWeather=await getWeatherData('weather',searchParams).then(formatCurrentWeather);
    
    const {lat,lon}=formattedCurrentWeather;

    const formattedForecastWeather=await getWeatherData('forecast',{
        lat,
        lon,
        exclude:'current,minutely,alerts',
        units:searchParams.units,
    }).then(formatForecastWeather)

    return {...formattedCurrentWeather , ...formattedForecastWeather} 
}

const formatToLocalTime=(secs,zone,format="cccc ,dd LLL yyyy '| Local time:'hh:mm a'")=> DateTime.fromSeconds(secs)
.setZone(zone).toFormat(format);

const iconUrlFromCode=(code)=>{
    `https://openweathermap.org/img/wn/${code}@2x.png`
    console.log(code);
}

export default getFormattedWeather

export {formatToLocalTime,iconUrlFromCode}
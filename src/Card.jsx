import React, { useState, useEffect } from "react"
import axios from "axios"
const Card = () => {
    const [Data, setData] = useState([]);
    const [search_val, setsearch_val] = useState("delhi")
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    var d = new Date();
    var date;
    var directionObject = {
        north: {
            minDeg: 0,
            maxDeg: 90
        },
        east: {
            minDeg: 90,
            maxDeg: 180
        },
        South: {
            minDeg: 180,
            maxDeg: 270
        },
        west: {
            minDeg: 270,
            maxDeg: 360
        },
    }

    let cloudIcon = {
        'mist': 'https://ssl.gstatic.com/onebox/weather/48/mists.png',
        'few clouds': 'https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png',
        'clear sky': 'https://ssl.gstatic.com/onebox/weather/48/sunny.png',
        'scattered clouds': 'https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png',
        'broken clouds': 'https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png',
        'shower rain': 'https://ssl.gstatic.com/onebox/weather/48/rain_light.png',
        'rain': 'https://ssl.gstatic.com/onebox/weather/48/rain.png',
        'thunderstorm': 'https://ssl.gstatic.com/onebox/weather/48/thunderstorms.png',
        'snow': 'https://ssl.gstatic.com/onebox/weather/48/snows.png',
        'haze': 'https://ssl.gstatic.com/onebox/weather/64/fog.png',
        'overcast clouds': 'https://ssl.gstatic.com/onebox/weather/64/fog.png'
    }
    useEffect(() => {
        const fetch_url = `http://api.openweathermap.org/data/2.5/weather?q=${search_val}&units=metric&APPID=7c6268d6866043a6b5b612a350c540a9`
        async function fetchdata() {
            const request = await axios.get(fetch_url);
            const repodata = request.data;
            if (repodata.wind.deg >= 225 && repodata.wind.deg < 315)
                repodata.wind.direction = "West"
            else if (repodata.wind.deg >= 135 && repodata.wind.deg < 225)
                repodata.wind.direction = "South"
            else if (repodata.wind.deg >= 45 && repodata.wind.deg < 135)
                repodata.wind.direction = "East"
            else
                repodata.wind.direction = "North"

            setData(repodata);
            console.log(repodata)

        };
        fetchdata();
    }, [search_val]);
    useEffect(() => {
        if (Data.main) {
            setIsDataLoaded(true)
        }
        else
            setIsDataLoaded(false)

    }, [Data])
    return (
        <>
            <div className="main_container">
                <div className="input_field"> <input type="text" onChange={(element) => {
                    setsearch_val(element.target.value)
                }} placeholder="Search city name..." /></div>
                <>
                    {!isDataLoaded ? (<p>Loading...</p>) : (
                        <div className="data_container">
                            <div className="Row-1"><div><img src={cloudIcon[Data.weather[0].description]} alt="Reload..." /> <span>{Data.main.feels_like} °C</span>
                                <h3>{Data.weather[0].description}</h3>
                                <span><i className="fas fa-street-view"></i></span> <span><strong >{search_val}</strong></span>
                            </div>
                                <div className="coordinate"><p>Time Now: {d.getHours()}:{d.getMinutes()}:{d.getSeconds()}.</p>
                                    <p>Logitude: {Data.coord.lon}</p><p>Latitude: {Data.coord.lat}</p></div></div>
                            <div className="Row-2">
                                <div><p>Maxi.-Temp: {Data.main.temp_max} °C </p>
                                    <p>Humidity: {Data.main.humidity}%</p>
                                    <p>Sunrise:{new Date(Data.sys.sunrise * 1000).getHours()}:{new Date(Data.sys.sunrise * 1000).getMinutes()}:{new Date(Data.sys.sunrise * 1000).getSeconds()}</p>
                                    <p>Wind_Direction:- {Data.wind.deg}° /{Data.wind.direction}</p>
                                </div>
                                <div>
                                    <p> Min.-Temp: {Data.main.temp_min} °C</p>
                                    <p> Pressure: {Data.main.pressure}Pa</p>
                                    <p>Sunset:- {new Date(Data.sys.sunset * 1000).getHours()}:{new Date(Data.sys.sunset * 1000).getMinutes()}:{new Date(Data.sys.sunset * 1000).getSeconds()}</p>
                                    <p>Wind_velocity:-{Data.wind.speed} m/s</p>
                                </div>

                            </div>

                        </div>)}

                </>

            </div>
        </>
    );

}
export default Card;
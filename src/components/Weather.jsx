import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import HourlyForecast from "./HourlyForecast";

//api key
const APIKey = import.meta.env.VITE_API_KEY;

export default function Weather() {
  const [data, setData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [location, setLocation] = useState("Islamabad");
  const [inputValue, setInputValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent page from refreshing
    if (inputValue !== "") {
      setLocation(inputValue);
    }
    const input = document.querySelector("input");
    input.value = "";
    console.log(inputValue);
  };

  //fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch current weather
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`;
        const weatherResponse = await axios.get(weatherUrl);
        setData(weatherResponse.data);
        setErrorMsg("");

        // Fetch 5-day forecast
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${APIKey}&units=metric`;
        const forecastResponse = await axios.get(forecastUrl);
        setHourlyData(forecastResponse.data.list);
      } catch (error) {
        setErrorMsg("Location not found");
      }
    };

    fetchWeatherData();
  }, [location]);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ImSpinner8 className=" text-white animate-spin h-12 w-12" />
      </div>
    );
  }
  //setting icons
  let icon;
  // console.log(data.weather[0].main);

  switch (data.weather[0].main) {
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
    default:
      icon = <IoMdSunny />;
  }

  // console.log(data);

  let date = new Date();

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-black/30 rounded-3xl p-10 w-full gap-5 ">
        <div className=" w-full max-w-[450px]">
          <div className="flex justify-center items-center text-red-500">
            <h3>{errorMsg}</h3>
          </div>
          <form onChange={(e) => handleInput(e)}>
            <div className="flex justify-between items-center bg-black/50 text-white p-2 mt-2 rounded-full gap-2">
              <div className="flex flex-1">
                <input
                  type="text"
                  placeholder="Search by City or Country"
                  className="h-12 pl-3 outline-none rounded-full flex-1"
                  onChange={handleInput}
                />
              </div>
              <div className="flex items-center justify-center bg-blue-500 p-2 w-20 h-12 rounded-full">
                <button
                  onClick={(e) => handleSubmit(e)}
                  className=" cursor-pointer"
                >
                  <IoMdSearch className="text-2xl" />
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* Card */}
        <div className="flex flex-col justify-center  bg-black/30 rounded-3xl p-8 w-full max-w-[450px] text-white">
          {/* Card Top */}
          <div className="flex items-center gap-5 ">
            <div className="text-[100px]">{icon}</div>
            <div>
              <div className="text-2xl font-bold">
                {data.name},{data.sys.country}
              </div>
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                {date.getUTCFullYear()}
              </div>
            </div>
          </div>
          {/* Card Body */}
          <div>
            <div>
              <div className="flex text-[100px] justify-center items-center">
                {parseInt(data.main.temp)}
                <TbTemperatureCelsius className="text-4xl" />
              </div>
              <div className="capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>
          </div>
          {/* Card Bottom */}
          <div className=" w-full mt-15 max-w-[350px] flex flex-col justify-center gap-y-4">
            <div className="row flex gap-10">
              <div className="col flex gap-x-2">
                <div>
                  <BsEye className="text-[20px]" />
                </div>
                <div>
                  Visibility: <span>{data.visibility / 1000}km</span>
                </div>
              </div>
              <div className="col flex gap-x-2">
                <div>
                  <BsThermometer className="text-[20px]" />
                </div>
                <div className="flex">
                  Feels Like: {parseInt(data.main.feels_like)}
                  <TbTemperatureCelsius />
                </div>
              </div>
            </div>
            <div className="row flex gap-10">
              <div className="col flex gap-x-2">
                <div>
                  <BsWater className="text-[20px]" />
                </div>
                <div>
                  Humidity: <span>{data.main.humidity}%</span>
                </div>
              </div>
              <div className=" w-auto col flex gap-x-2">
                <div>
                  <BsWind className="text-[20px]" />
                </div>
                <div>
                  Wind: <span>{data.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {hourlyData && <HourlyForecast hourlyData={hourlyData} />}
    </>
  );
}

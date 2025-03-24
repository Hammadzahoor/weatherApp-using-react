import React from "react";
import Weather from "./components/Weather";

export default function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className="text-4xl text-center font-bold text-white">
          Weather App
        </h1>
        <div>
          <Weather />
        </div>
      </div>
    </>
  );
}

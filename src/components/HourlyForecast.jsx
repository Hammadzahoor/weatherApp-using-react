import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HourlyForecast = ({ hourlyData }) => {
  const next24Hours = hourlyData.slice(0, 8);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        // text: "5-Day Temperature Forecast",
        text: "24-Hour Temperature Forecast",
        color: "white",
      },
    },
    scales: {
      y: {
        // suggestedMin: 0,
        // beginAtZero: true,
        suggestedMax: 50,
        ticks: {
          color: "white",
          stepSize: 3,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "white",
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  const data = {
    // labels: hourlyData.map((hour) => {
    labels: next24Hours.map((hour) => {
      const date = new Date(hour.dt * 1000);
      //   return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:00`;
      return `${date.getHours()}:00`;
    }),
    datasets: [
      {
        label: "Temperature (°C)",
        // data: hourlyData.map((hour) => hour.main.temp),
        data: next24Hours.map((hour) => hour.main.temp),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
      },
      {
        label: "Current Temperature (°C)", // New dataset for current temperature
        data: [hourlyData[0].main.temp], // Assuming the first item is the current temperature
        borderColor: "rgb(255, 99, 132)", // Different color for current temperature
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
        pointRadius: 5, // Make the current temperature point more visible
      },
    ],
  };

  return (
    <div className=" flex justify-center items-center w-full max-w-[800px] bg-black/30 rounded-3xl p-8 mt-8">
      <Line options={options} data={data} />
    </div>
  );
};

export default HourlyForecast;

import React from "react";
import { enGB } from "date-fns/locale";
import "chartjs-adapter-date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const options = {
  responsive: true,
  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: false,
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Percentage",
      },
      min: 0,
      max: 100,
      ticks: {
        callback: function (value) {
          return value + "%";
        },
      },
    },
    x: {
      adapters: {
        date: { locale: enGB },
      },
      type: "time",
      distribution: "linear",
      time: {
        //   parser: "yyyy-MM-dd",
        unit: "hour",
        displayFormats: {
          millisecond: "HH:mm:ss a",
          second: "HH:mm:ss a",
          minute: "HH:mm:ss",
          hour: "MMM do h aaaa",
          day: "iii:HH:mm:ss a",
          week: "HH:mm:ss a",
          month: "MMM iii HH",
          quarter: "HH:mm:ss a",
          year: "HH:mm:ss a",
        },
      },
      ticks: {
        source: "data",
        // callback: function (value) {
        //   console.log(value);
        //   return new Date(value).toLocaleDateString("en-GB", {
        //     month: "short",
        //     year: "numeric",
        //   });
        // },
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

function RainfallChart({ precipChance, graphPeriods }) {
  const data = {
    labels: graphPeriods,
    datasets: [
      {
        label: "Precipitation chance",
        data: precipChance,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  };

  return (
    <>
      <Line data={data} key="Precipitation" options={options} />
    </>
  );
}

export default RainfallChart;

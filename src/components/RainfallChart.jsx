import React, { useRef, useEffect } from "react";
import ChartControls from "./ChartControls";
import { enGB } from "date-fns/locale";
import "chartjs-adapter-date-fns";
import "../styles/chartControls.css";
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
  BarElement,
  Filler,
} from "chart.js";
import { Line, Chart } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { Container, Row, Col, Stack } from "react-bootstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  BarElement,
  Filler,
  zoomPlugin
);

const options = {
  responsive: true,
  interaction: {
    mode: "index",
    axis: "xy",
    intersect: false,
  },
  maintainAspectRatio: false,
  scales: {
    "y-axis-chance": {
      // title: {
      //   display: true,
      //   text: "Precipitation chance",
      // },
      min: 0,
      max: 100,
      grid: {
        borderDash: [3, 3],
      },
      ticks: {
        callback: function (context) {
          return context + "%";
        },
      },
    },
    "y-axis-amount": {
      // title: {
      //   display: true,
      //   text: "Precipitation amount",
      // },
      min: 0,
      max: 20,
      ticks: {
        callback: function (context) {
          return context + "mm";
        },
      },
    },
    x: {
      adapters: {
        date: { locale: enGB },
      },
      grid: {
        borderDash: [3, 3],
      },
      type: "time",
      distribution: "linear",
      time: {
        unit: "hour",
        displayFormats: {
          hour: "MMM do h aaaa",
        },
      },
      ticks: {
        source: "data",
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Precipitation outlook",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";
          let value = context.formattedValue || "";
          const suffix = context.datasetIndex === 0 ? " %" : "mm";
          return label + ": " + value + suffix;
        },
      },
    },
    zoom: {
      pan: {
        enabled: true,
        mode: "xy",
        // modifierKey: "ctrl",
      },
      limits: {
        x: { min: "original", max: "original" },
        y: { min: "original", max: "original" },
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "x",
        // drag: {
        //   enabled: true,
        //   threshold: 20,
        // },
      },
    },
  },
};

function RainfallChart({ precipChance, graphPeriods, precipAmount }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      console.log("ChartJS", chart);
    }
  }, []);

  const data = {
    labels: graphPeriods,
    datasets: [
      {
        type: "line",
        fill: false,
        label: "Precipitation chance",
        yAxisID: "y-axis-chance",
        data: precipChance,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132)",
        lineTension: 0.2,
        pointRadius: 0,
      },
      {
        type: "line",
        fill: true,
        label: "Precipitation amount",
        yAxisID: "y-axis-amount",
        backgroundColor: "rgb(75, 192, 192)",
        data: precipAmount,
        pointRadius: 0,
        borderColor: "white",
        lineTension: 0.2,
        // borderWidth: 2,
        // barThickness: "flex",
      },
    ],
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgb(255, 99, 132)",
  };

  return (
    <>
      <Stack>
        <Container className="chart-container">
          <Line
            data={data}
            key="Precipitation"
            options={options}
            ref={chartRef}
          />
        </Container>
        {chartRef.current && <ChartControls chartRef={chartRef} />}
      </Stack>
    </>
  );
}

export default RainfallChart;

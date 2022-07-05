import React, { useRef, useMemo, useState, useEffect } from "react";
import ChartControls from "./ChartControls";
import "chartjs-adapter-luxon";
import { DateTime } from "luxon";
import "../styles/RainfallChart.css";
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
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { Container, Row, Col } from "react-bootstrap";
import useForecast from "../hooks/useForecast";
import { chunkArray } from "../utilities/helpers";

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

function RainfallChart({ coordinates }) {
  const chartRef = useRef(null);
  const [graphPeriods, setGraphPeriods] = useState([]);
  const [precipChance, setPrecipChance] = useState([]);
  const [precipAmount, setPrecipAmount] = useState([]);
  const [temperatures, setTemperatures] = useState([]);
  const { forecast, isForecastLoading } = useForecast(coordinates);

  // set chart data arrays from forecast
  useEffect(() => {
    if (isForecastLoading) return;
    let precipChances = [];
    let periods = [];
    let precipAmounts = [];
    let temperatureValues = [];
    if (!forecast) return;
    let chunkedData = chunkArray(forecast, 2);
    const precipitationData = chunkedData.map((el) => {
      return el[1];
    });
    precipitationData.forEach((el) => {
      const { from } = el;
      const {
        location: {
          precipitation: { value, minvalue, maxvalue, probability },
        },
      } = el;
      const mean =
        minvalue && maxvalue
          ? (parseFloat(minvalue) + parseFloat(maxvalue)) / 2
          : value;
      precipChances.push(probability);
      precipAmounts.push(mean);
      periods.push(from);
    });
    console.log(precipitationData);
    setPrecipAmount(precipAmounts);
    setPrecipChance(precipChances);
    setGraphPeriods(periods);

    const pointData = chunkedData.map((el) => {
      return el[0];
    });
    pointData.forEach((el) => {
      const {
        location: {
          temperature: { value },
        },
      } = el;
      temperatureValues.push(parseFloat(value));
    });
    setTemperatures(temperatureValues);
  }, [forecast, isForecastLoading]);

  const options = useMemo(
    () => ({
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
            borderColor: "#4BC0C0",
          },
          ticks: {
            callback: function (context) {
              return context + "%";
            },
            color: "#212529",
          },
        },
        "y-axis-temperature": {
          // title: {
          //   display: true,
          //   text: "Precipitation chance",
          // },
          min: 0,
          max: 50,
          grid: {
            borderColor: "#4BC0C0",
          },
          ticks: {
            callback: function (context) {
              return context + "°C";
            },
            color: "#212529",
          },
        },
        "y-axis-amount": {
          min: 0,
          max: 20,
          grid: {
            borderColor: "#4BC0C0",
          },
          ticks: {
            callback: function (context) {
              return context + "mm";
            },
            color: "#212529",
          },
        },
        x: {
          adapters: {
            date: { locale: "IE" },
          },
          grid: {
            borderColor: "#4BC0C0",
          },
          type: "time",
          distribution: "linear",
          time: {
            unit: "hour",
            displayFormats: {
              hour: "f",
            },
          },
          ticks: {
            // source: "data",
            color: "#212529",
          },
          min: graphPeriods.at(0), // utc date string without timezone, example: "2022-06-08T20:00:00Z"
          max: DateTime.fromISO(graphPeriods.at(0))
            .plus({ days: 1 })
            .toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", { zone: "utc" }), // result is utc date string without timezone example: "2022-06-08T20:00:00Z"
        },
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            padding: 4,
            font: {
              size: 19,
            },
          },
        },
        // title: {
        //   display: false,
        //   text: "Precipitation outlook",
        // },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              let value = context.formattedValue || "";
              // const suffix = context.datasetIndex === 0 ? " %" : "mm";
              const suffix = () => {
                switch (label) {
                  case "Precipitation chance":
                    return " %";
                  case "Precipitation amount":
                    return " mm";
                  default:
                    return "°C";
                }
              };
              return label + ": " + value + suffix();
            },
          },
        },
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          limits: {
            x: {
              min: DateTime.fromISO(graphPeriods.at(0)), // date #
              max: DateTime.fromISO(graphPeriods.at(-1)), // date #
            },
            y: { min: "original", max: "original" },
          },
          zoom: {
            wheel: {
              enabled: true,
              speed: 0.1,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    }),
    [graphPeriods]
  );
  const data = {
    labels: graphPeriods,
    datasets: [
      {
        type: "line",
        fill: false,
        label: "Temperature",
        yAxisID: "y-axis-temperature",
        data: temperatures,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        lineTension: 0.2,
        pointRadius: 0,
      },
      {
        type: "line",
        fill: false,
        label: "Precipitation chance",
        yAxisID: "y-axis-chance",
        data: precipChance,
        borderColor: "rgb(11, 94, 215)",
        backgroundColor: "rgb(11, 94, 215)",
        lineTension: 0.2,
        pointRadius: 0,
      },
      {
        type: "line",
        fill: true,
        label: "Precipitation amount",
        yAxisID: "y-axis-amount",
        data: precipAmount,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "white",
        lineTension: 0.2,
        pointRadius: 0,
      },
    ],
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgb(255, 99, 132)",
  };
  return (
    <Container className="py-4 rounded-3 bg-light mb-5" id="weather-graph">
      <Row>
        <Col className="chart-container">
          <Line
            data={data}
            key="Precipitation"
            options={options}
            ref={chartRef}
          />
        </Col>
      </Row>
      <Row className="pt-2 ">
        <Col>{chartRef.current && <ChartControls chartRef={chartRef} />}</Col>
      </Row>
    </Container>
  );
}

export default RainfallChart;

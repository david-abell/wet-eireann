import React, { useRef, useEffect, useState, useMemo } from "react";
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

function RainfallChart({ precipChance, graphPeriods, precipAmount }) {
  const chartRef = useRef(null);

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
            date: { locale: "IE" },
          },
          grid: {
            borderDash: [3, 3],
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
            source: "data",
          },
          min: graphPeriods.at(0), // utc date string without timezone, example: "2022-06-08T20:00:00Z"
          max: DateTime.fromISO(graphPeriods.at(0))
            .plus({ days: 2 })
            .toFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", { zone: "utc" }), // result is utc date string without timezone example: "2022-06-08T20:00:00Z"
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
      },
    ],
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgb(255, 99, 132)",
  };
  return (
    <Container>
      <Row>
        <Col className="chart-container border">
          <Line
            data={data}
            key="Precipitation"
            options={options}
            ref={chartRef}
          />
        </Col>
      </Row>
      <Row className="pt-5 ">
        <Col className="align-self-center mx-auto">
          {chartRef.current && <ChartControls chartRef={chartRef} />}
        </Col>
      </Row>
    </Container>
  );
}

export default RainfallChart;

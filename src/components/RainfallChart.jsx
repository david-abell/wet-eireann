import React, { useRef, useEffect, useState, useMemo } from "react";
import ChartControls from "./ChartControls";
import { enGB } from "date-fns/locale";
import "chartjs-adapter-date-fns";
import { add, sub } from "date-fns";
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

function RainfallChart({ precipChance, graphPeriods, precipAmount }) {
  const chartRef = useRef(null);
  const [minRange, setMinRange] = useState(initRange(0));
  const [maxRange, setMaxRange] = useState(initRange(-1));
  const [minMeanRange, setMinMeanRange] = useState(initMeanRange(0));
  const [maxMeanRange, setMaxMeanRange] = useState(initMeanRange(-1));
  const [sliderValue, setSliderValue] = useState(0);
  // useEffect(() => {
  //   const chart = chartRef.current;
  //   if (chart) {
  //     console.log("ChartJS", chart);
  //   }
  // }, []);
  function initRange(index) {
    if (graphPeriods.at(index)) {
      return new Date(graphPeriods.at(index)).getTime();
    }
  }
  function initMeanRange(index) {
    // expect start and end indexses, 0 or -1 only
    const range1 = initRange(index);
    const range2 = !index
      ? add(new Date(graphPeriods.at(0)), { days: 3 }).getTime()
      : sub(new Date(graphPeriods.at(-1)), { days: 3 }).getTime();
    return range1 && range2 && (range1 + range2) / 2;
  }
  // useEffect(() => {
  //   const range = minRange;
  //   if (range) {
  //     console.log("Slider range", range);
  //   }
  // }, []);

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
          min: graphPeriods.at(0), // utc date string
          max: add(new Date(graphPeriods.at(0)), { days: 1 }), // utc date string
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
              min: new Date(graphPeriods.at(0)), // date #
              max: new Date(graphPeriods.at(-1)), // date #
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
        {chartRef.current && (
          <ChartControls
            chartRef={chartRef}
            minRange={minMeanRange}
            maxRange={maxMeanRange}
            setMinRange={setMinMeanRange}
            setMaxRange={setMaxMeanRange}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
            graphPeriods={graphPeriods}
          />
        )}
      </Stack>
    </>
  );
}

export default RainfallChart;

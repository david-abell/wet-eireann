import { ButtonToolbar, ButtonGroup, Button, Form } from "react-bootstrap";
import React, { useRef, useState, useEffect } from "react";
import ChartButton from "./ChartButton";
import { add, sub } from "date-fns";

function ChartControls({
  chartRef,
  minRange,
  maxRange,
  setMinRange,
  setMaxRange,
  sliderValue,
  setSliderValue,
  graphPeriods,
}) {
  const [sliderRange, setSliderRange] = useState(getSliderRange());

  function getSliderRange() {
    if (!graphPeriods) return;
    const range = chartRef.current.scales.x.ticks;
    return range.length;
  }

  const actions = [
    {
      name: "Scroll left",
      handler(chart) {
        chart.pan({ x: 150 }, undefined, "default");
      },
    },
    {
      name: "Scroll right",
      handler(chart) {
        chart.pan({ x: -150 }, undefined, "default");
      },
    },
    {
      name: "Zoom in",
      handler(chart) {
        chart.zoom(1.1);
      },
    },
    {
      name: "Zoom out",
      handler(chart) {
        chart.zoom(0.9);
      },
    },
    {
      name: "Reset chart",
      handler(chart) {
        chart.resetZoom();
      },
    },
  ];

  const getPeriod = (value) => {
    const index = Math.round((graphPeriods.length / 100) * value);
    console.log(value, sliderRange);
    if (index !== 0 && !index) return null;
    if (index > graphPeriods.length) {
      console.log("last");
      return graphPeriods.at(-1);
    }
    if (index < -1) {
      return graphPeriods.at(0);
    }
    return graphPeriods.at(index);
  };

  const handleSlider = (e) => {
    console.log(sliderRange);
    let value = Number(e.target.value);
    if (!chartRef || !graphPeriods) return;
    const { ticks } = chartRef.current.scales.x;
    if (!ticks.length) return;
    if (value < sliderRange) {
      value += sliderRange;
    }
    if (sliderRange > 100 - value) {
      value -= sliderRange;
    }
    // console.log(chartRef.current);
    const periodStart = getPeriod(value - sliderRange);
    // const periodMid = getPeriod(value);
    const periodEnd = getPeriod(value + sliderRange);
    setSliderValue(Number(e.target.value));
    chartRef.current.zoomScale(
      "x",
      {
        min: new Date(periodStart).getTime(),
        max: new Date(periodEnd).getTime(),
      },
      "none"
    );
    // chartRef.current.pan({ x: 0.01 }, undefined, "none");
    e.target.blur();
  };
  return (
    <>
      <Form.Range
        min={0}
        max={100}
        // min={minRange}
        // max={maxRange}
        value={sliderValue}
        onChange={handleSlider}
      />

      <ButtonToolbar className="m-auto">
        {actions.map((props) => {
          return (
            <ChartButton {...props} key={props.name} chartRef={chartRef} />
          );
        })}
      </ButtonToolbar>
    </>
  );
}

export default ChartControls;

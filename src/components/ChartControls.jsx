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
    console.log(value);
    if (index !== 0 && !index) return null;
    if (index >= graphPeriods.length) {
      console.log("last");
      return graphPeriods.at(-1);
    }
    if (index < -1) {
      return graphPeriods.at(0);
    }
    return graphPeriods.at(index);
  };

  const handleSlider = (e) => {
    let value = Number(e.target.value);
    if (!chartRef || !graphPeriods) return;
    const { ticks } = chartRef.current.scales.x;
    if (!ticks.length) return;
    const range = Math.floor(ticks.length / 2);
    if (value < range) {
      value += range;
    }
    if (range > 100 - value) {
      value -= range;
    }
    const periodStart = getPeriod(value - range);
    const periodMid = getPeriod(value);
    const periodEnd = getPeriod(value + range);
    setSliderValue(Number(e.target.value));
    chartRef.current.zoomScale(
      "x",
      {
        min: new Date(periodStart).getTime(),
        max: new Date(periodEnd).getTime(),
      },
      "none"
    );
    chartRef.current.pan({ x: 0.01 }, undefined, "none");
    console.log(
      new Date(chartRef.current.scales.x.min),
      new Date(chartRef.current.scales.x.max)
    );
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

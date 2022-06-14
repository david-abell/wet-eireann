import { ButtonToolbar, Form } from "react-bootstrap";
import React, { useRef, useState, useEffect } from "react";
import ChartButton from "./ChartButton";

function ChartControls({
  chartRef,
  sliderValue,
  setSliderValue,
  graphPeriods,
  sliderRange,
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
    const nextValue = Number(e.target.value);
    const current = sliderValue.current;
    setSliderValue({
      old: current,
      current: nextValue,
    });

    if (!chartRef.current || !graphPeriods || current === null) return;
    const sliderPercent =
      (Math.max(nextValue, current) - Math.min(nextValue, current)) / 100;
    const visibleWidth =
      chartRef.current.chartArea.width / (sliderRange / graphPeriods.length);
    const panAmount =
      nextValue > current
        ? sliderPercent * visibleWidth * -1
        : sliderPercent * visibleWidth;
    chartRef.current.pan({ x: panAmount }, undefined, "none");

    e.target.blur();
  };
  return (
    <>
      {sliderRange && (
        <Form.Range
          min={0}
          max={100}
          value={sliderValue.current}
          onChange={handleSlider}
        />
      )}

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

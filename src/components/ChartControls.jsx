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

    // if (!chartRef || !graphPeriods) return;
    // const ScrollPercent = (value / graphPeriods.length) * 100;
    // let scale = sliderRange / graphPeriods.length;
    // const { ticks } = chartRef.current.scales.x;
    // if (ticks && ticks.length) {
    //   scale = scale / ticks.length;
    // }
    // const halfRange = Math.floor(sliderRange / 2);
    // const chartWidth = chartRef.current.width / 100;
    // const panAmount =
    //   value > sliderValue
    //     ? chartWidth * ScrollPercent
    //     : chartWidth * ScrollPercent * -1;

    // if (!ticks.length) return;
    // if (value <= halfRange) {
    //   value += halfRange;
    // }
    // if (halfRange >= 100 - value) {
    //   value -= halfRange;
    // }
    // const periodStart = getPeriod(value);
    // const periodMid = getPeriod(value);
    // const periodEnd = getPeriod(value + sliderRange);
    // console.log("periodStart, periodEnd", periodStart, periodEnd);
    // chartRef.current.zoomScale(
    //   "x",
    //   {
    //     min: new Date(periodStart).getTime(),
    //     max: new Date(periodEnd).getTime(),
    //   },
    //   "none"
    // );
    // chartRef.current.pan({ x: panAmount }, undefined, "none");
  };
  return (
    <>
      <Form.Range
        min={0}
        max={100}
        // min={minRange}
        // max={maxRange}
        value={sliderValue.current}
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

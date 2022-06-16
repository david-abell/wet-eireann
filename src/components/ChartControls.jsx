import { ButtonToolbar, Form } from "react-bootstrap";
import React, { useRef, useState, useEffect } from "react";
import ChartButton from "./ChartButton";

function ChartControls({ chartRef }) {
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

  return (
    <>
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

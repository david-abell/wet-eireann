import { ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";
import React, { useRef } from "react";
// import ChartButton from "./ChartButton";

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
        chart.zoom(1.2);
      },
    },
    {
      name: "Zoom out",
      handler(chart) {
        chart.zoom(0.8);
      },
    },
    {
      name: "Reset chart",
      handler(chart) {
        chart.resetZoom();
      },
    },
  ];

  const handleClick = (e, handler) => {
    e.target.blur();
    handler(chartRef?.current);
  };
  return (
    <ButtonToolbar className="m-auto">
      {actions.map(({ name, handler }) => {
        return (
          <Button
            key={name}
            onClick={(e) => handleClick(e, handler)}
            className="mx-1"
          >
            {name}
          </Button>
        );
      })}
    </ButtonToolbar>
  );
}

export default ChartControls;

import { Button } from "react-bootstrap";
import React from "react";

function ChartButton({ name, handler, chartRef }) {
  const handleClick = (e, handler) => {
    e.target.blur();
    handler(chartRef?.current);
  };

  return <Button onClick={(e) => handleClick(e, handler)}>{name}</Button>;
}

export default ChartButton;

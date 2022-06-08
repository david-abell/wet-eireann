import { Button } from "bootstrap";
import React from "react";

function ChartButton({ name, handler }) {
  return (
    <Button key={name} onClick={handler} className="mx-1">
      {name}
    </Button>
  );
}

export default React.forwardRef(ChartButton);

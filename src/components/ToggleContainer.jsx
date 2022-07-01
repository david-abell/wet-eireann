import { Container, Button } from "react-bootstrap";
import { useState } from "react";
import { cloneElement } from "react";

function ToggleContainer({ children }) {
  const [visibleChildren, setVisibleChildren] = useState(children.length);

  if (visibleChildren) {
    return (
      <Container className="pb-2">
        {children.map((child) => {
          const clonedChild = cloneElement(child, {
            setVisibleChildren: setVisibleChildren,
          });
          return clonedChild;
        })}
      </Container>
    );
  }
  return (
    <Container className="pb-4 px-0 d-flex">
      <Button
        onClick={() => setVisibleChildren(children.length)}
        className="flex-grow-1 btn-warning"
      >
        Show Weather Warnings
      </Button>
    </Container>
  );
}

export default ToggleContainer;

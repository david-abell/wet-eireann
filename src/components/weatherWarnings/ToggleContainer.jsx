import { Container, Button, Placeholder } from "react-bootstrap";
import { useState } from "react";
import { cloneElement } from "react";
import useWarnings from "../../hooks/useWarnings";

function ToggleContainer({ children }) {
  const [visibleChildren, setVisibleChildren] = useState(children.length);
  const { isLoading } = useWarnings();

  if (visibleChildren) {
    return (
      <Container className="pb-4 d-flex flex-column gap-4">
        <Button
          onClick={() => setVisibleChildren(0)}
          className="flex-grow-1 btn-warning"
        >
          Hide all Warnings
        </Button>

        {children.map((child) => {
          const clonedChild = cloneElement(child, {
            setVisibleChildren,
          });
          return clonedChild;
        })}
      </Container>
    );
  }
  return (
    <Container className="pb-4 px-0 d-flex">
      {isLoading ? (
        <Placeholder.Button
          className="btn-warning w-100 flex-grow-1"
          variant=""
        >
          Loading warnings...
        </Placeholder.Button>
      ) : (
        <Button
          onClick={() => setVisibleChildren(children.length)}
          className="flex-grow-1 btn-warning"
        >
          {children.length ? "Show " + children.length : "No"} active weather
          warnings
        </Button>
      )}
    </Container>
  );
}

export default ToggleContainer;

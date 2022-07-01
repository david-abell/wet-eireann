import { Alert, Container } from "react-bootstrap";
import { useState } from "react";
import { DateTime } from "luxon";

function WeatherWarning({ warning, setVisibleChildren }) {
  const [show, setShow] = useState(true);
  const { headline, description, onset, expires } = warning;
  let dangerVariant = "danger";
  if (warning.parameter[0].value.toLowerCase().includes("yellow")) {
    dangerVariant = "warning";
  }
  if (warning.parameter[0].value.toLowerCase().includes("orange")) {
    dangerVariant = "dark";
  }
  if (warning.parameter[0].value.toLowerCase().includes("red")) {
    dangerVariant = "danger";
  }

  const onClose = () => {
    setShow(false);
    setVisibleChildren((count) => (count -= 1));
  };

  if (show) {
    return (
      <Container className="px-0">
        <Alert variant={dangerVariant} onClose={onClose} dismissible>
          <Alert.Heading>{headline}</Alert.Heading>
          <p>{description}</p>
          <p>
            <time dateTime={onset} />
            Onset:{" "}
            {DateTime.fromISO(onset).toLocaleString(DateTime.DATETIME_MED)}
          </p>
          <p>
            <time dateTime={expires} />
            Expires:{" "}
            {DateTime.fromISO(expires, { zone: "utc" }).toLocaleString(
              DateTime.DATETIME_MED
            )}
          </p>
        </Alert>
      </Container>
    );
  }
}

export default WeatherWarning;

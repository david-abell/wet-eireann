import HourBodyData from "./HourBodyData";
import { DateTime } from "luxon";
import { Accordion } from "react-bootstrap";

function HourBody({ hourData, date }) {
  const hour = DateTime.fromISO(hourData[0]?.from).toLocaleString(
    DateTime.TIME_SIMPLE
  );
  return (
    <Accordion.Body className="border-bottom">
      <HourBodyData hour={hour} hourData={hourData} />
    </Accordion.Body>
  );
}

export default HourBody;

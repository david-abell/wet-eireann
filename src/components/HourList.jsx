import HourRow from "./HourRow";
import { Row, Col } from "react-bootstrap";
import { DateTime } from "luxon";
import { Accordion } from "react-bootstrap";

function HourList({ hourData, date }) {
  // console.log(hourData);
  const hour = DateTime.fromISO(hourData[0]?.from).toLocaleString(
    DateTime.TIME_SIMPLE
  );
  return (
    <Accordion.Body>
      <HourRow hour={hour} hourData={hourData} />
      {/* <>
        {hours &&
          Object.values(hours).map((el) => {
            return <HourRow></HourRow>;
          })}
      </> */}
    </Accordion.Body>
  );
}

export default HourList;

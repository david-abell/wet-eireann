import HourRow from "./HourRow";
import { Row, Col } from "react-bootstrap";
import { DateTime } from "luxon";

function HourList({ hourData }) {
  // console.log(hourData);
  const hour = DateTime.fromISO(hourData[0]?.from).toLocaleString(
    DateTime.TIME_SIMPLE
  );
  return (
    <>
      <HourRow hour={hour} hourData={hourData} />
      {/* <>
        {hours &&
          Object.values(hours).map((el) => {
            return <HourRow></HourRow>;
          })}
      </> */}
    </>
  );
}

export default HourList;

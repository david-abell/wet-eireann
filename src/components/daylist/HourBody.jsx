import HourBodyData from "./HourBodyData";
import { DateTime } from "luxon";

function HourBody({ hourData }) {
  const hour = DateTime.fromISO(hourData[0]?.from).toLocaleString(
    DateTime.TIME_SIMPLE
  );
  return (
    <HourBodyData hour={hour} hourData={hourData} className="border-bottom" />
  );
}

export default HourBody;

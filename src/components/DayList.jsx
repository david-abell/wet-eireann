import DayRow from "./DayRow";
import { Accordion } from "react-bootstrap";

function DayList({ dayData }) {
  return (
    <Accordion
      defaultActiveKey={["0"]}
      alwaysOpen
      className="rounded-3"
      id="daily-forecast"
    >
      {dayData &&
        Object.entries(dayData).map((el, index) => {
          return <DayRow day={el} eventKey={String(index)} key={el[0]} />;
        })}
    </Accordion>
  );
}

export default DayList;

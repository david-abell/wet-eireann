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
      {Object.keys(dayData).length ? (
        Object.entries(dayData).map((el, index) => {
          return <DayRow day={el} eventKey={String(index)} key={el[0]} />;
        })
      ) : (
        <span>Loading</span>
      )}
    </Accordion>
  );
}

export default DayList;

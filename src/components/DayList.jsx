import DayRow from "./DayRow";
import { Accordion } from "react-bootstrap";

function DayList({ dayData }) {
  return (
    <Accordion
      // defaultActiveKey={["daylist0"]}
      alwaysOpen
      className="rounded-3  bg-light"
      id="daily-forecast"
    >
      {Object.keys(dayData).length ? (
        Object.entries(dayData).map((el, index) => {
          return (
            <DayRow day={el} eventKey={String("daylist" + index)} key={el[0]} />
          );
        })
      ) : (
        <span>Loading</span>
      )}
    </Accordion>
  );
}

export default DayList;

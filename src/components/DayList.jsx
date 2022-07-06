import DayRow from "./DayRow";
import { Accordion, Placeholder } from "react-bootstrap";

const AccordionPlaceholder = () => {
  return (
    <Placeholder animation="glow">
      <Placeholder
        as={Accordion.Header}
        className="justify-content-between w-100 border-bottom"
      >
        <span>loading forecast...</span>
      </Placeholder>
    </Placeholder>
  );
};
function DayList({ dayData }) {
  return (
    <Accordion alwaysOpen className="rounded-3  bg-light" id="daily-forecast">
      {!Object.keys(dayData).length
        ? Array(10)
            .fill()
            .map((_, index) => {
              return (
                <AccordionPlaceholder
                  key={"AccordianPlaceholder" + String(index)}
                />
              );
            })
        : Object.entries(dayData).map((el, index) => {
            return (
              <DayRow
                day={el}
                eventKey={String("daylist" + index)}
                key={el[0]}
              />
            );
          })}
    </Accordion>
  );
}

export default DayList;

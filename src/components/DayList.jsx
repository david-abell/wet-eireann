import DayRow from "./DayRow";
import { Accordion, Placeholder } from "react-bootstrap";
import useGroupedForecast from "../hooks/useGroupedForecast";
import useGlobalState from "../hooks/useGlobalState";

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

function DayList() {
  const [geoLocation] = useGlobalState("geoLocation");
  const {
    data: { dayData },
    isFetching,
    isLoading,
    isIdle,
  } = useGroupedForecast(geoLocation["coordinates"]);

  return (
    <Accordion alwaysOpen className="rounded-3  bg-light" id="daily-forecast">
      {isIdle || isLoading || isFetching
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

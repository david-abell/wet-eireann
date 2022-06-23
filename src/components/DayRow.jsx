import HourList from "./HourList";
import { Row, Col } from "react-bootstrap";
import { Accordion } from "react-bootstrap";

function DayRow({ day, eventKey }) {
  const [date, data] = day;
  return (
    <Accordion.Item eventKey={eventKey} key={date}>
      <Accordion.Header>
        <Col>{date}</Col>
      </Accordion.Header>
      {data &&
        data.map((el, index) => {
          return <HourList hourData={el} date={date} key={date + index} />;
        })}
    </Accordion.Item>
  );
}

export default DayRow;

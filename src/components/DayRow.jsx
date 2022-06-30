import HourBody from "./HourBody";
import { Row, Col } from "react-bootstrap";
import { Accordion } from "react-bootstrap";

function DayRow({ day, eventKey }) {
  const [date, data] = day;
  return (
    <Accordion.Item eventKey={eventKey} key={date}>
      <Accordion.Header>
        <Col>{date}</Col>
      </Accordion.Header>
      <Accordion.Body>
        {data &&
          data.map((el, index) => {
            return <HourBody hourData={el} date={date} key={date + index} />;
          })}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default DayRow;

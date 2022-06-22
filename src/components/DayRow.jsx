import HourList from "./HourList";
import { Row, Col } from "react-bootstrap";

function DayRow({ day }) {
  const [date, data] = day;
  return (
    <>
      <Row key={date}>
        <Col>
          <h3>{date}</h3>
        </Col>
      </Row>
      <>
        {data &&
          data.map((el) => {
            return <HourList hourData={el} />;
          })}
      </>
    </>
  );
}

export default DayRow;

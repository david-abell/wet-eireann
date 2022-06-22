import DayRow from "./DayRow";
import { Container } from "react-bootstrap";

function DayList({ dayData }) {
  return (
    <Container>
      {dayData &&
        Object.entries(dayData).map((el) => {
          return <DayRow day={el} />;
        })}
    </Container>
  );
}

export default DayList;

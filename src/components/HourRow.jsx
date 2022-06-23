import { Row, Col } from "react-bootstrap";
import WeatherSymbol from "./WeatherSymbol";

function HourRow({ hour, hourData }) {
  const temperature = hourData[0].location.temperature.value;
  const symbolName = hourData[1].location.symbol.id;
  return (
    <Row className="border-bottom">
      <Col>{hour}</Col>
      <Col>{temperature} &deg;C</Col>
      <Col>
        <WeatherSymbol symbolName={symbolName} />
      </Col>
      <Col>
        <WeatherSymbol symbolName={"Wind"} />
      </Col>
      <Col>Precipitation icon, chance</Col>
      <Col>Wind icon, direction, speed</Col>
    </Row>
  );
}

export default HourRow;

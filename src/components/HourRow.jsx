import { Row, Col } from "react-bootstrap";
import WeatherSymbol from "./WeatherSymbol";

function HourRow({ hour, hourData }) {
  const temperature = hourData[0].location.temperature.value;
  const symbolName = hourData[1].location.symbol.id;
  const precipChance = hourData[1].location.precipitation.value;
  const windDirection = hourData[0].location.windDirection.name;
  const windDegree = hourData[0].location.windDirection.deg;
  const windSpeed = hourData[0].location.windSpeed.mps;
  console.log(hourData);
  return (
    <Row className="align-items-center">
      <Col>{hour}</Col>
      <Col>{temperature} &deg;C</Col>
      <Col>
        <WeatherSymbol symbolName={symbolName} />
      </Col>
      {/* <Col>
        <Row>
          <Col>
            <WeatherSymbol symbolName={"Wind"} />
          </Col>
          <Col>Wind icon, direction, speed</Col>
        </Row>
      </Col> */}
      <Col>
        <WeatherSymbol symbolName={"Wind"} />
      </Col>
      <Col>{windDirection}</Col>
      {/* <Col>{windDirection}</Col> */}
      <Col>{Math.round(windSpeed * 3.6) + " km/h"}</Col>
      <Col>
        <WeatherSymbol symbolName={"Raindrops"} />
      </Col>
      <Col>{precipChance * 100 + "%"}</Col>
    </Row>
  );
}

export default HourRow;

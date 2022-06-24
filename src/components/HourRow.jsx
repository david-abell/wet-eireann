import { Row, Col } from "react-bootstrap";
import WeatherSymbol from "./WeatherSymbol";

function HourRow({ hour, hourData }) {
  const temperature = hourData[0].location.temperature.value;
  const symbolName = hourData[1].location.symbol.id;
  const precipChance = hourData[1].location.precipitation.value;
  const windDirection = hourData[0].location.windDirection.name;
  const windDegree = hourData[0].location.windDirection.deg;
  const windSpeed = hourData[0].location.windSpeed.mps;
  return (
    <Row className="align-items-center hour-row">
      <Col xl={6} sm={12} lg={6} md={5}>
        <Row className="align-items-center">
          <Col className="d-flex justify-content-center">
            <p className="my-0">{hour}</p>
          </Col>
          <Col className="d-flex justify-content-center">
            <p className="my-0">{temperature} &deg;C</p>
          </Col>
          <Col className="d-flex justify-content-center">
            <WeatherSymbol symbolName={symbolName} />
          </Col>
        </Row>
      </Col>
      <Col sm={12} xl={4} lg={3} md={4} className="text-center">
        <Row className="align-items-center">
          <Col className="d-flex justify-content-center">
            <WeatherSymbol symbolName={"Wind"} rotateDegree={windDegree - 90} />
          </Col>
          <Col className="d-flex justify-content-center">
            <b className="my-0">{windDirection}</b>
          </Col>
          <Col className="d-flex justify-content-center">
            <b className="my-0">{Math.round(windSpeed * 3.6) + " km/h"}</b>
          </Col>
        </Row>
      </Col>
      <Col className="text-center" sm={12} xl={2} lg={2} md={3}>
        <Row className="align-items-center justify-content-center">
          <Col className="d-flex justify-content-center">
            <WeatherSymbol symbolName={"Raindrops"} />
          </Col>
          <Col className="d-flex justify-content-center">
            <b className="my-0">{precipChance * 100 + "%"}</b>
          </Col>
        </Row>
      </Col>
      <Col></Col>
    </Row>
  );
}

export default HourRow;

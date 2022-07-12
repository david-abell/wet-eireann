import { Row, Col, Container } from "react-bootstrap";
import WeatherSymbol from "./WeatherSymbol";
// import { DateTime } from "luxon";

function HourBodyData({ hour, hourData }) {
  const temperature = hourData[0].location.temperature.value;
  const symbolName = hourData[1].location.symbol.id;
  let precipAmount;
  const minPrecip = hourData[1].location.precipitation.minvalue;
  const maxPrecip = hourData[1].location.precipitation.maxvalue;
  if (minPrecip && maxPrecip) {
    precipAmount = (
      (parseFloat(minPrecip) + parseFloat(maxPrecip)) /
      2
    ).toFixed(2);
  } else {
    precipAmount = hourData[1].location.precipitation.value;
  }
  const precipChance = Math.round(
    hourData[1].location.precipitation.probability
  );
  const windDirection = hourData[0].location.windDirection.name;
  const windDegree = hourData[0].location.windDirection.deg;
  const windSpeed = hourData[0].location.windSpeed.mps;
  return (
    <Container>
      <Row className="align-items-center hour-row py-2 border-bottom">
        <Col sm={12} md={4}>
          <Row className="align-items-center">
            <Col className="d-flex justify-content-center">
              <b className="my-0">{hour}</b>
            </Col>
            <Col className="d-flex justify-content-center">
              <b className="my-0">{temperature} &deg;C</b>
            </Col>
            <Col className="d-flex justify-content-center">
              <WeatherSymbol symbolName={symbolName} />
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={4} className="text-center">
          <Row className="align-items-center">
            <Col className="d-flex justify-content-center">
              <WeatherSymbol
                symbolName={"Wind"}
                rotateDegree={windDegree - 90}
              />
            </Col>
            <Col className="d-flex justify-content-center">
              <b className="my-0">{windDirection}</b>
            </Col>
            <Col className="d-flex justify-content-center">
              <b className="my-0">{Math.round(windSpeed * 3.6) + " km/h"}</b>
            </Col>
          </Row>
        </Col>
        <Col className="text-center" sm={12} md={4}>
          <Row className="align-items-center justify-content-center">
            <Col className="d-flex justify-content-center">
              <WeatherSymbol symbolName={"Raindrops"} />
            </Col>
            <Col className="d-flex justify-content-center">
              <b className="my-0">{precipAmount + " mm"}</b>
            </Col>

            <Col className="d-flex justify-content-center">
              <b className="my-0">
                {precipChance || precipChance === 0 ? precipChance + "%" : ""}
              </b>
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default HourBodyData;

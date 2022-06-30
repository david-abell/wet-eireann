import { Container, Row, Col, Accordion } from "react-bootstrap";
import { useState, useEffect } from "react";
import WeatherSymbol from "./WeatherSymbol";
import { getDayMinMaxAverages } from "../utilities/helpers";
import {
  getMinRoundedValue,
  getMaxRoundedValue,
  getAverageRoundedValue,
} from "../utilities/helpers";
import FlexColumnWrapper from "./FlexColumnWrapper";
import SimpleColumnInner from "./SimpleColumnInner";
function TodayCard({ geoLocation, dayData }) {
  const [todayDate, setTodayDate] = useState(() => Object.keys(dayData)[0]);
  const [todayData, setTodayData] = useState(parseDayData());
  const [firstHourData, setFirstHourData] = useState(
    Object.values(dayData)[0][0]
  );

  function parseDayData() {
    return getDayMinMaxAverages(Object.values(dayData)[0]);
  }
  useEffect(() => {
    const [targetDate, targetData] = Object.entries(dayData)[0];
    setTodayDate(targetDate);
    setTodayData(getDayMinMaxAverages(targetData));
    setFirstHourData(Object.values(dayData)[0][0]);
  }, [dayData]);

  return (
    <Accordion className="rounded-3 bg-light">
      <Accordion.Item eventKey={"todaycard0"}>
        <Accordion.Header>
          <Container className="d-flex flex-column flex-md-row align-items-center justify-content-center">
            <FlexColumnWrapper>
              <Col sm={12}>
                {todayData && (
                  <>
                    <p className="h1">{geoLocation.name}</p>
                    <p className="h5">{todayDate}</p>
                  </>
                )}
              </Col>
            </FlexColumnWrapper>
            {todayData && (
              <FlexColumnWrapper>
                <Col sm={12}>
                  <Row>
                    <Col sm={12}>
                      <p className="h5 mb-0">Currently</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <p className="display-1">
                        {Math.round(
                          firstHourData[0].location.temperature.value
                        )}
                        &deg;C
                      </p>
                    </Col>
                  </Row>
                </Col>
              </FlexColumnWrapper>
            )}
            {todayData && (
              <FlexColumnWrapper>
                <Col sm={12}>
                  <Row>
                    <Col sm={12}>
                      <p className="h2">
                        H - {getMaxRoundedValue(todayData.temperature)}&deg;C
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <p className="h4">
                        L - {getMinRoundedValue(todayData.temperature)}&deg;C
                      </p>
                    </Col>
                  </Row>
                </Col>
              </FlexColumnWrapper>
            )}
            <Col className="d-flex align-items-center justify-content-center">
              {todayData && (
                <WeatherSymbol
                  symbolName={todayData.symbol[0]}
                  size={"12rem"}
                />
              )}
            </Col>
            {/* <Col className="d-flex align-items-center justify-content-center">
            <Row className="text-center">
            </Row>
          </Col> */}
          </Container>
        </Accordion.Header>
        <Accordion.Body>
          <Container className="d-flex flex-column flex-md-row align-items-center justify-content-center">
            {todayData && (
              <FlexColumnWrapper data={todayData}>
                <SimpleColumnInner title={"Precipitation"}>
                  {getAverageRoundedValue(todayData.precipitation.probability) >
                  0
                    ? `${getAverageRoundedValue(
                        todayData.precipitation.probability
                      )} % up to ${Math.max(
                        ...todayData.precipitation.maxvalue
                      )} mm`
                    : "no precipitation expected"}
                </SimpleColumnInner>
              </FlexColumnWrapper>
            )}
            {todayData && (
              <FlexColumnWrapper>
                <SimpleColumnInner title={"Humidity"}>
                  {getMinRoundedValue(todayData.humidity)}
                  {" - "}
                  {getMaxRoundedValue(todayData.humidity)}%
                </SimpleColumnInner>
              </FlexColumnWrapper>
            )}
            {todayData && (
              <FlexColumnWrapper>
                <SimpleColumnInner title={"Pressure"}>
                  {getMinRoundedValue(todayData.pressure)}
                  {" - "}
                  {getMaxRoundedValue(todayData.pressure)}hPa
                </SimpleColumnInner>
              </FlexColumnWrapper>
            )}
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default TodayCard;

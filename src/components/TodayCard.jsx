import { Container, Row, Col, Accordion, Placeholder } from "react-bootstrap";
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
import { DateTime } from "luxon";
function TodayCard({ geoLocation, dayData }) {
  const [todayDate, setTodayDate] = useState("");
  const [todayData, setTodayData] = useState({});
  const [firstHourData, setFirstHourData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Object.keys(dayData).length) return;
    const [, targetData] = Object.entries(dayData)[0];
    const targetDate = DateTime.fromISO(targetData[0][0].from).toFormat(
      "EEE MMMM d', 'h a"
    );
    setTodayDate(targetDate);
    setTodayData(getDayMinMaxAverages(targetData));
    setFirstHourData(Object.values(dayData)[0][0]);
    setIsLoading(false);
  }, [dayData, setIsLoading]);

  const LocationColumn = () => {
    if (isLoading) {
      return (
        <Col sm={12}>
          <Placeholder animation="glow">
            <Placeholder className="w-75 d-block h1 mx-auto" />
            <Placeholder className="w-50 d-block h5 mx-auto" />
          </Placeholder>
        </Col>
      );
    }
    return (
      <Col sm={12}>
        <p className="h1">{geoLocation.name}</p>
        <p className="h5">{todayDate}</p>
      </Col>
    );
  };

  return (
    <Accordion className="rounded-3 bg-light">
      <Accordion.Item eventKey={"todaycard0"}>
        <Accordion.Header>
          <Container className="d-flex flex-column flex-md-row align-items-center justify-content-center w-100 gap-2">
            <FlexColumnWrapper>
              <LocationColumn />
            </FlexColumnWrapper>

            <FlexColumnWrapper>
              <Col sm={12}>
                <Row>
                  <Col sm={12}>
                    <p className="h5 mb-0">Currently</p>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    {isLoading ? (
                      <Placeholder animation="glow">
                        <Placeholder className="display-1 w-25  mt-1" />
                      </Placeholder>
                    ) : (
                      <p className="display-1">
                        {Math.round(
                          firstHourData[0]?.location?.temperature?.value
                        )}
                        &deg;C
                      </p>
                    )}
                  </Col>
                </Row>
              </Col>
            </FlexColumnWrapper>

            <FlexColumnWrapper>
              <Col sm={12}>
                <Row>
                  <Col sm={12}>
                    {isLoading ? (
                      <Placeholder animation="glow">
                        <span className="h2">High </span>
                        <Placeholder className="display-1 w-25  mt-1" />
                      </Placeholder>
                    ) : (
                      <p className="h2">
                        High {getMaxRoundedValue(todayData.temperature)}&deg;C
                      </p>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    {isLoading ? (
                      <Placeholder animation="glow">
                        <span className="h4">Low </span>
                        <Placeholder className="display-1 w-25  mt-1" />
                      </Placeholder>
                    ) : (
                      <p className="h4">
                        Low {getMinRoundedValue(todayData.temperature)}&deg;C
                      </p>
                    )}{" "}
                  </Col>
                </Row>
              </Col>
            </FlexColumnWrapper>
            <Col className="d-flex align-items-center justify-content-center">
              {isLoading ? (
                <Placeholder animation="glow">
                  <Placeholder style={{ height: "12rem", width: "12rem" }} />
                </Placeholder>
              ) : (
                <WeatherSymbol
                  symbolName={
                    todayData?.symbol?.[0] ? todayData.symbol[0] : "LightCloud"
                  }
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
        {!isLoading && (
          <Accordion.Body>
            <Container className="d-flex flex-column flex-md-row align-items-center justify-content-center">
              {Object.keys(todayData).length && (
                <FlexColumnWrapper data={todayData}>
                  <SimpleColumnInner title={"Precipitation"}>
                    {getAverageRoundedValue(
                      todayData.precipitation.probability
                    ) > 0
                      ? `${getAverageRoundedValue(
                          todayData.precipitation.probability
                        )} % up to ${Math.max(
                          ...todayData.precipitation.maxvalue
                        )} mm`
                      : "no precipitation expected"}
                  </SimpleColumnInner>
                </FlexColumnWrapper>
              )}
              {Object.keys(todayData).length && (
                <FlexColumnWrapper>
                  <SimpleColumnInner title={"Humidity"}>
                    {getMinRoundedValue(todayData.humidity)}
                    {" - "}
                    {getMaxRoundedValue(todayData.humidity)}%
                  </SimpleColumnInner>
                </FlexColumnWrapper>
              )}
              {Object.keys(todayData).length && (
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
        )}
      </Accordion.Item>
    </Accordion>
  );
}

export default TodayCard;

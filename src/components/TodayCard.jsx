import { Container, Row, Col, Accordion } from "react-bootstrap";
import { useMemo, useCallback, useState, useEffect } from "react";
import WeatherSymbol from "./WeatherSymbol";
import { getDayMinMaxAverages } from "../utilities/helpers";
import {
  getMinRoundedValue,
  getMaxRoundedValue,
  getAverageRoundedValue,
  getFrequentString,
} from "../utilities/helpers";
import FlexColumnWrapper from "./FlexColumnWrapper";
import SimpleColumnInner from "./SimpleColumnInner";
function TodayCard({ geoLocation, dayData }) {
  const [date, setDate] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (dayData && Object.keys(dayData).length) {
      console.log(dayData);
      const testdata = Object.entries(dayData)[0];
      const result = {};
      result.pointData = testdata[1][0][0].location;
      result.rangeData = testdata[1][0][1].location;
      result.symbolName = result.rangeData.symbol.id;
      result.date = testdata[0];
      // console.log(Object.keys(dayData)[0]);
      // console.log(getDayMinMaxAverages(Object.values(dayData)[5]));
      const [targetDate, targetData] = Object.entries(dayData)[0];
      setDate(targetDate);
      setData(getDayMinMaxAverages(targetData));
    }
  }, [dayData]);

  return (
    <Accordion
      className="p-md-0 rounded-3 bg-light"
      defaultActiveKey={"0"}
      alwaysOpen
    >
      <Accordion.Item eventKey={"0"}>
        <Accordion.Header className="d-flex flex-column flex-md-row align-items-center justify-content-center">
          <FlexColumnWrapper>
            <Col sm={12}>
              {!data ? (
                <p>...loading forecast location</p>
              ) : (
                <>
                  <p className="h1">{geoLocation.name}</p>
                  <p className="h5">{date}</p>
                </>
              )}
            </Col>
          </FlexColumnWrapper>
          <Col className="d-flex align-items-center justify-content-center">
            {data && (
              <WeatherSymbol symbolName={data.symbol[0]} size={"12rem"} />
            )}
          </Col>
          {data && (
            <FlexColumnWrapper>
              <Col sm={12}>
                <Row>
                  <Col sm={12}>
                    <p className="h1">
                      {getMaxRoundedValue(data.temperature)}&deg;C
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <p className="h4">
                      {getMinRoundedValue(data.temperature)}&deg;C
                    </p>
                  </Col>
                </Row>
              </Col>
            </FlexColumnWrapper>
          )}
          {/* <Col className="d-flex align-items-center justify-content-center">
            <Row className="text-center">
            </Row>
          </Col> */}
        </Accordion.Header>
        <Accordion.Body className="d-flex flex-column flex-md-row align-items-center justify-content-center">
          {data && (
            <FlexColumnWrapper data={data}>
              <SimpleColumnInner title={"Precipitation"}>
                {getAverageRoundedValue(data.precipitation.probability) > 0
                  ? `${getAverageRoundedValue(
                      data.precipitation.probability
                    )} % chance up to ${Math.max(
                      ...data.precipitation.maxvalue
                    )} mm`
                  : "no precipitation expected"}
              </SimpleColumnInner>
            </FlexColumnWrapper>
          )}
          {data && (
            <FlexColumnWrapper>
              <SimpleColumnInner title={"Humidity"}>
                {getMinRoundedValue(data.humidity)}
                {" - "}
                {getMaxRoundedValue(data.humidity)}%
              </SimpleColumnInner>
            </FlexColumnWrapper>
          )}
          {data && (
            <FlexColumnWrapper>
              <SimpleColumnInner title={"Pressure"}>
                {getMinRoundedValue(data.pressure)}
                {" - "}
                {getMaxRoundedValue(data.pressure)}hPa
              </SimpleColumnInner>
            </FlexColumnWrapper>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default TodayCard;

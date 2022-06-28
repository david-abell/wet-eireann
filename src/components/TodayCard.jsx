import { Container, Row, Col, Accordion } from "react-bootstrap";
import { useMemo, useCallback, useState } from "react";
import WeatherSymbol from "./WeatherSymbol";
import { getDayMinMaxAverages } from "../utilities/helpers";
import {
  getMinRoundedValue,
  getMaxRoundedValue,
  getAverageRoundedValue,
} from "../utilities/helpers";

function TodayCard({ geoLocation, dayData }) {
  const [date, setDate] = useState("");
  const [data, setData] = useState(null);

  const todayData = useMemo(() => {
    if (dayData && Object.keys(dayData).length) {
      const data = Object.entries(dayData)[0];
      const result = {};
      result.pointData = data[1][0][0].location;
      result.rangeData = data[1][0][1].location;
      result.symbolName = result.rangeData.symbol.id;
      result.date = data[0];
      console.log(Object.keys(dayData)[0]);
      console.log(getDayMinMaxAverages(Object.values(dayData)[4]));
      const [targetDate, targetData] = Object.entries(dayData)[3];
      setDate(targetDate);
      setData(getDayMinMaxAverages(targetData));
      return result;
    }
    return null;
  }, [dayData]);

  return (
    <Accordion
      className="p-5 p-md-0 rounded-3 bg-light"
      defaultActiveKey={["0"]}
      alwaysOpen
    >
      <Accordion.Item>
        <Accordion.Header className="d-flex flex-column flex-md-row align-items-center justify-content-center">
          {
            <Col className="d-flex align-items-center justify-content-center flex-grow-1">
              <Row className="text-center">
                <Col sm={12}>
                  {!todayData ? (
                    <p>...loading forecast location</p>
                  ) : (
                    <>
                      <p className="h1">{geoLocation.name}</p>
                      <p className="h5">{date}</p>
                    </>
                  )}
                </Col>
              </Row>
            </Col>
          }
          <Col className="d-flex align-items-center justify-content-center p-0">
            {data && (
              <WeatherSymbol symbolName={todayData.symbolName} size={"12rem"} />
            )}
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            <Row className="text-center">
              <Col sm={12}>
                {data && (
                  <>
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
                  </>
                )}
              </Col>
            </Row>
          </Col>
        </Accordion.Header>
        <Accordion.Body>
          <p>This is the body</p>
          <Col className="d-flex align-items-center justify-content-center">
            <Row className="text-center">
              <Col sm={12}>
                {!!Object.keys(dayData).length && (
                  <>
                    <Row>
                      <Col sm={12}>
                        <p className="h5">Precipitation</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        {data && (
                          <p className="h2">
                            {getAverageRoundedValue(
                              data.precipitation.probability
                            )}
                            % /{" "}
                            {getMaxRoundedValue(data.precipitation.maxvalue)}
                            mm
                          </p>
                        )}
                      </Col>
                    </Row>
                  </>
                )}
              </Col>
            </Row>
          </Col>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default TodayCard;

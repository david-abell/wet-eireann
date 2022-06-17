import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import pointSchema from "../schema/pointData";
import DataKey from "./DataKey";
import { checkValues } from "../utilities/helpers";
import WeatherSymbol from "./WeatherSymbol";

function TodayCard({ pointData }) {
  const data = Object.entries(pointData)?.reduce(
    (acc, el) => {
      const [key, value] = el;
      return {
        ...acc,
        [key]: value,
      };
    },
    { ...pointSchema }
  );
  return (
    <Container>
      <Row>
        {pointData &&
          Object.entries(data).map((el, index) => {
            const [key, value] = el;
            const isObjValue = typeof value === "object";
            const areValues = checkValues(value);
            if (areValues && isObjValue) {
              return (
                <Col key={key + String(index)}>
                  {key}: {isObjValue ? <DataKey dataKey={value} /> : value}
                </Col>
              );
            }
          })}
      </Row>
    </Container>
  );
}

export default TodayCard;

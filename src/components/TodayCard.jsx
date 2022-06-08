import React from "react";
import pointSchema from "../schema/pointData";
import DataKey from "./DataKey";
import { checkValues } from "../utilities/helpers";

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
    <div>
      {pointData &&
        Object.entries(data).map((el, index) => {
          const [key, value] = el;
          const isObjValue = typeof value === "object";
          const areValues = checkValues(value);
          if (areValues && isObjValue) {
            return (
              <li key={key + String(index)}>
                {key}: {isObjValue ? <DataKey dataKey={value} /> : value}
              </li>
            );
          }
        })}
    </div>
  );
}

export default TodayCard;

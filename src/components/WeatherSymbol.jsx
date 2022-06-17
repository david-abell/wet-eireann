import { Card } from "react-bootstrap";
import spriteSheet from "../assets/forecastSymbols.png";
import "../styles/WeatherSymbol.css";
function WeatherSymbol({ spriteName, spritePosition }) {
  return (
    <div>
      <div
        className="weather-symbol"
        style={{
          // backgroundColor: "red",
          background: `rgb(232 251 255) url(${spriteSheet}) 0 ${-spritePosition}px`,
        }}
      ></div>
      <p>{spriteName}</p>
    </div>
  );
}

export default WeatherSymbol;

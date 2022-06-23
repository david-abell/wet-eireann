import "../styles/WeatherSymbol.css";
import "../assets/sprite-sheet.svg";
import {
  Cloud,
  Drizzle,
  DrizzleSun,
  DrizzleThunder,
  DrizzleThunderSun,
  ErrorNoMatchingIcon,
  Fog,
  HeavySleet,
  HeavySleetSun,
  HeavySleetThunder,
  HeavySleetThunderSun,
  HeavySnow,
  HeavySnowSun,
  HeavySnowThunder,
  HeavySnowThunderSun,
  LightCloud,
  LightRain,
  LightRainSun,
  LightRainThunder,
  LightRainThunderSun,
  LightSleet,
  LightSleetSun,
  LightSleetThunder,
  LightSleetThunderSun,
  LightSnow,
  LightSnowSun,
  LightSnowThunder,
  LightSnowThunderSun,
  PartlyCloud,
  Rain,
  RainSun,
  RainThunder,
  RainThunderSun,
  Sleet,
  SleetSun,
  SleetSunThunder,
  SleetThunder,
  Snow,
  SnowSun,
  SnowSunThunder,
  SnowThunder,
  Sun,
  Wind,
} from "./icons/index";

const icons = {
  Cloud,
  Drizzle,
  DrizzleSun,
  DrizzleThunder,
  DrizzleThunderSun,
  ErrorNoMatchingIcon,
  Fog,
  HeavySleet,
  HeavySleetSun,
  HeavySleetThunder,
  HeavySleetThunderSun,
  HeavySnow,
  HeavySnowSun,
  HeavySnowThunder,
  HeavySnowThunderSun,
  LightCloud,
  LightRain,
  LightRainSun,
  LightRainThunder,
  LightRainThunderSun,
  LightSleet,
  LightSleetSun,
  LightSleetThunder,
  LightSleetThunderSun,
  LightSnow,
  LightSnowSun,
  LightSnowThunder,
  LightSnowThunderSun,
  PartlyCloud,
  Rain,
  RainSun,
  RainThunder,
  RainThunderSun,
  Sleet,
  SleetSun,
  SleetSunThunder,
  SleetThunder,
  Snow,
  SnowSun,
  SnowSunThunder,
  SnowThunder,
  Sun,
  Wind,
};

function WeatherSymbol({ symbolName }) {
  const CurrentIcon = icons?.[symbolName] || icons.ErrorNoMatchingIcon;
  // const CurrentIcon = icons?.[symbolName] || icons.ErrorNoMatchingIcon;
  console.log(symbolName);
  return (
    <>
      <div className="weather-symbol">
        <CurrentIcon />
      </div>
      <p>{symbolName}</p>
    </>
  );
}

export default WeatherSymbol;

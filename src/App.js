import "./styles/App.css";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { XMLParser } from "fast-xml-parser";
import sampleData from "./sampleData2.xml";
import TodayCard from "./components/TodayCard";
import RainfallChart from "./components/RainfallChart";
// import WeatherSymbol from "./components/WeatherSymbol";
// import forecastSymbols from "./utilities/getForecastSymbolPosition";
import { DateTime } from "luxon";
import { chunkArray } from "./utilities/helpers";
import DayList from "./components/DayList";

// const weatherUrl =
//   "http://localhost:8010/proxy/metno-wdb2ts/locationforecast?lat=54.7210798611;long=-8.7237392806";
const weatherUrl = sampleData;

function App() {
  const [weatherData, setWeatherData] = useState({
    created: "",
    pointData: [],
  });
  const [graphPeriods, setGraphPeriods] = useState([]);
  // const [precipitation, setPrecipitation] = useState([]);
  const [precipChance, setPrecipChance] = useState([]);
  const [precipAmount, setPrecipAmount] = useState([]);
  const [dayData, setDayData] = useState({});

  useEffect(() => {
    let isApiSubscribed = false;
    async function fetchWeather() {
      if (isApiSubscribed) return;
      const parser = new XMLParser({
        attributeNamePrefix: "",
        //attrNodeName: false,
        //textNodeName : "#text",
        ignoreAttributes: false,
        ignoreNameSpace: false,
      });

      const response = await fetch(weatherUrl, { mode: "cors" });
      const result = await response.text();
      const data = parser.parse(result).weatherdata;
      const created = data.created;
      const pointData = data.product.time;
      setWeatherData({ ...weatherData, created, pointData });
    }
    fetchWeather();
    return () => (isApiSubscribed = true);
  }, [setWeatherData]);

  useEffect(() => {
    let precipChances = [];
    let periods = [];
    let precipAmounts = [];
    let oneHourChunks = [];
    let threeHourChunks = [];
    let sixHourChunks = [];
    let dayChunks = {};
    let chunkedData = chunkArray(weatherData.pointData, 2);
    const precipitationData = chunkedData.map((el) => {
      // console.log(el);
      return el[1];
    });
    // const precipitationData = weatherData.pointData.filter((el, index) => {
    //   return el.location.precipitation;
    // });
    // console.log(precipitationData);
    chunkedData.forEach((el) => {
      const { from, to } = el[1];
      const timeStamp = DateTime.fromISO(from);
      const toTimeStamp = DateTime.fromISO(to);
      // console.log(timeStamp, toTimeStamp);
      const timeDiff = toTimeStamp.diff(timeStamp, ["months", "days", "hours"]);
      const elDay = timeStamp.toLocaleString(DateTime.DATE_SHORT);
      // console.log(elDay);
      const { months, days, hours } = timeDiff.values;
      if (dayChunks[elDay]) {
        dayChunks[elDay] = [...dayChunks[elDay], el];
      } else {
        dayChunks[elDay] = [el];
      }
      if (hours === 1) {
        oneHourChunks.push(el);
      }
      if (hours === 3) {
        threeHourChunks.push(el);
      }
      if (hours === 6) {
        sixHourChunks.push(el);
      }
    });
    // console.log(chunkedData);
    setDayData({
      ...dayChunks,
    });
    console.log(dayData);
    precipitationData.forEach((el) => {
      const { from, to } = el;
      // const timeStamp = DateTime.fromISO(from);
      // const toTimeStamp = DateTime.fromISO(to);
      // console.log(timeStamp, toTimeStamp);
      // const timeDiff = toTimeStamp.diff(timeStamp, ["months", "days", "hours"]);
      // const { months, days, hours } = timeDiff.values;
      const {
        location: {
          precipitation: { value, minvalue, maxvalue, probability },
        },
      } = el;
      const mean =
        minvalue && maxvalue
          ? (parseFloat(minvalue) + parseFloat(maxvalue)) / 2
          : value;
      precipChances.push(probability);
      precipAmounts.push(mean);
      periods.push(from);
    });
    setPrecipAmount(precipAmounts);
    setPrecipChance(precipChances);

    setGraphPeriods(periods);
  }, [weatherData, setGraphPeriods]);
  return (
    <Stack className="App gap-5 py-5">
      <DayList dayData={dayData} />
      {/* {precipChance.length && graphPeriods.length && (
        <RainfallChart
          precipChance={precipChance}
          graphPeriods={graphPeriods}
          precipAmount={precipAmount}
        />
      )} */}
      {/* {weatherData.pointData.length && (
        <>
          <TodayCard pointData={weatherData.pointData[1].location} />
        </>
      )} */}
      {/* {Object.entries(forecastSymbols).map(([key, value]) => {
        return (
          <WeatherSymbol key={key} spriteName={key} spritePosition={value} />
        );
      })} */}
    </Stack>
  );
  // return (
  //   <div className="App">
  //     <ul>
  //       {weatherData.pointData.map((el, index) => {
  //         const { location, from, to } = el;
  //         const { temperature, precipitation } = location;
  //         const pointTime = new Date(from).toLocaleDateString("en-gb");
  //         return (
  //           <React.Fragment key={from + index + "I"}>
  //             <li key={from + index + "A"}>Date: {pointTime}</li>
  //             <li key={to + index + "B"}>
  //               {temperature
  //                 ? "Temperature: " + temperature.value
  //                 : "Precipitation: " + precipitation?.maxvalue}
  //             </li>
  //           </React.Fragment>
  //         );
  //       })}
  //     </ul>
  //   </div>
  // );
}

export default App;

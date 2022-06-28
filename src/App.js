import "./styles/App.css";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { XMLParser } from "fast-xml-parser";
import sampleData from "./sampleData2.xml";
// import TodayCardold from "./components/TodayCardold";
import RainfallChart from "./components/RainfallChart";
// import WeatherSymbol from "./components/WeatherSymbol";
// import forecastSymbols from "./utilities/getForecastSymbolPosition";
import { DateTime } from "luxon";
import { chunkArray } from "./utilities/helpers";
import DayList from "./components/DayList";
import TopNav from "./components/TopNav";
import TodayCard from "./components/TodayCard";
// const weatherUrl =
//   "http://localhost:8010/proxy/metno-wdb2ts/locationforecast?lat=51.8985;long=-8.4756";
// const weatherUrl = sampleData;

function App() {
  const [geoLocation, setGeoLocation] = useState({
    name: "Cork, Ireland",
    lat: 51.8985,
    long: -8.4756,
  });
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
      const url = sampleData;
      // const url = `http://localhost:8010/proxy/metno-wdb2ts/locationforecast?lat=${geoLocation.lat};long=${geoLocation.long}`;
      try {
        const response = await fetch(url, { mode: "cors" });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const result = await response.text();
        const data = parser.parse(result).weatherdata;
        const created = data.created;
        const pointData = data.product.time;
        setWeatherData((data) => {
          return { ...data, created, pointData };
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchWeather();
    return () => (isApiSubscribed = true);
  }, [setWeatherData, geoLocation]);

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
      return el[1];
    });
    chunkedData.forEach((el) => {
      const { from, to } = el[1];
      const timeStamp = DateTime.fromISO(from);
      const toTimeStamp = DateTime.fromISO(to);
      const timeDiff = toTimeStamp.diff(timeStamp, ["months", "days", "hours"]);
      const elDay = timeStamp.toFormat("EEEE, MMMM d");
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
    setDayData({
      ...dayChunks,
    });
    precipitationData.forEach((el) => {
      const { from, to } = el;
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
    <>
      <TopNav geoLocation={geoLocation} setGeoLocation={setGeoLocation} />
      <Container className="App py-5 d-grid gap-5">
        <TodayCard geoLocation={geoLocation} dayData={dayData}></TodayCard>
        <DayList dayData={dayData} className="mb-5" />
        {/* <RainfallChart
          precipChance={precipChance}
          graphPeriods={graphPeriods}
          precipAmount={precipAmount}
        /> */}

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
      </Container>
    </>
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

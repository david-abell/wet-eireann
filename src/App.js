import "./App.css";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { XMLParser } from "fast-xml-parser";
import sampleData from "./sampleData2.xml";
import TodayCard from "./components/TodayCard";
import RainfallChart from "./components/RainfallChart";

// const weatherUrl =
// "http://localhost:8010/proxy/metno-wdb2ts/locationforecast?lat=54.7210798611;long=-8.7237392806";
const weatherUrl = sampleData;

function App() {
  const [weatherData, setWeatherData] = useState({
    created: "",
    pointData: [],
  });
  const [graphPeriods, setGraphPeriods] = useState([]);
  // const [precipitation, setPrecipitation] = useState([]);
  const [precipChance, setPrecipChance] = useState([]);

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
    const precipitationData = weatherData.pointData.filter((el, index) => {
      return el.location.precipitation;
    });

    precipitationData.forEach((el) => {
      const { from, to } = el;
      const timeStamp = new Date(from).getHours();
      const toTimeStamp = new Date(to).toLocaleString();
      const {
        location: {
          precipitation: { value, minvalue, maxvalue, probability },
        },
      } = el;
      precipChances.push(parseFloat(probability) || 0);
      periods.push(from);
      // console.log(from, timeStamp, toTimeStamp, probability);
    });

    setPrecipChance(precipChances);

    setGraphPeriods(periods);
  }, [weatherData, setGraphPeriods]);

  return (
    <div className="App">
      <Container fluid="lg" className="chart-container">
        {precipChance && graphPeriods && (
          <RainfallChart
            precipChance={precipChance}
            graphPeriods={graphPeriods}
          />
        )}
      </Container>
      {weatherData.pointData.length && (
        <>
          <TodayCard pointData={weatherData.pointData[0].location} />
          <TodayCard pointData={weatherData.pointData[1].location} />
        </>
      )}
    </div>
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

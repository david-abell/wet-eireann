import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { XMLParser } from "fast-xml-parser";
// import sampleData from "./sampleData2.xml";
import RainfallChart from "./components/RainfallChart";
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
  const [precipChance, setPrecipChance] = useState([]);
  const [precipAmount, setPrecipAmount] = useState([]);
  const [dayData, setDayData] = useState({});

  useEffect(() => {
    let isApiSubscribed = false;
    async function fetchWeather() {
      if (isApiSubscribed) return;
      const parser = new XMLParser({
        attributeNamePrefix: "",
        ignoreAttributes: false,
        ignoreNameSpace: false,
      });
      // const url = sampleData;
      const url = `https://met-eireann-cors.herokuapp.com/http://metwdb-openaccess.ichec.ie/metno-wdb2ts/locationforecast?lat=${geoLocation.lat};long=${geoLocation.long}`;
      try {
        const headers = new Headers();
        headers.set("X-Requested-With", "XMLHttpRequest");
        const response = await fetch(url, {
          mode: "cors",
          headers: headers,
        });
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
      const { hours } = timeDiff.values;
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
      const { from } = el;
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
    <div className="min-vh-100">
      <TopNav geoLocation={geoLocation} setGeoLocation={setGeoLocation} />
      <Container className=" d-grid gap-5 pt-5">
        {!!Object.keys(dayData).length && (
          <TodayCard geoLocation={geoLocation} dayData={dayData}></TodayCard>
        )}
        <DayList dayData={dayData} />
        <RainfallChart
          precipChance={precipChance}
          graphPeriods={graphPeriods}
          precipAmount={precipAmount}
        />
      </Container>
    </div>
  );
}

export default App;

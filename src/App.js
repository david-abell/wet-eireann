import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import sampleData from "./sampleData2.xml";
import RainfallChart from "./components/RainfallChart";
import DayList from "./components/DayList";
import TopNav from "./components/TopNav";
import TodayCard from "./components/TodayCard";
import WeatherWarning from "./components/WeatherWarning";
import ToggleContainer from "./components/ToggleContainer";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import useWarnings from "./hooks/useWarnings";
import { queryClient } from "./constants/queryClient";
import useGlobalState from "./hooks/useGlobalState";

function App() {
  const [geoLocation, setGeoLocation] = useGlobalState("geoLocation", {
    name: "Cork, Ireland",
    coordinates: { lat: 51.8985, long: -8.4756 },
    bounds: {
      north: 60,
      south: 49.1,
      west: 20.9,
      east: 2.7,
    },
  });
  const warnings = useWarnings();

  return (
    <div className="min-vh-100">
      <TopNav geoLocation={geoLocation} setGeoLocation={setGeoLocation} />
      <ToggleContainer className="pb-2">
        {warnings.data.map((warning) => {
          return <WeatherWarning warning={warning} key={warning.headline} />;
        })}
      </ToggleContainer>
      <Container className=" d-grid gap-5 px-0">
        {<TodayCard geoLocation={geoLocation}></TodayCard>}
        <DayList geoLocation={geoLocation} />
        <RainfallChart coordinates={geoLocation.coordinates} />
      </Container>
    </div>
  );
}

export default function QueryApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

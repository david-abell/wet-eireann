import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import sampleData from "./sampleData2.xml";
import RainfallChart from "./components/RainfallChart";
import DayList from "./components/DayList";
import TopNav from "./components/TopNav";
import TodayCard from "./components/TodayCard";
import WeatherWarning from "./components/WeatherWarning";
import ToggleContainer from "./components/ToggleContainer";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import useWarnings from "./hooks/useWarnings";

const queryClient = new QueryClient();

function App() {
  const [geoLocation, setGeoLocation] = useState({
    name: "Cork, Ireland",
    coordinates: { lat: 51.8985, long: -8.4756 },
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
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </QueryClientProvider>
  );
}

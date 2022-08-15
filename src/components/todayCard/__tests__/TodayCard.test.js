import TodayCard from "../TodayCard";
import { render, screen } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "react-query";
import useGlobalState from "../../../hooks/useGlobalState";
const client = new QueryClient();

test("renders learn react link", async () => {
  // const geolocation = {
  //   name: "Cork, Ireland",
  //   coordinates: { lat: 51.8985, long: -8.4756 },
  //   bounds: {
  //     north: 60,
  //     south: 49.1,
  //     west: 20.9,
  //     east: 2.7,
  //   },
  // };
  // render(
  //   <QueryClientProvider client={client}>
  //     <TodayCard />
  //   </QueryClientProvider>
  // );
  // const temperatureLabelElement = screen.getByText(/Currently/i);
  // expect(temperatureLabelElement).toBeInTheDocument();
});

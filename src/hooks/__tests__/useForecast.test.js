/**
 * @jest-environment-options {"url": "https://met-eireann-cors.herokuapp.com"}
 */
import nock from "nock";
import { QueryClientProvider, QueryClient } from "react-query";
import {
  renderHook,
  waitFor,
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import useForecast from "../useForecast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    persist: true,
    notifyOnChangeProps: "all",
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const TestComponent = ({ data }) => {
  return <p data-testid="testNode">{data}</p>;
};

const coordinates = { lat: 50, long: 50 };

afterEach(() => queryClient.clear());
afterAll(() => nock.restore());

const apiProxy = process.env.REACT_APP_CORS_PROXY;
const expectation = nock(apiProxy)
  .persist()
  .intercept(/.*/, "OPTIONS")
  .query(true)
  .reply(200, undefined, {
    "Access-Control-Allow-Origin": "*",
    "access-control-allow-headers": "Content-Type, x-requested-with, text/xml",
  })
  .get(/.*/)
  .query(true)
  .replyWithFile(200, __dirname + "/mock-response-data/sampleData2.xml", {
    "Content-Type": "text/xml",
    "access-control-allow-origin": "*",
  });

it("should get some data", async () => {
  const { result } = renderHook(() => useForecast(coordinates), {
    wrapper,
  });
  await waitFor(() => expect(result.current.data).not.toHaveLength(0));
});

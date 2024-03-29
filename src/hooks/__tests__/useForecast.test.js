/**
 * @jest-environment-options {"url": "https://met-eireann-cors.herokuapp.com"}
 */
import nock from "nock";
import { QueryClientProvider, QueryClient } from "react-query";
import { renderHook, waitFor } from "@testing-library/react";
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

const coordinates = { lat: 50, long: 50 };

const apiProxy = process.env.REACT_APP_CORS_PROXY;

beforeEach(() => {
  jest.resetAllMocks();
});
describe("successes", () => {
  afterEach(() => queryClient.clear());
  afterAll(() => nock.restore());
  // eslint-disable-next-line no-unused-vars
  const expectation = nock(apiProxy)
    .persist()
    .intercept(/.*/, "OPTIONS")
    .query(true)
    .reply(200, undefined, {
      "Access-Control-Allow-Origin": "*",
      "access-control-allow-headers":
        "Content-Type, x-requested-with, text/xml",
    })
    .get(/.*/)
    .query(true)
    .replyWithFile(200, __dirname + "/mock-response-data/sampleData2.xml", {
      "Content-Type": "text/xml",
      "access-control-allow-origin": "*",
    });

  test("should get some data", async () => {
    const { result } = renderHook(() => useForecast(coordinates), {
      wrapper,
    });
    await waitFor(() => expect(result.current.data).not.toHaveLength(0));
  });

  test("isSuccess should be true", async () => {
    const { result } = renderHook(() => useForecast(coordinates), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
  });

  test("error should be false", async () => {
    const { result } = renderHook(() => useForecast(coordinates), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isFetching).toBe(true));
    await waitFor(() => expect(result.current.isFetching).toBe(false));
    await waitFor(() => expect(result.current.error).toBeFalsy());
  });
});

describe("failures", () => {
  afterEach(() => queryClient.clear());
  afterAll(() => nock.restore());

  // eslint-disable-next-line no-unused-vars
  const expectation = nock(apiProxy)
    .persist()
    .intercept(/.*/, "OPTIONS")
    .query(true)
    .reply(200, undefined, {
      "Access-Control-Allow-Origin": "*",
      "access-control-allow-headers":
        "Content-Type, x-requested-with, text/xml",
    })
    .get(/.*/)
    .query(true)
    .reply(
      200,
      { false: "somedata" },
      {
        "Content-Type": "text/xml",
        "access-control-allow-origin": "*",
      }
    );

  test("error should be true", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const { result } = renderHook(() => useForecast(coordinates), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isFetching).toBe(true));
    await waitFor(() => expect(result.current.isFetching).toBe(false));
    await waitFor(() => expect(result.current.error).toBeTruthy());
    expect(consoleSpy).toHaveBeenCalled();
  });
});

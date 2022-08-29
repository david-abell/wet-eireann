import nock from "nock";
import { QueryClientProvider, QueryClient } from "react-query";
import { renderHook, waitFor } from "@testing-library/react";
import useWarnings from "../useWarnings.js";

import { setLogger } from "react-query";

setLogger({
  log: console.log,
  warn: console.warn,
  // ✅ no more errors on the console
  error: () => {},
});

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

const apiProxy = process.env.REACT_APP_CORS_PROXY;

beforeEach(() => {
  queryClient.clear();
});
afterEach(() => {
  nock.cleanAll();
});
afterAll(() => {
  nock.restore();
  jest.clearAllMocks();
});

describe("successes", () => {
  // eslint-disable-next-line no-unused-vars
  let nockInterceptor;
  beforeEach(() => {
    nockInterceptor = nock(apiProxy)
      .intercept(/.*/, "OPTIONS")
      .query(true)
      .reply(200, undefined, {
        "Access-Control-Allow-Origin": "*",
        "access-control-allow-headers":
          "Content-Type, x-requested-with, text/xml",
      })
      .get(/.*/)
      .query(true)
      .replyWithFile(
        200,
        __dirname + "/mock-response-data/sampleWarningRSS.xml",
        {
          "Content-Type": "text/xml",
          "access-control-allow-origin": "*",
        }
      )
      .intercept(/.*/, "OPTIONS")
      .query(true)
      .reply(200, undefined, {
        "Access-Control-Allow-Origin": "*",
        "access-control-allow-headers":
          "Content-Type, x-requested-with, text/xml",
      })
      .get(/.*/)
      .query(true)
      .replyWithFile(
        200,
        __dirname + "/mock-response-data/sampleWarning1.xml",
        {
          "Content-Type": "text/xml",
          "access-control-allow-origin": "*",
        }
      )
      .intercept(/.*/, "OPTIONS")
      .query(true)
      .reply(200, undefined, {
        "Access-Control-Allow-Origin": "*",
        "access-control-allow-headers":
          "Content-Type, x-requested-with, text/xml",
      })
      .get(/.*/)
      .query(true)
      .replyWithFile(
        200,
        __dirname + "/mock-response-data/sampleWarning2.xml",
        {
          "Content-Type": "text/xml",
          "access-control-allow-origin": "*",
        }
      );
  });

  test("should have a data array with two warnings", async () => {
    const { result } = renderHook(() => useWarnings(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.data).toHaveLength(2));
  });

  test("isSuccess should be true", async () => {
    const { result } = renderHook(() => useWarnings(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
  });

  test("error should be false", async () => {
    const { result } = renderHook(() => useWarnings(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isFetching).toBe(true));
    await waitFor(() => expect(result.current.isFetching).toBe(false));

    await waitFor(() => expect(result.current.error).toBeFalsy());
  });
});

describe("errors", () => {
  // eslint-disable-next-line no-unused-vars
  let nockInterceptor;

  test("should return empty array with bad data", async () => {
    nockInterceptor = nock(apiProxy)
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
    const { result } = renderHook(() => useWarnings(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    await waitFor(() => expect(result.current.data).toHaveLength(0));
  });

  test("should error from first query", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    nockInterceptor = nock(apiProxy)
      .intercept(/.*/, "OPTIONS")
      .query(true)
      .reply(200, undefined, {
        "Access-Control-Allow-Origin": "*",
        "access-control-allow-headers":
          "Content-Type, x-requested-with, text/xml",
      })
      .get(/.*/)
      .query(true)
      .replyWithError("something awful happened");
    const { result } = renderHook(() => useWarnings(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    await waitFor(() => expect(result.current.error).toBeTruthy());
    expect(consoleSpy).toHaveBeenCalled();
  });

  test("should error on warnings query", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    nockInterceptor = nock(apiProxy)
      .intercept(/.*/, "OPTIONS")
      .query(true)
      .reply(200, undefined, {
        "Access-Control-Allow-Origin": "*",
        "access-control-allow-headers":
          "Content-Type, x-requested-with, text/xml",
      })
      .get(/.*/)
      .query(true)
      .replyWithFile(
        200,
        __dirname + "/mock-response-data/sampleWarningRSS.xml",
        {
          "Content-Type": "text/xml",
          "access-control-allow-origin": "*",
        }
      )
      .intercept(/.*/, "OPTIONS")
      .query(true)
      .reply(200, undefined, {
        "Access-Control-Allow-Origin": "*",
        "access-control-allow-headers":
          "Content-Type, x-requested-with, text/xml",
      })
      .get(/.*/)
      .query(true)
      .replyWithError("something awful happened");
    const { result } = renderHook(() => useWarnings(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    await waitFor(() => expect(result.current.error).toBeTruthy());
    expect(consoleSpy).toHaveBeenCalled();
  });

  test("should also error on warnings query", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    nockInterceptor = nock(apiProxy)
      .intercept(/.*/, "OPTIONS")
      .query(true)
      .reply(200, undefined, {
        "Access-Control-Allow-Origin": "*",
        "access-control-allow-headers":
          "Content-Type, x-requested-with, text/xml",
      })
      .get(/.*/)
      .query(true)
      .replyWithFile(
        200,
        __dirname + "/mock-response-data/sampleWarningRSS.xml",
        {
          "Content-Type": "text/xml",
          "access-control-allow-origin": "*",
        }
      );
    const { result } = renderHook(() => useWarnings(), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    await waitFor(() => expect(result.current.error).toBeTruthy());
    expect(consoleSpy).toHaveBeenCalled();
  });
});

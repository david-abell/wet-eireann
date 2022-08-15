import { QueryClientProvider, QueryClient } from "react-query";
import { renderHook, waitFor, act } from "@testing-library/react";
import useGlobalState from "../useGlobalState";

describe("useGlobalState Hook", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const initialData = {
    testKey: "this is some data",
  };

  it("should set initial data", async () => {
    const { result } = renderHook(
      () => useGlobalState("testingQuery", initialData),
      {
        wrapper,
      }
    );
    await waitFor(() => expect(result.current[0]).toBe(initialData));
  });

  it("return initial data", async () => {
    const { result } = renderHook(() => useGlobalState("testingQuery"), {
      wrapper,
    });
    await waitFor(() => expect(result.current[0]).toBe(initialData));
  });

  it("should set new data", async () => {
    const { result } = renderHook(
      () => useGlobalState("isolatedTestingQuery", "isFirstValue"),
      {
        wrapper,
      }
    );
    // console.log(result);
    // await waitFor(() => result.current[2].isSuccess);
    const [data, setData] = result.current;
    const value = "the data has been changed";
    act(() => setData(value));
    console.log(result);
    // const mockSetData = jest.fn().mockReturnValue(value);
    // act(() => setData((prev) => ({ ...prev, testKey: value })));
    // expect(mockSetData).toHaveBeenCalled();
  });
});

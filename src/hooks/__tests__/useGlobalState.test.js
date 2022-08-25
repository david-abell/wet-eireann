import { QueryClientProvider, QueryClient } from "react-query";
import {
  renderHook,
  waitFor,
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import useGlobalState from "../useGlobalState";

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

afterEach(() => queryClient.clear());

describe("useGlobalState Hook", () => {
  const initialData = "isFirstValue";

  it("should set initial data", async () => {
    const { result } = renderHook(
      () => useGlobalState("testingQuery", initialData),
      {
        wrapper,
      }
    );
    await waitFor(() => expect(result.current[0]).toBe(initialData));
  });

  it("should be undefined when no initial data exists", async () => {
    const { result } = renderHook(() => useGlobalState("testingQuery"), {
      wrapper,
    });
    await waitFor(() => expect(result.current[0]).toBeFalsy());
  });

  it("should set new data", async () => {
    const { result } = renderHook(
      () => useGlobalState("isolatedTestingQuery", initialData),
      {
        wrapper,
      }
    );

    await waitFor(() => expect(result.current[0]).toBe(initialData));

    const value = "the data has been changed";

    const { rerender } = render(
      <QueryClientProvider client={queryClient}>
        <TestComponent data={result.current[0]} />
        <button
          onClick={() =>
            queryClient.setQueryData("isolatedTestingQuery", value)
          }
        >
          set data
        </button>
      </QueryClientProvider>
    );

    const pElement = screen.getByText(initialData);
    expect(pElement).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /set data/i }));
    await waitFor(() => expect(result.current[0]).toBe(value));

    rerender(
      <QueryClientProvider client={queryClient}>
        <TestComponent data={result.current[0]} />
        <button
          onClick={() =>
            queryClient.setQueryData("isolatedTestingQuery", value)
          }
        >
          set data
        </button>
      </QueryClientProvider>
    );
    expect(pElement).toBeInTheDocument();
    expect(pElement).toHaveTextContent("the data has been changed");
    expect(pElement).not.toHaveTextContent(initialData);
  });
});

import { useQuery } from "react-query";
import { queryClient } from "../constants/queryClient";

function useGlobalState(key, initialData) {
  const { data, isFetching, isSuccess, refetch } = useQuery(
    key,
    () => initialData,
    {
      enabled: false,
      initialData,
    }
  );

  return [
    data,
    (value) => queryClient.setQueryData(key, value),
    { isFetching, isSuccess, refetch },
  ];
}

export default useGlobalState;

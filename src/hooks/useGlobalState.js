import { useQuery } from "react-query";
import { queryClient } from "../constants/queryClient";

function useGlobalState(key, initialData) {
  return [
    useQuery(key, () => initialData, {
      enabled: false,
      initialData,
    }).data,
    (value) => queryClient.setQueryData(key, value),
  ];
}

export default useGlobalState;

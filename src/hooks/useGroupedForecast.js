import { useQuery } from "react-query";
import useForecast from "./useForecast";
import { groupDataByDay, getDayMinMaxAverages } from "../utilities/helpers";

function useGroupedForecast(coordinates) {
  const { data: forecastData } = useForecast(coordinates);

  function getGroupedData(obj) {
    const dayData = groupDataByDay(obj);
    const [, targetData] = Object.entries(dayData)[0];
    const todayData = getDayMinMaxAverages(targetData);
    const firstHourData = Object.values(dayData)[0][0];
    return { todayData, firstHourData, dayData };
  }
  const { isLoading, error, data, isFetching, isSuccess, isIdle, status } =
    useQuery(
      ["groupedForecast", coordinates, forecastData],
      () => getGroupedData(forecastData),
      {
        enabled: !!forecastData.length,
      }
    );
  return {
    data: data ?? {},
    isLoading,
    error,
    isFetching,
    isSuccess,
    isIdle,
    status,
  };
}

export default useGroupedForecast;

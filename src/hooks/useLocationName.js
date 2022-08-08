import { useQuery } from "react-query";
import geocode from "react-geocode";

const REACT_APP_MAPS_API = process.env.REACT_APP_MAPS_API;
geocode.setApiKey(REACT_APP_MAPS_API);
geocode.setRegion("IE");
geocode.setLocationType("GEOMETRIC_CENTER");

const removeEircode = (str) => {
  return str
    .split(" ")
    .filter((el) => !el.includes("+"))
    .join(" ");
};

function useLocationName({ lat, long, options = { enabled: false } }) {
  const getPlaceName = async () => {
    if ((lat !== 0 && !lat) || (long !== 0 && !long)) {
      throw new Error("Invalid coordinates");
    }

    const response = await geocode.fromLatLng(String(lat), String(long));
    const address = response.results[0].formatted_address;

    console.log("response", response, address);
    return removeEircode(address);
  };

  const { isLoading, error, data, isFetching, isSuccess, refetch } = useQuery(
    ["locationName", lat, long],
    getPlaceName,
    { ...options, staleTime: 120000 }
  );

  return {
    data: data ?? [],
    isLoading,
    error,
    isFetching,
    isSuccess,
    refetch,
  };
}

export default useLocationName;

import { useQuery, useMutation } from "react-query";
import geocode from "react-geocode";
import getGPSCoordinates from "../utilities/getGPSCoordinates";
import useGlobalState from "./useGlobalState";

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

function useLocationName({ options = { enabled: false } }) {
  const [geoLocation, setGeoLocation] = useGlobalState("geoLocation");

  const getPlaceName = async () => {
    const coordinates = await getGPSCoordinates();
    const { lat, long } = coordinates;

    if ((lat !== 0 && !lat) || (long !== 0 && !long)) {
      throw new Error("Invalid coordinates");
    }

    const response = await geocode.fromLatLng(String(lat), String(long));
    const address = response.results[0].formatted_address;
    const cleanedAddress = removeEircode(address);

    console.log("response", response, address);
    setGeoLocation((prev) => ({
      ...prev,
      coordinates,
      locationName: cleanedAddress,
    }));

    return;
  };

  const { isLoading, error, data, isFetching, isSuccess, refetch } = useQuery(
    ["locationName", geoLocation.coordinates.lat, geoLocation.coordinates.long],
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

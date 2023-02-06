import { useMutation, useQueryClient } from "react-query";
import geocode from "react-geocode";
import getGPSCoordinates from "../utilities/getGPSCoordinates";
import useGlobalState from "./useGlobalState";
import { removeEircode, isWithinBounds } from "../utilities/helpers";

const REACT_APP_MAPS_API = process.env.REACT_APP_MAPS_API;
geocode.setApiKey(REACT_APP_MAPS_API);
geocode.setRegion("IE");
geocode.setLocationType("GEOMETRIC_CENTER");

function useMutatePlaceName() {
  const queryClient = useQueryClient();
  const [, setGeoLocation] = useGlobalState("geoLocation");

  const getPlaceName = async () => {
    const coordinates = await getGPSCoordinates();
    console.log(coordinates);
    const { lat, long } = coordinates;

    if (lat == null || long == null) {
      console.log("invalid coordinates");
      throw new Error("Invalid coordinates");
    }

    if (!isWithinBounds(lat, long)) {
      throw new Error("Location outside supported map area");
    }
    const response = await geocode.fromLatLng(String(lat), String(long));
    const address = response.results[0].formatted_address;
    const cleanedAddress = removeEircode(address);

    return setGeoLocation((prev) => ({
      ...prev,
      coordinates,
      name: cleanedAddress,
    }));
  };

  const { mutate, isError, error } = useMutation(getPlaceName, {
    onSuccess: () => {
      queryClient.invalidateQueries(["forecast", "groupedForecast"]);
    },
  });

  return {
    mutatePlaceName: mutate,
    isError,
    error,
  };
}

export default useMutatePlaceName;

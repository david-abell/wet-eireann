import { useMutation, useQueryClient } from "react-query";
import geocode from "react-geocode";
import getGPSCoordinates from "../utilities/getGPSCoordinates";
import useGlobalState from "./useGlobalState";
import { removeEircode } from "../utilities/helpers";

const REACT_APP_MAPS_API = process.env.REACT_APP_MAPS_API;
geocode.setApiKey(REACT_APP_MAPS_API);
geocode.setRegion("IE");
geocode.setLocationType("GEOMETRIC_CENTER");

function useMutatePlaceName() {
  const queryClient = useQueryClient();
  const [, setGeoLocation] = useGlobalState("geoLocation");

  const getPlaceName = async () => {
    const coordinates = await getGPSCoordinates();
    const { lat, long } = coordinates;

    if ((lat !== 0 && !lat) || (long !== 0 && !long)) {
      throw new Error("Invalid coordinates");
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

  const { mutate } = useMutation(getPlaceName, {
    onSuccess: () => {
      queryClient.invalidateQueries(["forecast", "groupedForecast"]);
    },
  });

  return {
    mutatePlaceName: mutate,
  };
}

export default useMutatePlaceName;

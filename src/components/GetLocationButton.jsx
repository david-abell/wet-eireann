import { Button } from "react-bootstrap";
import getGPSCoordinates from "../utilities/getGPSCoordinates";
import { useQueryClient } from "react-query";
import useLocationName from "../hooks/useLocationName";
import { useEffect } from "react";
import useGlobalState from "../hooks/useGlobalState";

function GetLocationButton() {
  const queryClient = useQueryClient();
  const [geoLocation, setGeoLocation] = useGlobalState("geoLocation");
  const { data, refetch } = useLocationName(geoLocation.coordinates);

  useEffect(() => {
    if (data.length) {
      setGeoLocation((prev) => ({ ...prev, name: data }));
      console.log("locationName useEffect", data);
    }
  }, [data, setGeoLocation]);

  const handleClick = async () => {
    const coordinates = await getGPSCoordinates();
    console.log(coordinates);

    setGeoLocation((prev) => {
      return { ...prev, coordinates };
    });

    refetch();

    return queryClient.invalidateQueries(["forecast", "groupedForecast"]);
  };

  return <Button onClick={handleClick}>Use current location</Button>;
}

export default GetLocationButton;

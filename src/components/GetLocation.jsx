import { Button } from "react-bootstrap";
import getGPSCoordinates from "../utilities/getGPSCoordinates";
import { useQueryClient } from "react-query";

function GetLocation({ setGeoLocation }) {
  const queryClient = useQueryClient();

  const handleClick = async () => {
    const coordinates = await getGPSCoordinates();
    const name = "Your Location";
    setGeoLocation((prev) => {
      return { ...prev, name, coordinates };
    });
    return queryClient.invalidateQueries(["forecast", "groupedForecast"]);
  };

  return <Button onClick={handleClick}>Use current location</Button>;
}

export default GetLocation;

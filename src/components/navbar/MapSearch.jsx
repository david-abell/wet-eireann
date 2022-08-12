import { usePlacesWidget } from "react-google-autocomplete";
import { Form, Button } from "react-bootstrap";
import { useQueryClient } from "react-query";
import useGlobalState from "../../hooks/useGlobalState";
import useMutatePlaceName from "../../hooks/useMutatePlaceName";
import { useState, useEffect } from "react";
import LocationErrorModal from "./LocationErrorModal";

function MapSearch() {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);
  const [geoLocation, setGeoLocation] = useGlobalState("geoLocation");
  const { mutatePlaceName, error } = useMutatePlaceName(
    geoLocation.coordinates
  );
  const { ref: bootstrapRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_MAPS_API,
    options: {
      bounds: geoLocation.bounds,
      strictBounds: true,
      types: ["geocode"],
    },
    onPlaceSelected: (place) => {
      const name = place.formatted_address;
      const lat = place.geometry.location.lat();
      const long = place.geometry.location.lng();
      const coordinates = { lat, long };
      setGeoLocation((prev) => {
        return { ...prev, name, coordinates };
      });
      return queryClient.invalidateQueries(["forecast", "groupedForecast"]);
    },
  });

  useEffect(() => {
    if (error) {
      handleShow();
    }
  }, [error]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    mutatePlaceName();
    ev.target.reset();
  };

  return (
    <>
      <Form
        className="m-auto d-lg-inline flex-grow-1 flex-lg-grow-0 flex-shrink-0"
        onSubmit={handleSubmit}
      >
        <Form.Group
          controlId="locationSearch"
          className="me-md-4 ms-auto d-flex gap-4"
        >
          <Form.Label className="visually-hidden">Choose a location</Form.Label>
          <Form.Control
            type="search"
            ref={bootstrapRef}
            placeholder={geoLocation?.name ?? ""}
          />
          <Button type="submit">Use current location</Button>
        </Form.Group>
      </Form>
      {error && (
        <LocationErrorModal
          show={show}
          handleClose={handleClose}
          errorMessage={error.message}
        />
      )}
    </>
  );
}

export default MapSearch;

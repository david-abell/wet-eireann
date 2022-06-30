import { usePlacesWidget } from "react-google-autocomplete";
import { Form } from "react-bootstrap";

function MapSearch({ geoLocation, setGeoLocation }) {
  const { ref: bootstrapRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_MAPS_API,
    options: {
      bounds: {
        north: 60,
        south: 49.1,
        west: 20.9,
        east: 2.7,
      },
      strictBounds: true,
      types: ["geocode"],
    },
    onPlaceSelected: (place) => {
      const name = place.formatted_address;
      const lat = place.geometry.location.lat();
      const long = place.geometry.location.lng();
      setGeoLocation((loc) => {
        return { ...loc, name, lat, long };
      });
    },
  });
  return (
    <Form className="m-auto d-lg-inline flex-grow-1 flex-lg-grow-0 flex-shrink-0">
      <Form.Group controlId="locationSearch" className="me-md-4 ms-auto d-flex">
        <Form.Label className="visually-hidden">Choose a location</Form.Label>
        <Form.Control
          type="search"
          ref={bootstrapRef}
          placeholder={geoLocation.name}
        />
      </Form.Group>
      {/* <Button type="submit">Search</Button> */}
    </Form>
  );
}

export default MapSearch;

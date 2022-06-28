import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import MapSearch from "./MapSearch";
function TopNav({ geoLocation, setGeoLocation }) {
  return (
    <Navbar expand="md" bg="light">
      <Container className="d-flex justify-content-between gap-2">
        <Navbar.Brand href="#home" className="ms-2">
          Wet-Eireann
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="ms-auto">
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#daily-forecast">Daily forecast</Nav.Link>
            <Nav.Link href="#weather-graph">Weather Graph</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {geoLocation && (
          <MapSearch
            geoLocation={geoLocation}
            setGeoLocation={setGeoLocation}
          />
        )}
        {/* <Form className="ms-auto d-flex flex-grow-1">
          <Form.Group
            controlId="locationSearch"
            className="me-4 ms-auto d-flex"
          >
            <Form.Control type="search" className="me-2"></Form.Control>
            <Button type="submit">Search</Button>
          </Form.Group>
        </Form> */}
      </Container>
    </Navbar>
  );
}

export default TopNav;

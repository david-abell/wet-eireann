import { Navbar, Nav, Container } from "react-bootstrap";
import MapSearch from "./MapSearch";
import "../styles/topNav.css";
function TopNav() {
  return (
    <Navbar expand="md" bg="light" className="mb-4">
      <Container className="d-flex justify-content-between gap-2">
        <Navbar.Brand href="#home" className="ms-md-4 flex-basis-50">
          Wet-Eireann
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <MapSearch />
        <Navbar.Collapse
          id="navbar-nav"
          className="m-auto ms-md-auto flex-shrink-0"
        >
          <Nav>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#daily-forecast">Daily forecast</Nav.Link>
            <Nav.Link href="#weather-graph">Weather Graph</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;

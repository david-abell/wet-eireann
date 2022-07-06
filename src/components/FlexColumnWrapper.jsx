import { Row, Col } from "react-bootstrap";

function FlexColumnWrapper({ children }) {
  return (
    <Col className="d-flex align-items-center justify-content-center">
      <Row className="text-center w-100 align-items-center justify-content-center">
        {children}
      </Row>
    </Col>
  );
}

export default FlexColumnWrapper;

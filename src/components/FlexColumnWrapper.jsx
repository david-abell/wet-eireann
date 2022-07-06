import { Row, Col } from "react-bootstrap";

function FlexColumnWrapper({ children }) {
  return (
    <Col className="d-flex align-items-center justify-content-center m-auto w-100">
      <Row className="text-center w-100 align-items-center justify-content-center">
        {children}
      </Row>
    </Col>
  );
}

export default FlexColumnWrapper;

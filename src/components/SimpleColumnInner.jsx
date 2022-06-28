import { Row, Col } from "react-bootstrap";

function SimpleColumnInner({ title, children }) {
  return (
    <Col sm={12} className="pt-md-0 pt-2">
      <Row>
        <Col sm={12}>
          <p className="h5">{title}</p>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>{<p className="h2">{children}</p>}</Col>
      </Row>
    </Col>
  );
}

export default SimpleColumnInner;

import Button from "react-bootstrap/Button";
import { Alert, Modal } from "react-bootstrap";

function LocationErrorModal({ errorMessage, show, handleClose }) {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Oops there was an error while trying to get your current location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">{errorMessage}</Alert>
          <b>Please try the search field instead</b>
        </Modal.Body>
        <Modal.Footer className="d-flex">
          <Button onClick={handleClose} className="flex-grow-1">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LocationErrorModal;

import {
  Modal,
  Button,
  Alert,
  Container,
} from "react-bootstrap";
import ShelterForm from "../Form/ShelterForm";

const RegisterModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.setModalShow(false);
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.type} um lar temporário{" "}
          <p className="text-danger fs-6">* Opcional</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Alert variant="warning">
            AVISO: Para criar ou editar um lar é preciso permitir que
            o site tenha acesso a sua geolocalização quando solicitado!
          </Alert>
        </Container>
        <Container>
          <ShelterForm
            setModalShow={props.setModalShow}
            shelterInitialValues={props.shelterInitialValues}
          />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.setModalShow(false);
          }}
        >
          Sair
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;

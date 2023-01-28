import { Modal, Button, Col, Nav, Row, Tab, Alert } from "react-bootstrap";
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
        <Tab.Container id="left-tabs" defaultActiveKey="alert">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="alert">Aviso</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="register">
                    {props.type === "Cadastrar" ? "Cadastro" : "Edição"}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="alert">
                  <Alert key={"danger"} variant={"danger"}>
                    Para {(props.type + "").toLowerCase()} um lar é preciso
                    permitir que o site tenha acesso a sua geolocalização quando
                    solicitado!
                  </Alert>
                </Tab.Pane>
                <Tab.Pane eventKey="register">
                  <ShelterForm
                    setModalShow={props.setModalShow}
                    shelterInitialValues={props.shelterInitialValues}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
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

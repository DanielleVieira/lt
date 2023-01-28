import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Stack,
  Modal,
} from "react-bootstrap/";
import {
  Twitter,
  Facebook,
  Instagram,
} from "../../../assets/icons/SocialMedia";
import { PhoneFill, House, Trash } from "../../../assets/icons/OtherIcons";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContext } from "../../../contexts/ToastProvider ";

const ProfileHeader = (props) => {
  const { user } = useContext(AuthContext);
  const { setShowToast, setToastText, setVariant } = useContext(ToastContext);
  const [show, setShow] = useState(false);
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const icons = {
    twitter: <Twitter />,
    facebook: <Facebook />,
    instagram: <Instagram />,
  };

  const handleDelete = () => {
    setShow(false);
    const docRef = doc(db, `shelters/${user.uid}`);
    deleteDoc(docRef)
      .then(() => {
        navigate("/home");
        setToastText("Excluido com sucesso!");
        setVariant("success");
        setShowToast(true);
      })
      .catch((error) => {
        console.log(error);
        setToastText("Ocorreu um erro durante a exclusão!");
        setVariant("danger");
        setShowToast(true);
      });
  };

  return (
    <Container fluid className="bg-primary">
      <Row className="py-5" xs={1} md={2}>
        <Col>
          <Card bg="primary" text="light" className="text-center border-0">
            <div className="mx-auto p-3 rounded-circle bg-light">
              <House />
            </div>
            <Card.Body>
              <Card.Title className="mt-2" as="h2">
                {props.data.name}
              </Card.Title>
              <Card.Text>
                <PhoneFill /> {props.data.contact}
              </Card.Text>
              <Stack
                gap={3}
                direction="horizontal"
                className="justify-content-center mt-4"
              >
                {Object.keys(props.data.social).map((key) => {
                  return props.data.social[key] ? (
                    <a
                      key={key}
                      target="_blank"
                      rel="noreferrer"
                      href={props.data.social[key]}
                    >
                      <Button variant="primary" size="lg">
                        {icons[key]}
                      </Button>
                    </a>
                  ) : null;
                })}
              </Stack>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card bg="primary" text="light" className="text-center border-0">
            <Card.Body>
              <Card.Title as="h3">Sobre o lar:</Card.Title>
              <Card.Text style={{ textAlign: "justify" }}>
                {props.data.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {user && user.uid === id ? (
        <Container>
          <Row>
            <Col className="d-flex justify-content-center mb-3">
              <Button
                onClick={() => setShow(true)}
                className="d-flex align-items-center"
              >
                <Trash /> Excluir
              </Button>
            </Col>
          </Row>
          <Modal show={show}>
            <Modal.Body>
              Tem certeza que deseja excluir este perfil? Esta ação não poderá
              ser desfeita!
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setShow(false)}>Não</Button>
              <Button onClick={handleDelete}>Sim</Button>
            </Modal.Footer>
          </Modal>
        </Container>
      ) : null}
    </Container>
  );
};

export default ProfileHeader;

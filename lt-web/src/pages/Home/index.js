import { useContext, useEffect, useState } from "react";
import { Button, Container, Stack, Modal, Alert } from "react-bootstrap";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import RegisterModal from "../../components/RegisterModal";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../contexts/AuthProvider";
import ShelterList from "./ShelterList";
import { ToastContext } from "../../contexts/ToastProvider ";
import "./index.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { setShowToast, setToastText, setVariant } = useContext(ToastContext);
  const [modalShow, setModalShow] = useState(false);
  const [haveShelter, setHaveShelter] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [userPosition, setUserPosition] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    if (user) {
      const docRef = doc(db, "shelters", `${user.uid}`);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setHaveShelter(true);
          }
        })
        .catch((error) => {
          setToastText("Ocorreu um erro ao carregar os dados");
          setShowToast(true);
        });
    }
  }, [haveShelter, setHaveShelter, user, setShowToast, setToastText]);

  const search = () => {
    setAlertModal(false);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          setIsSearching(true);
        },
        (error) => {
          setToastText(
            "Para prosseguir com a busca é necessário permitir o acesso a geolocalização"
          );
          setVariant("danger");
          setShowToast(true);
        }
      );
    } else {
      setToastText(
        "Não foi possível acessar a geolocalização nesse navegador!"
      );
      setVariant("danger");
      setShowToast(true);
    }
  };

  return (
    <>
      <NavBar />
      <main className="min-vh-100">
        <Container fluid className="bg-primary">
          <Stack className="d-flex flex-md-row overflow-hidden">
            <Button
              style={{ width: "300px", height: "150px" }}
              variant="light"
              className="mx-auto my-5 p-5"
              onClick={() => setAlertModal(true)}
            >
              BUSCAR UM LAR
            </Button>
            <Button
              style={{ width: "300px", height: "150px" }}
              variant="light"
              className="mx-auto my-5 p-5 btn-home"
              onClick={() => {
                haveShelter
                  ? navigate(`/profile/${user.uid}`)
                  : setModalShow(true);
              }}
            >
              {haveShelter ? "VER PERFIL DO LAR" : "CADASTRAR UM LAR"}
            </Button>
          </Stack>
          <RegisterModal
            show={modalShow}
            setModalShow={setModalShow}
            setHaveShelter={setHaveShelter}
          />
        </Container>

        <Container className={isSearching ? "d-block" : "d-none"}>
          <Modal show={alertModal}>
            <Modal.Header>
              <Modal.Title>Aviso</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Alert variant={"danger"}>
                Para realizar a busca é preciso permitir que o site acesse sua
                geocalização quando solicitado.
              </Alert>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={search}>
                Prosseguir
              </Button>
            </Modal.Footer>
          </Modal>
          <ShelterList userPosition={userPosition} isSearching={isSearching} />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Home;

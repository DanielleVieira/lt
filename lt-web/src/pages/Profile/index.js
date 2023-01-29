import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NavBar from "../../components/NavBar";
import { useContext, useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import ProfileHeader from "./ProfileHeader";
import Footer from "../../components/Footer";
import {
  Calendar,
  Coin,
  Hearts,
  Numbers,
  Rules,
  Pet,
} from "../../assets/icons/OtherIcons";
import { db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import UploadImage from "../../components/UploadImage";
import Loading from "../../components/Loading";
import { ToastContext } from "../../contexts/ToastProvider ";

const Profile = (props) => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const { user } = useContext(AuthContext);
  const { setShowToast, setToastText, setVariant } = useContext(ToastContext);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const iconsAndLabels = {
    type: [<Pet />, "Tipos de Animais"],
    size: [<Rules />, "Porte dos Animais"],
    time: [<Calendar />, "Quanto Tempo"],
    number: [<Numbers />, "Quantos Animais"],
    havePets: [<Hearts />, "Possui Outros Animais"],
    payment: [<Coin />, "Auxílio com Despesas"],
  };
  const ICON_POS = 0;
  const TITLE_POS = 1;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    if (user) {
      const docRef = doc(db, `shelters/${id}`);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setProfileData(docSnap.data());
            setIsOwner(user.uid === id);
          }
          setLoading(false);
        })
        .catch((error) => {
          setToastText("Ocorreu um erro ao carregar os dados");
          setVariant("danger");
          setShowToast(true);
        });
    }
  }, [user, id, setShowToast, setToastText, setVariant]);

  if (loading) {
    return (
      <>
        <NavBar />
        <Loading />
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <main className="min-vh-100">
          {!profileData ? (
            <h1>Não encontramos esse perfil</h1>
          ) : (
            <>
              <ProfileHeader data={profileData} />
              <Container fluid>
                <Row xs={1} md={2}>
                  <Col>
                    <Card className="text-center border-0">
                      <Card.Body>
                        <Card.Title className="text-primary mt-3" as="h3">
                          Animais Aceitos
                        </Card.Title>
                        <Row xs={1} md={2} className="g-3">
                          {[
                            "type",
                            "size",
                            "time",
                            "number",
                            "payment",
                            "havePets",
                          ].map((key) => {
                            return (
                              <Col key={key}>
                                <ProfileCard
                                  title={iconsAndLabels[key][TITLE_POS]}
                                  text={profileData.acceptConditions[
                                    key
                                  ].toString()}
                                  icon={iconsAndLabels[key][ICON_POS]}
                                />
                              </Col>
                            );
                          })}
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col>
                    <Card className="text-center border-0">
                      <Card.Body>
                        <Card.Title className="text-primary mt-3" as="h3">
                          Fotos{" "}
                          <Button
                            className={isOwner ? "d-inline" : "d-none"}
                            onClick={() => setUploadImage(true)}
                          >
                            +
                          </Button>
                        </Card.Title>
                        <UploadImage
                          show={uploadImage}
                          setShow={setUploadImage}
                        />
                        <Row xs={1} md={1}>
                          {[...profileData.images]
                            .reverse()
                            .slice(0, 2)
                            .map((img) => {
                              return (
                                <Col key={img.url}>
                                  <Card className="mb-3">
                                    <Card.Img
                                      height="255px"
                                      style={{ objectFit: "cover" }}
                                      src={img.url}
                                    />
                                  </Card>
                                </Col>
                              );
                            })}
                        </Row>
                        {profileData.images.length > 0 ? (
                          <Row>
                            <Button
                              className="p-3 mt-3"
                              onClick={() => navigate("/images/" + id)}
                            >
                              Ver todas as Fotos
                            </Button>
                          </Row>
                        ) : (
                          <Card.Text>
                            Nenhuma foto foi adicionada a este perfil
                          </Card.Text>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </>
          )}
        </main>
        <Footer />
      </>
    );
  }
};

export default Profile;

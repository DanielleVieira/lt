import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Container, Figure, Stack, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import { AuthContext } from "../../contexts/AuthProvider";
import { db } from "../../services/firebase";

const Images = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState(null);
  const { user } = useContext(AuthContext);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    if (user) {
      const docRef = doc(db, `shelters/${id}`);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setImages(docSnap.data().images);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user, id]);

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
          {!images ? (
            <h1>Não encontramos nenhuma imagem</h1>
          ) : (
            <Container fluid>
              <Stack gap={3} className="my-3 flex-md-row flex-wrap">
                {[...images].reverse().map((img) => {
                  return (
                    <Figure key={img.url}>
                      <Image
                        height="255px"
                        width="300px"
                        style={{ objectFit: "cover" }}
                        src={img.url}
                      />
                    </Figure>
                  );
                })}
              </Stack>
            </Container>
          )}
        </main>
        <Footer />
      </>
    );
  }
};

export default Images;

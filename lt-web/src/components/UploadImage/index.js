import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useState } from "react";
import { Modal, Button, Form, ProgressBar, Image, Row } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthProvider";
import { db, storage } from "../../services/firebase";
import EmptyImage from "../../assets/emptyImage.svg";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ToastContext } from "../../contexts/ToastProvider ";

const UploadImage = (props) => {
  const [image, setImage] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useContext(AuthContext);
  const { setShowToast, setToastText, setVariant } = useContext(ToastContext);

  const handleClose = () => {
    props.setShow(false);
    setIsSubmiting(false);
    setProgress(0);
    setImage(null);
  };

  const saveImageURLOnFireStore = (downloadURL) => {
    const docRef = doc(db, `shelters/${user.uid}`);
    updateDoc(docRef, {
      images: arrayUnion({
        url: downloadURL,
        timestamp: image.lastModifiedDate,
      }),
    })
      .then(() => {
        window.location.reload(true);
      })
      .catch((error) => {
        setToastText("Ocorreu um erro ao salvar!");
        setVariant("danger");
        setShowToast(true);
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    const storageRef = ref(storage, `shelters/${user.uid}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const snapProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(snapProgress);
      },
      (error) => {
        setToastText("Ocorreu um erro ao salvar!");
        setVariant("danger");
        setShowToast(true);
        handleClose();
        console.log(error)
      },
      (sucess) => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          saveImageURLOnFireStore(downloadURL);
        });
        handleClose();
      }
    );
  };

  return (
    <Modal show={props.show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Adicionar imagem</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Image
            width="200px"
            height="250"
            style={{ objectFit: "cover" }}
            src={image ? URL.createObjectURL(image) : EmptyImage}
          ></Image>
        </Row>

        <Form>
          <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              onChange={(e) => setImage(e.target.files[0])}
            ></Form.Control>
          </Form.Group>
        </Form>
        <ProgressBar now={progress} label={`${progress}%`} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmiting}
          onClick={(e) => {
            handleSubmit(e);
            setIsSubmiting(true);
          }}
        >
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadImage;

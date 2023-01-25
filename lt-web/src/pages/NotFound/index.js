import Alert from "react-bootstrap/Alert";
import NavBar from "../../components/NavBar";

const NotFound = () => {
  return (
    <>
      <NavBar />
      <Alert variant="secondary">
        <Alert.Heading>Error 404</Alert.Heading>
        <p>Nenhuma página correspondente foi encontrada</p>
      </Alert>
    </>
  );
};

export default NotFound;

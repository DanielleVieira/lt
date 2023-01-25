import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import Figure from "react-bootstrap/Figure";
import logo from "../../assets/logo.svg";
import LoginPanel from "./LoginPanel";
import { AuthContext } from "../../contexts/AuthProvider";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { error, signed } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(signed) {
      navigate("/home");
    }
  }, [signed, navigate]);

  return (
    <Container>
      {error ? (
        <Alert variant="danger">
          <Alert.Heading>Ops, ocorreu um erro!</Alert.Heading>
          <p>Por favor, tente novamente mais tarde!</p>
        </Alert>
      ) : null}

      <Row className="justify-content-md-center mt-3 ">
        <Col style={{ maxWidth: "400px" }}>
          <Figure>
            <Figure.Image alt="Logo Lar Temporário" src={logo} />
          </Figure>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm={{ order: "last" }}>
          <LoginPanel />
        </Col>
        <Col className="px-5">
          <h1 className="text-center text-primary">
            O que é um lar temporário
          </h1>
          <h4 className="mt-3" style={{ textAlign: "justify"}}>
            O lar temporário é quando uma pessoa, sozinha ou em parceria com
            alguma ONG, se compromete a acolher em casa um animal abandonado por
            um tempo determinado.
          </h4>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

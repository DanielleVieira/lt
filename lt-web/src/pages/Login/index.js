import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import Figure from "react-bootstrap/Figure";
import logo from "../../assets/logo.svg";
import LoginPanel from "./LoginPanel";

const Login = () => {
  return (
    <Container>
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
          <h4 className="mt-3" style={{ textAlign: "justify", textIndent: 16 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </h4>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

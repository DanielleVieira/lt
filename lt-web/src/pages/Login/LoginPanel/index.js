import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../../contexts/AuthProvider";
import {
  GoogleAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";
import { Facebook, Google } from "../../../assets/icons/SocialMedia";

const LoginPanel = () => {
  const { login } = useContext(AuthContext);
  
    return (
      <Container
        style={{ maxWidth: "400px", minWidth: "200px" }}
        className="p-3 mb-5 bg-body rounded border"
      >
        <Row>
          <h1 className="text-center text-primary">LogIn</h1>
        </Row>
        <Row className="mt-3">
          <Stack gap={3}>
            <Button variant="outline-primary" onClick={() => login(new GoogleAuthProvider())}>
              <Google />{" "}
              LOGIN COM GOOGLE
            </Button>

            <Button variant="outline-primary" disabled onClick={() => login(new FacebookAuthProvider())}>
              <Facebook height="16" width="16"/>{" "}
              LOGIN COM FACEBOOK
            </Button>
          </Stack>
        </Row>
      </Container>
    );
};

export default LoginPanel;

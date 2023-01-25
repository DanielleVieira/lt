import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logo from "../../assets/logo_navBar.svg";
import { AuthContext } from "../../contexts/AuthProvider";
import { useContext } from "react";

const NavBar = () => {
  const { logout, user } = useContext(AuthContext);
  const variant = "dark";

  return (
    <header>
      <Navbar bg="primary" expand="lg" variant={variant}>
        <Container fluid>
          <Navbar.Brand
            href="/home"
            style={{
              fontFamily: "Gloria Hallelujah",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: 22,
            }}
          >
            <img
              alt=""
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-center"
            />{" "}
            LarTemporário
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="ms-auto">
              <span style={{ color: variant === "dark" ? "white" : "black" }}>
                {!user ? null : user.displayName}
              </span>{" "}
              <img
                src={!user ? null : user.photoURL}
                width="40"
                style={{ borderRadius: "30px" }}
                alt="user"
                className="me-3"
                referrerPolicy="no-referrer"
              ></img>
            </div>
            <Button variant="light" onClick={logout}>
              Sair
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;

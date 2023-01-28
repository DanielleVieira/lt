import { Nav, Container, Stack } from "react-bootstrap";
import { Email, GitHub } from "../../assets/icons/SocialMedia";

const Footer = () => {
  return (
    <footer className="blockquote-footer text-center text-lg-start text-muted py-3 mt-3 mb-0 bg-dark">
      <Stack className="flex-row justify-content-between align-items-center">
        <Container>
          <p>{new Date().getFullYear()} ♥ LarTemporário</p>
          <p>
            O website não se compromete a fazer qualquer tipo de verificação de
            dados ou acompanhamento dos lares, apenas contribui para a
            divulgação e aproximação das partes interessadas.
          </p>
        </Container>
        <Nav>
          <Nav.Link href="https://github.com/DanielleVieira/lt-web">
            <GitHub />
          </Nav.Link>
          <Nav.Link href="mailto:danielle.vieira@ccc.ufcg.edu.br">
            <Email />
          </Nav.Link>
        </Nav>
      </Stack>
    </footer>
  );
};

export default Footer;

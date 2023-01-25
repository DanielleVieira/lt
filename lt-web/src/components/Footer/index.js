import Container from "react-bootstrap/esm/Container";

const Footer = () => {
  return (
    <footer className="blockquote-footer text-center text-lg-start text-muted py-3 mt-3 mb-0 bg-dark">
      <Container>
        <p>{new Date().getFullYear()} ♥ LarTemporário</p>
        <p>
          O website não se compromete a fazer qualquer tipo de verificação de
          dados ou acompanhamento dos lares, apenas contribui para a divulgação
          e aproximação das partes interessadas.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

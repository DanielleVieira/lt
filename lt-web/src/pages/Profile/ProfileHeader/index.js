import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Stack from "react-bootstrap/Stack";
import {
  Twitter,
  Facebook,
  Instagram,
} from "../../../assets/icons/SocialMedia";
import { PhoneFill, House } from "../../../assets/icons/OtherIcons";

const ProfileHeader = (props) => {
  const icons = {
    twitter: <Twitter />,
    facebook: <Facebook />,
    instagram: <Instagram />,
  };

  return (
    <Container fluid className="bg-primary">
      <Row className="py-5" xs={1} md={2}>
        <Col>
          <Card bg="primary" text="light" className="text-center border-0">
            <div className="mx-auto p-3 rounded-circle bg-light">
              <House />
            </div>
            <Card.Body>
              <Card.Title className="mt-2" as="h2">
                {props.data.name}
              </Card.Title>
              <Card.Text>
                <PhoneFill /> {props.data.contact}
              </Card.Text>
              <Stack
                gap={3}
                direction="horizontal"
                className="justify-content-center mt-4"
              >
                {Object.keys(props.data.social).map((key) => {
                  return props.data.social[key] ? (
                    <a
                      key={key}
                      target="_blank"
                      rel="noreferrer"
                      href={props.data.social[key]}
                    >
                      <Button variant="primary" size="lg">
                        {icons[key]}
                      </Button>
                    </a>
                  ) : null;
                })}
              </Stack>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card bg="primary" text="light" className="text-center border-0">
            <Card.Body>
              <Card.Title as="h3">Sobre o lar:</Card.Title>
              <Card.Text style={{ textAlign: "justify" }}>
                {props.data.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileHeader;

import Card from "react-bootstrap/Card";
import { House } from "../../../../assets/icons/OtherIcons";
import { Badge, Col, Row, Stack } from "react-bootstrap";

const ListItem = (props) => {
  return (
    <Card>
      <Card.Body>
        <Row xs={1} md={2} className="mb-2">
          <Col md="2">
              <House />
              <Card.Title>{props.name}</Card.Title>
              <Card.Subtitle>{props.contact}</Card.Subtitle>
          </Col>
          <Col md="10">
              <Card.Text style={{ textAlign: "justify"}}>
                {props.description}
              </Card.Text>
          </Col>
        </Row>

        <Card.Footer>
          <Stack gap={3} className="flex-row flex-wrap">
            <Badge className="text-wrap">
              <strong>Tipos de animais:</strong> {props.type.toString()}
            </Badge>

            <Badge className="text-wrap">
              <strong>Porte dos animais:</strong> {props.size.toString()}
            </Badge>
            <Badge className="text-wrap">
              <strong>Tempo para acolhimento:</strong> {props.time}
            </Badge>
            <Badge className="text-wrap">
              <strong>Quantos animais aceita:</strong> {props.number}
            </Badge>
            <Badge className="text-wrap">
              <strong>Necessita auxílio com despesas:</strong> {props.payment}
            </Badge>
            <Badge className="text-wrap">
              <strong>Possui outros animais:</strong> {props.havePets}
            </Badge>
          </Stack>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default ListItem;

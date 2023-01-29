import ListGroup from "react-bootstrap/ListGroup";
import { Card, Button, OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import { geoQueryShelters } from "../../../services/geolocation";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { useNavigate } from "react-router-dom";
import ListFilter from "./ListFilter";

const ShelterList = (props) => {
  const [results, setResults] = useState([]);
  const [list, setList] = useState([]);

  const SEARCH_RADIUS = 150; //Km
  const navigate = useNavigate();
  
  useEffect(() => {
    if (props.userPosition.length > 0) {
      geoQueryShelters(props.userPosition, SEARCH_RADIUS, (matchingDocs) => {
        setResults(matchingDocs);
        setList(matchingDocs);
      });
    }
  }, [props.userPosition]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Por padrão o site mostra apenas os lares dentro de um raio de 150 km
    </Tooltip>
  );

  return (
    <>
      <Card className="text-center border-0">
        <Card.Body>
          <Card.Title className="text-primary mt-3" as="h3">
            Lares Disponíveis{" "}
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Badge className="fs-6" pill>
                ?
              </Badge>
            </OverlayTrigger>
          </Card.Title>
          <ListFilter setList={setList} results={results} />
          <ListGroup>
            {list.length > 0 ? (
              list.map((snap) => {
                const shelter = snap.data();
                return (
                  <ListGroup.Item key={snap.id}>
                    <ListItem
                      name={shelter.name}
                      contact={shelter.contact}
                      description={shelter.description}
                      type={shelter.acceptConditions.type}
                      size={shelter.acceptConditions.size}
                      time={shelter.acceptConditions.time}
                      number={shelter.acceptConditions.number}
                      payment={shelter.acceptConditions.payment}
                      havePets={shelter.acceptConditions.havePets}
                    />

                    <Button
                      className="mt-2"
                      onClick={() => navigate(`/profile/${snap.id}`)}
                    >
                      Ver mais informações
                    </Button>
                  </ListGroup.Item>
                );
              })
            ) : (
              <Card.Text>Não encontramos nenhum resultado</Card.Text>
            )}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};

export default ShelterList;

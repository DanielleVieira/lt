import Card from "react-bootstrap/Card";

const ProfileCard = (props) => {
  return (
    <Card className="pt-5" style={{ height: "16rem" }}>
      <Card.Body>
        {props.icon}
        <Card.Title className="mt-3">{props.title}</Card.Title>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;

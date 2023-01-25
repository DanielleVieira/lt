import { Spinner, Stack } from "react-bootstrap";

const Loading = () => {
  return (
    <Stack
      className="align-items-center justify-content-center"
      style={{ height: "90vh" }}
    >
      <Spinner animation="border" role="status" size="lg">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Stack>
  );
};

export default Loading;

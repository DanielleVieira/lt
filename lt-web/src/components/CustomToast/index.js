import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Alert from "react-bootstrap/Alert";

const CustomToast = ({ children, ...props }) => {
  window.scroll(0, 0);
  return (
    <ToastContainer className="m-2" position={props.position}>
      <Toast {...props} delay={5000} autohide>
        <Toast.Body className="p-0">
          <Alert className="m-0" variant={props.variant}>
            {children}
          </Alert>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;

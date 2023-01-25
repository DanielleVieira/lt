import { useField } from "formik";
import Form from "react-bootstrap/Form";

export const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Group>
        <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
        <Form.Control
          className="form-textarea"
          as="textarea"
          {...field}
          {...props}
        ></Form.Control>
        <Form.Text>
          {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
          ) : null}
        </Form.Text>
      </Form.Group>
    </>
  );
};

import { useField } from "formik";
import Form from "react-bootstrap/Form";

export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Group>
        <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
        <Form.Control className="text-input" {...field} {...props} />
        <Form.Text>
          {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
          ) : null}
        </Form.Text>
      </Form.Group>
    </>
  );
};

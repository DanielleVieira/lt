import { useField } from "formik";
import Form from "react-bootstrap/Form";

export const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <Form.Group>
        <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
        <Form.Select {...field} {...props} />
        <Form.Text>
          {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
          ) : null}
        </Form.Text>
      </Form.Group>
    </div>
  );
};

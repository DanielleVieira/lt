import { useField } from "formik";
import Form from "react-bootstrap/Form";

export const Checkbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input">
        <Form.Check type="checkbox" label={children} {...field} {...props} />
      </label>
      <Form.Text>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </Form.Text>
    </div>
  );
};

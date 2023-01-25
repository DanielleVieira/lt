import { Form, Formik } from "formik";
import { Button, Stack } from "react-bootstrap";
import * as Yup from "yup";
import { Select } from "../../../../components/Form/Select";

const ListFilter = (props) => {
  return (
    <>
      <Formik
        initialValues={{
          type: "",
          time: "",
          payment: "",
          havePets: "",
        }}
        validationSchema={Yup.object({
          type: Yup.string()
            .oneOf(["gatos", "cachorros", "outros"], "Valor inválido")
            .notRequired(),
          time: Yup.string()
            .oneOf(["dias", "semanas", "meses"], "Valor inválido")
            .notRequired(),
          payment: Yup.string()
            .oneOf(["sim", "não"], "Valor inválido")
            .notRequired(),
          havePets: Yup.string()
            .oneOf(["sim", "não"], "Valor inválido")
            .notRequired(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const filters = [];

          Object.keys(values).forEach((key) => {
            if (values[key]) {
              filters.push([key, values[key]]);
            }
          });

          const res = props.results.filter((snap) => {
            const shelter = snap.data();
            return filters.every((filter) => {
              return shelter.acceptConditions[filter[0]].includes(filter[1]);
            });
          });
          props.setList(res);
          setSubmitting(false);
        }}
      >
        <Form>
          <Stack gap={3} className="my-1 flex-wrap flex-md-row">
            <Select label="Tipos de animais aceitos" name="type">
              <option value="">Selecione um tipo</option>
              {["gatos", "cachorros", "outros"].map((type) => {
                return (
                  <option key={type} value={type}>
                    {type}
                  </option>
                );
              })}
            </Select>

            <Select label="Tempo disponível para o acolhimento" name="time">
              <option value="">Selecione um período de tempo</option>
              {["dias", "semanas", "meses"].map((time) => {
                return (
                  <option key={time} value={time}>
                    {time}
                  </option>
                );
              })}
            </Select>

            <Select
              label="Necessita ajuda com alimentação e veterinário"
              name="payment"
            >
              <option value="">Selecione</option>
              <option value="não">não</option>
              <option value="sim">sim</option>
            </Select>

            <Select label="Possue outros animais" name="havePets">
              <option value="">Selecione</option>
              <option value="não">não</option>
              <option value="sim">sim</option>
            </Select>

            <Button type="submit">Filtrar</Button>
          </Stack>
        </Form>
      </Formik>
    </>
  );
};

export default ListFilter;

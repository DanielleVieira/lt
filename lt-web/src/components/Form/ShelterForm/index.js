import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextInput } from "../TextInput";
import { TextArea } from "../TextArea";
import { Checkbox } from "../Checkbox";
import { Select } from "../Select";
import Button from "react-bootstrap/esm/Button";
import { db } from "../../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import { Stack } from "react-bootstrap";
import { generateHash } from "../../../services/geolocation";
import { ToastContext } from "../../../contexts/ToastProvider ";

const RegisterShelterForm = (props) => {
  const { user } = useContext(AuthContext);
  const { setShowToast, setToastText, setVariant } = useContext(ToastContext);

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          contact: "",
          description: "",
          // aceept conditions
          payment: false,
          time: "",
          havePets: false,
          number: 0,
          //type
          cats: true,
          dogs: true,
          others: true,
          //size
          small: true,
          middle: true,
          big: true,
          //social medias
          facebook: "",
          twitter: "",
          instagram: "",
          images: [],
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, "Deve ter 3 caracteres ou mais")
            .max(20, "Deve ter 15 caracteres ou menos")
            .required("Obrigatório"),
          contact: Yup.string()
            .matches(
              '^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$',
              { message: "Número de contato inválido. Utilize apenas números e inclua o DDD" }
            )
            .required("Obrigatório"),
          description: Yup.string()
            .max(400, "Deve ter 400 caracteres ou menos")
            .required("Obrigatório"),
          //accept conditions
          payment: Yup.boolean().required("Obrigatório").oneOf([true, false]),
          havePets: Yup.boolean().required("Obrigatório").oneOf([true, false]),
          time: Yup.string()
            .oneOf(["dias", "semanas", "meses"], "Tempo inválido")
            .required("Obrigatório"),
          number: Yup.number("Deve ser um valor numérico")
            .integer("Deve ser um número inteiro")
            .positive("Deve ser um número positivo")
            .min(1, "Deve estar disponível para acolher pelo menos 1 animal")
            .required("Obrigatório"),
          //animals type
          cats: Yup.boolean().required("Obrigatório").oneOf([true, false]),
          dogs: Yup.boolean().required("Obrigatório").oneOf([true, false]),
          others: Yup.boolean().required("Obrigatório").oneOf([true, false]),
          //animals size
          small: Yup.boolean().required("Obrigatório").oneOf([true, false]),
          middle: Yup.boolean().required("Obrigatório").oneOf([true, false]),
          big: Yup.boolean().required("Obrigatório").oneOf([true, false]),
          // social medias
          facebook: Yup.string()
            .ensure()
            .notRequired()
            .trim()
            .url("Deve ser uma url válida"),
          twitter: Yup.string()
            .ensure()
            .notRequired()
            .trim()
            .url("Deve ser uma url válida"),
          instagram: Yup.string()
            .ensure()
            .notRequired()
            .trim()
            .url("Deve ser uma url válida"),
          images: Yup.array(Yup.object()),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const type = [];
          const size = [];
          
          if(values.cats) {
            type.push("gatos");
          }
          if(values.dogs){
            type.push("cachorros");
          }
          if(values.others) {
            type.push("outros");
          }

          if(values.small) {
            size.push("pequenos");
          }
          if(values.middle){
            size.push("médios");
          }
          if(values.big) {
            size.push("grandes");
          }

          const submitData = {
            name: values.name,
            contact: values.contact,
            description: values.description,
            acceptConditions: {
              type: type,
              size: size,
              number: values.number,
              time: values.time,
              payment: `${values.payment? "sim" : "não"}`,
              havePets: `${values.havePets? "sim" : "não"}`,
            },
            social: {
              facebook: values.facebook,
              twitter: values.twitter,
              instagram: values.instagram,
            },
            images: [],
          };
          (() => {
            if ("geolocation" in navigator) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  try {
                    const { latitude, longitude } = position.coords;

                    const docRef = doc(db, "shelters", user.uid);
                    setDoc(
                      docRef,
                      {
                        ...submitData,
                        location: generateHash(latitude, longitude),
                      },
                      { merge: true }
                    ).then((result) => {
                      props.setModalShow(false);
                      setToastText("Salvo com sucesso!");
                      setVariant("sucess");
                      setShowToast(true);
                      props.setHaveShelter(true);
                      setSubmitting(false);
                    });
                  } catch (error) {
                    props.setModalShow(false);
                    setToastText("Ocorreu um erro ao salvar!");
                    setVariant("danger");
                    setShowToast(true);
                    setSubmitting(false);
                  }
                },
                (error) => {
                  setToastText(
                    "Para completar o cadastro é necessário permitir o acesso a geolocalização"
                  );
                  setVariant("danger");
                  setShowToast(true);
                }
              );
            } else {
              props.setToastText(
                "Não foi possível acessar a geolocalização nesse navegador!"
              );
              setVariant("danger");
              props.setShowToast(true);
            }
          })();
        }}
      >
        <Form>
          <Container>
            <Row className="my-3">
              <TextInput label="Nome do lar" name="name" type="text" />
            </Row>
            <Row className="my-3">
              <TextInput
                label="Contato"
                name="contact"
                type="text"
                placeholder="99999999999"
              />
            </Row>
            <Row className="my-3">
              <TextArea
                label="Breve descrição sobre o lar"
                name="description"
                type="text"
              />
            </Row>

            <Row className="my-3">
              <TextInput
                label="Aceita até quantos animais?"
                name="number"
                type="number"
              />
            </Row>
            <Row className="my-3">
              <Select label="Tempo disponível para o acolhimento" name="time">
                <option value="">Selecione um período de tempo</option>
                <option value="dias">dias</option>
                <option value="semanas">semanas</option>
                <option value="meses">meses</option>
              </Select>
            </Row>
            <Row className="my-3">
              <Checkbox name="payment">
                Necessito ajuda com alimentação e veterinário
              </Checkbox>
            </Row>
            <Row className="my-3">
              <Checkbox name="havePets">Possuo outros animais</Checkbox>
            </Row>
            <Row className="my-3">
              <fieldset>
                <label>Tipos de animais aceitos</label>
                <Checkbox name="cats">gatos</Checkbox>
                <Checkbox name="dogs">cachorros</Checkbox>
                <Checkbox name="others">outros</Checkbox>
              </fieldset>
            </Row>
            <Row className="my-3">
              <fieldset>
                <label>Porte dos animais aceitos</label>
                <Checkbox name="small">pequenos</Checkbox>
                <Checkbox name="middle">médios</Checkbox>
                <Checkbox name="big">grandes</Checkbox>
              </fieldset>
            </Row>
            <Row className="my-3">
              <fieldset>
                <label>Redes Sociais <span className="text-danger">*</span></label>
                <Row className="mb-3">
                  <TextInput
                    label="Facebook"
                    name="facebook"
                    type="url"
                    placeholder="https://example.com"
                  />
                </Row>
                <Row className="my-3">
                  <TextInput
                    label="Twitter"
                    name="twitter"
                    type="url"
                    placeholder="https://example.com"
                  />
                </Row>
                <Row className="my-3">
                  <TextInput
                    label="Instagram"
                    name="instagram"
                    type="url"
                    placeholder="https://example.com"
                  />
                </Row>
              </fieldset>
            </Row>
          </Container>
          <Row>
            <Stack direction="horizontal" className="justify-content-end">
              <Button type="submit">Salvar</Button>
            </Stack>
          </Row>
        </Form>
      </Formik>
    </>
  );
};

export default RegisterShelterForm;

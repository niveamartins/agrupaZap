import React, { useEffect, useState, Fragment } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Menu from "../components/NavBar";
import Button from "react-bootstrap/Button";
import instance from "../instance";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";

function CadastrarGrupos(props) {
  const [Localizacao, setLocal] = useState(props.location.state);
  const [Resposta, setResposta] = useState("");
  const [Erro, setErro] = useState("")

  let Request = {};

  const [listaGrupos, setListaGrupos] = useState([]);

  useEffect(() => {
    if (Localizacao !== undefined) {
      instance
        .get("/grupos", {
          params: {
            Latitude: Localizacao.lat,
            Longitude: Localizacao.lon,
          },
        })
        .then((response) => {
          setListaGrupos(response.data);
        });
    } else {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLocal({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        });
      }
    }
  }, []);

  async function handleRequest() {
    Request.NR_Latitude = Localizacao.lat;
    Request.NR_Longitude = Localizacao.lon;

    if (Request.B_Privado === undefined) {
      Request.B_Privado = false;
    }

    try {
      await instance
        .post("/grupo", Request)
        .then((response) => {
          setResposta(response.data);
          setErro("")
        })
        .catch((err) => {
          setErro(err.response.data.error_msg);
          setResposta("")
        });
    } catch (err) {}
  }

  return (
    <div>
      <Menu />
      <div className="col-md-8 mt-5 ml-2">
        <div>
          <h1 className="text-primary">
            Precisamos de algumas informações para cadastrar seu grupo...
          </h1>
        </div>

        {Localizacao !== "" && Localizacao !== undefined && (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleRequest();
            }}
            className="mt-5"
          >
            <Form.Group>
              <Form.Label>Nome do Grupo</Form.Label>
              <Form.Control
                required
                onChange={(e) => {
                  Request.STR_NomeGrupo = e.target.value;
                }}
                type="text"
                placeholder="Insira o nome do grupo"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Descrição do Grupo</Form.Label>
              <Form.Control
                required
                onChange={(e) => {
                  Request.STR_DescricaoGrupo = e.target.value;
                }}
                type="text"
                placeholder="Insira uma descrição"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Link para o Grupo</Form.Label>
              <Form.Control
                required
                onChange={(e) => {
                  Request.TXT_InviteGrupo = e.target.value;
                }}
                type="text"
                placeholder="Insira o link de invite"
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                onChange={(e) => {
                  if (
                    Request.B_Privado === undefined ||
                    Request.B_Privado === false
                  ) {
                    Request.B_Privado = true;
                  } else {
                    Request.B_Privado = false;
                  }
                }}
                type="checkbox"
                label="Privado"
              />
            </Form.Group>

            <div className="row mt-4 align-items-center">
              <Button className="col-md" variant="primary" type="submit">
                Cadastrar
              </Button>

              <div>
                {Resposta.ID_Entrada !== undefined && (
                  <p className="col-md text-info">
                    Grupo cadastrado com sucesso. A chave de acesso é{" "}
                    {Resposta.ID_Entrada}
                  </p>
                )}

                {Erro !== "" && (
                  <p className="col-md text-danger">
                    {Erro}
                  </p>
                )}

                {Resposta === "Cadastrado com sucesso." && (
                    <p className="col-md text-info">Grupo cadastrado com sucesso.</p>
                  )}
              </div>
            </div>
          </Form>
        )}

        {Localizacao === "" ||
          (Localizacao === undefined && (
            <div className="mt-3 align-self-center">
              <p className="text-danger">
                Precisamos da sua localização para poder usar o app.
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CadastrarGrupos;

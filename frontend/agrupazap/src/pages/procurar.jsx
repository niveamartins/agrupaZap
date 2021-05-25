import React, { useEffect, useState, Fragment } from "react";
import Card from "react-bootstrap/Card";
import Menu from "../components/NavBar";
import Button from "react-bootstrap/Button";
import instance from "../instance";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ProcurarGrupos(props) {
  const [Localizacao, setLocal] = useState(props.location.state);
  const [listaGrupos, setListaGrupos] = useState([]);
  const [selecionado, setSelecionado] = useState("");
  const [InvitePriv, setInvitePriv] = useState("");

  let Request = {};

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  }, [Localizacao]);

  async function handleRequest() {
    instance
      .get("/invite", {
        params: Request,
      })
      .then((response) => {
        setInvitePriv(response.data.TXT_InviteGrupo);
      });
  }

  return (
    <div>
      <Menu />
      <div className="col-md-8 mt-5 ml-2">
        <div>
          <h1 className="text-primary mb-5">
            Achamos esses grupos aqui na sua localização, dá uma olhada:
          </h1>
        </div>

        {listaGrupos.map((element, index) => (
          <Fragment key={index}>
            <Card
              onClick={() => {
                setSelecionado(element);
                handleShow();
              }}
              className="mt-3"
            >
              <Card.Body>
                <Card.Title>
                  {element.STR_NomeGrupo}{" "}
                  {element.B_Privado === true && (
                    <Badge className="ml-2" variant="secondary">
                      Privado
                    </Badge>
                  )}
                </Card.Title>

                <Card.Text>{element.STR_DescricaoGrupo}</Card.Text>
              </Card.Body>
            </Card>
          </Fragment>
        ))}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Dados do Grupo</Modal.Title>
          </Modal.Header>
          <Modal.Body className="ml-2 mr-2 mt-3">
            <h4 className="text-secondary">{selecionado.STR_NomeGrupo}</h4>
            <p className="mt-4">{selecionado.STR_DescricaoGrupo}</p>

            {selecionado.B_Privado === true && (
              <div className="align-items-center">
                {InvitePriv === "" && (
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleRequest();
                    }}
                    className="mt-5"
                  >
                    <Form.Group>
                      <Form.Label>Senha de Acesso</Form.Label>
                      <Form.Control
                        required
                        onChange={(e) => {
                          Request.ID_Entrada = e.target.value;
                          Request.ID_Grupo = selecionado.SQ;
                        }}
                        type="text"
                        placeholder="Insira a senha de acesso"
                      />
                    </Form.Group>

                    <div className="row mt-4 align-items-center">
                      <Button
                        className="col-md"
                        variant="primary"
                        type="submit"
                      >
                        Confirmar Senha
                      </Button>
                    </div>
                  </Form>
                )}

                {InvitePriv !== "" && (
                  <a target="_blank" href={InvitePriv}>
                    <Button variant="secondary" onClick={handleClose}>
                      Entrar no Grupo
                    </Button>
                  </a>
                )}
              </div>
            )}

            {selecionado.B_Privado === false && (
              <div className="align-items-center">
                <a target="_blank" href={selecionado.TXT_InviteGrupo}>
                  <Button variant="secondary" onClick={handleClose}>
                    Entrar no Grupo
                  </Button>
                </a>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        {listaGrupos.length === 0 && (
          <div className="mt-3 align-self-center">
            <p className="text-dark">
              Não localizamos nenhum grupo em nossa base.
            </p>
          </div>
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

export default ProcurarGrupos;

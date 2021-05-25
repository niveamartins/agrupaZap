import React, { useEffect, useState, Fragment } from "react";
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";
import Menu from "../components/NavBar";
import Button from "react-bootstrap/Button";
import instance from "../instance";
import Badge from 'react-bootstrap/Badge'

function ProcurarGrupos(props) {
  const [Localizacao, setLocal] = useState(props.location.state);

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
  }, [Localizacao]);

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
            <Card className="mt-3">
              <Card.Body>
                <Card.Title>{element.STR_NomeGrupo} {
                    element.B_Privado === true && 
                    <Badge variant="secondary">Privado</Badge>
                }</Card.Title>
                
                <Card.Text>
                    {element.STR_DescricaoGrupo}
                </Card.Text>
              </Card.Body>
            </Card>
          </Fragment>
        ))}

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

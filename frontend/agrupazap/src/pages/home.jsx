import React, { useState } from "react";

import { Link } from "react-router-dom";
import Menu from "../components/NavBar";
import Button from "react-bootstrap/Button";

function Home() {
  const [Localizacao, setLocal] = useState("");

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocal({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }

  return (
    <div>
      <Menu />
      <div className="col-md-8 mt-5 ml-2">
        <div>
          <h1 className="text-primary">
            Precisa reunir todos os seus amigos em um grupo, mas vai dar um
            trabalho enorme fazer isso?
          </h1>
          <p className="text-gray mt-2 mb-2">
            Chegou o AgrupaZap para te salvar! Tudo que você precisa é estar no
            mesmo local que eles, autorizar nosso acesso a sua localização,
            criar o grupo e cadastrar em nosso site. Assim, todos eles poderão
            achar seu grupo ao entrar aqui. Vamos começar?
          </p>
        </div>

        {Localizacao !== "" && (
          <div className="mt-3 align-self-center">
            <Link
              to={{
                pathname: "/procurar",
                state: Localizacao,
              }}
            >
              <Button className="mr-3" variant="primary">
                Procurar Grupos
              </Button>
            </Link>
            <Link
              to={{
                pathname: "/cadastrar",
                state: Localizacao,
              }}
            >
              <Button variant="outline-secondary">Cadastrar Grupo</Button>
            </Link>
          </div>
        )}

        {Localizacao === "" && (
          <div className="mt-3 align-self-center">
            <p className="text-danger">
              Precisamos da sua localização para poder usar o app.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

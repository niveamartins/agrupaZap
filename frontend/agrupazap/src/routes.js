import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CadastrarGrupos from './pages/cadastrar';
import Home from './pages/home';
import ProcurarGrupos from './pages/procurar';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/procurar" exact component={ProcurarGrupos} />
                <Route path="/cadastrar" exact component={CadastrarGrupos} />
            </Switch>
        </BrowserRouter>
    );
}
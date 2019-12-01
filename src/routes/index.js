import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn'; // Rotas de Autenticacao
import Students from '../pages/Students'; // Rotas de Autenticacao
import Plans from '../pages/Plans'; // Rotas de Autenticacao
import Registrations from '../pages/Registrations'; // Rotas de Autenticacao
import HelpOrders from '../pages/HelpOrders'; // Rotas de Autenticacao

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route path="/helpOrders" exact component={HelpOrders} isPrivate />
    </Switch>
  );
}

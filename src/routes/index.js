import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn'; // Rotas de Autenticacao
import Students from '../pages/Students'; // Rotas de Autenticacao
import CreateStudent from '../pages/Students/CreateStudent'; // Rotas de Autenticacao
import EditStudent from '../pages/Students/EditStudent'; // Rotas de Autenticacao
import Plans from '../pages/Plans'; // Rotas de Autenticacao
import CreatePlan from '../pages/Plans/CreatePlan'; // Rotas de Autenticacao
import Registrations from '../pages/Registrations'; // Rotas de Autenticacao
import CreateRegistration from '../pages/Registrations/CreateRegistration'; // Rotas de Autenticacao
import HelpOrders from '../pages/HelpOrders'; // Rotas de Autenticacao

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/create" component={CreateStudent} isPrivate />
      <Route path="/students/edit/" component={EditStudent} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/create" component={CreatePlan} isPrivate />

      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route
        path="/registrations/create"
        component={CreateRegistration}
        isPrivate
      />

      <Route path="/helpOrders" exact component={HelpOrders} isPrivate />
    </Switch>
  );
}
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import DefaultLayout from '~/pages/_layouts/default';
import AuthLayout from '~/pages/_layouts/auth';
import { store } from '~/store';

export default function RouteWrapper({
  component: Component, // a funcao vai receber um parametro component que eh renomeado para Component
  isPrivate, // demarca se eh uma rota privada ou nao
  ...rest
}) {
  const { signed } = store.getState().auth;

  // se o usuario nao esta logado e eh uma area privada, entao direciona para rota /
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }
  // se usuario ja esta logado e rota nao eh privada, direciona para o dashboard
  if (signed && !isPrivate) {
    return <Redirect to="/students" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout; // define se o Estilo vai ser logado ou nao

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false, // crava que o valor default de isPrivate eh false
};

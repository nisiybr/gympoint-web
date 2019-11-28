import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
  component: Component, // a funcao vai receber um parametro component que eh renomeado para Component
  isPrivate, // demarca se eh uma rota privada ou nao
  ...rest
}) {
  const signed = false;

  // se o usuario nao esta logado e eh uma area privada, entao direciona para rota /
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }
  // se usuario ja esta logado e rota nao eh privada, direciona para o dashboard
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false, // crava que o valor default de isPrivate eh false
};

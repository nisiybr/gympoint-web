import React from 'react';
import { useDispatch } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';
import Logo from '~/assets/images/logo.png';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({email,password}) {
    dispatch(signInRequest(email,password));
  }

  return (
    <>
      <img src={Logo} alt="Logo" />
      <Form onSubmit={handleSubmit}>
        <strong>SEU E-MAIL</strong>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <strong>SUA SENHA</strong>
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}

import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import Logo from '~/assets/images/logo.png';

export default function SignIn() {
  return (
    <>
      <img src={Logo} alt="Logo" />
      <Form>
        <strong>SEU E-MAIL</strong>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <strong>SUA SENHA</strong>
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}

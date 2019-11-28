import React from 'react';

import { Form, Input } from '@rocketseat/unform';
import { Container, LoginBox } from './styles';
import Logo from '~/assets/images/logo.png';

export default function SignIn() {
  return (
    <Container>
      <LoginBox>
        <img src={Logo} alt="Logo" />
        <Form>
          <strong>SEU E-MAIL</strong>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <strong>SUA SENHA</strong>
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button type="submit">Entrar no sistema</button>
        </Form>
      </LoginBox>
    </Container>
  );
}

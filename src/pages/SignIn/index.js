import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';
import Logo from '~/assets/images/logo.png';
import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail valido')
    .required('O e-mail e obrigatorio'),
  password: Yup.string()
    .min(6, 'A senha precisa ter no minimo 6 caracteres')
    .required('A senha e obrigatoria'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={Logo} alt="Logo" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <strong>SEU E-MAIL</strong>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <strong>SUA SENHA</strong>
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}

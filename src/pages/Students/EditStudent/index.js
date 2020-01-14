import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Container, Header, Data, Content } from './styles';
import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string().required('Informar um nome e obrigatorio'),
  email: Yup.string()
    .email('Insira um e-mail valido')
    .required('O e-mail e obrigatorio'),
  age: Yup.number()
    .typeError('Idade deve ser um número')
    .integer('Idade deve ser um número inteiro')
    .required('Idade é obrigatória'),
  weight: Yup.number()
    .typeError('Peso deve ser um número')
    .required('Peso é obrigatório'),
  height: Yup.number()
    .typeError('Altura deve ser um número')
    .required('Altura é obrigatório'),
});

export default function EditStudents() {
  const [student, setStudent] = useState([]);

  function handleBack() {
    history.push('/students');
  }
  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      await api.put('students', {
        name,
        email,
        age,
        weight,
        height,
      });
      toast.success('Dados do aluno com sucesso!');
      history.push('/students');
    } catch (err) {
      toast.error('Não foi possível alterar os dados do aluno!');
    }
  }

  useEffect(() => {
    setStudent(history.location.state.student);
  }, [student]);

  return (
    <Container>
      <Content>
        <Header>
          <span>Alteração de Aluno</span>
          <div>
            <button id="back" onClick={handleBack} type="button">
              VOLTAR
            </button>
            <button id="ok" type="submit" form="form">
              SALVAR
            </button>
          </div>
        </Header>

        <Data>
          <Form
            schema={schema}
            initialData={student[0]}
            id="form"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name">
                <strong>NOME COMPLETO</strong>
                <Input type="text" name="name" placeholder="Digite o nome" />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                <strong>ENDERECO DE-MAIL</strong>
                <Input
                  type="email"
                  name="email"
                  readOnly
                  placeholder="exemplo@email.com.br"
                />
              </label>
            </div>
            <div>
              <label htmlFor="age">
                <strong>IDADE</strong>
                <Input type="number" name="age" placeholder="Informe a idade" />
              </label>
              <label htmlFor="weight">
                <strong>PESO (em kg)</strong>
                <Input
                  type="number"
                  step="any"
                  name="weight"
                  placeholder="Informe o peso"
                />
              </label>
              <label htmlFor="height">
                <strong>ALTURA</strong>
                <Input
                  type="number"
                  step="any"
                  name="height"
                  placeholder="Informe a altura"
                />
              </label>
            </div>
          </Form>
        </Data>
      </Content>
    </Container>
  );
}

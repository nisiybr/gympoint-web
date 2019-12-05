import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import { Container, Header, Data, Content } from './styles';
import api from '~/services/api';
import history from '~/services/history';

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
          <Form initialData={student[0]} id="form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">
                <span>NOME COMPLETO</span>
                <Input type="text" name="name" placeholder="Digite o nome" />
              </label>
            </div>
            <div>
              <label htmlFor="email">
                <span>ENDERECO DE-MAIL</span>
                <Input
                  type="email"
                  name="email"
                  placeholder="exemplo@email.com.br"
                />
              </label>
            </div>
            <div>
              <label htmlFor="age">
                <span>IDADE</span>
                <Input type="number" name="age" placeholder="Informe a idade" />
              </label>
              <label htmlFor="weight">
                <span>PESO (em kg)</span>
                <Input
                  type="number"
                  step="any"
                  name="weight"
                  placeholder="Informe o peso"
                />
              </label>
              <label htmlFor="height">
                <span>ALTURA</span>
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

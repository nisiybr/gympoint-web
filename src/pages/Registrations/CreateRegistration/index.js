import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { Container, Header, Data, Content } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function CreateRegistration() {
  function handleBack() {
    history.push('/registrations');
    console.tron.log(history);
  }
  async function handleSubmit({ student_id, plan_id, start_date }) {
    try {
      await api.post('registration', {
        student_id,
        plan_id,
        start_date,
      });
      toast.success('Nova matrícula registrada com sucesso!');
      history.push('/registrations');
    } catch (err) {
      toast.error('Não foi registrar a nova matrícula!');
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <span>Cadastro de Matrícula</span>
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
          <Form id="form" onSubmit={handleSubmit}>
            <div>
              <Input type="hidden" name="student_id" />
              <label htmlFor="student_name">
                <span>ALUNO</span>
                <Input
                  type="text"
                  name="student_name"
                  placeholder="Buscar Aluno"
                />
              </label>
            </div>
            <div>
              <Input type="hidden" name="plan_id" />
              <label htmlFor="plan">
                <span>PLANO</span>
                <Input
                  type="text"
                  name="plan"
                  placeholder="Selecione o plano"
                />
              </label>
            </div>
            <div>
              <label htmlFor="start_date">
                <span>DATA DE INICIO</span>
                <Input
                  type="date"
                  name="start_date"
                  placeholder="Escolha a data"
                />
              </label>
              <label htmlFor="end_date">
                <span>DATA DE TÉRMINO</span>
                <Input
                  type="date"
                  name="end_date"
                  placeholder="Campo calculado"
                />
              </label>
              <label htmlFor="total">
                <span>VALOR FINAL</span>
                <Input
                  type="number"
                  step="any"
                  name="total"
                  placeholder="Campo calculado"
                />
              </label>
            </div>
          </Form>
        </Data>
      </Content>
    </Container>
  );
}

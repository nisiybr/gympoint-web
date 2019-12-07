import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';

import { Container, Header, Data, Content } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function EditRegistration() {
  const [registrations, setRegistrations] = useState({});

  useEffect(() => {
    async function loadData() {
      const { result } = history.location.state;
      const data = {
        ...result,
        start_date: format(parseISO(result.start_date), 'yyyy-MM-dd'),
        end_date: format(parseISO(result.end_date), 'yyyy-MM-dd'),
      };

      setRegistrations(data);
    }
    loadData();
  }, []);

  function handleBack() {
    history.push('/registrations');
  }
  async function handleSubmit({ id, start_date }) {
    try {
      await api.put(`registration/${id}`, {
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
          <span>Alteração de Matrícula</span>
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
          <Form id="form" initialData={registrations} onSubmit={handleSubmit}>
            <Input type="hidden" name="id" />
            <div>
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

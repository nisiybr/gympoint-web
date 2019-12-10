import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { toast } from 'react-toastify';

import { Container, Header, Data, Content } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function EditRegistration() {
  const [registrations, setRegistrations] = useState({});

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    async function loadData() {
      const { result } = history.location.state;
      const start_date = utcToZonedTime(parseISO(result.start_date), timezone);
      const end_date = utcToZonedTime(parseISO(result.end_date), timezone);
      const data = {
        ...result,
        start_date: format(start_date, 'yyyy-MM-dd'),
        end_date: format(end_date, 'yyyy-MM-dd'),
      };
      setRegistrations(data);
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleBack() {
    history.push('/registrations');
  }
  async function handleSubmit({ id, start_date }) {
    try {
      await api.put(`registration/${id}`, {
        start_date: parseISO(start_date),
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
                  name="price"
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

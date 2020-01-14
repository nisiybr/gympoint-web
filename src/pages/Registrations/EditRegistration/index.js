import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { format, parseISO, addDays, addMonths } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Container, Header, Data, Content } from './styles';
import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  id: Yup.string().required('É necessário selecionar um aluno'),
  start_date: Yup.string().required(
    'É necessário selecionar uma data de inicio'
  ),
});

export default function EditRegistration() {
  const [registrations, setRegistrations] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    async function loadData() {
      const { result } = history.location.state;
      const start_date = utcToZonedTime(parseISO(result.start_date), timezone);
      const start_date_formatted = format(start_date, 'yyyy-MM-dd');
      const end_date = utcToZonedTime(parseISO(result.end_date), timezone);
      const end_date_formatted = format(end_date, 'yyyy-MM-dd');
      const data = {
        ...result,
        start_date: start_date_formatted,
        end_date: end_date_formatted,
        plan: `${result.Plan.title} - ${result.Plan.duration} meses - R$ ${result.Plan.month_price}`,
      };
      setRegistrations(data);
      setStartDate(start_date_formatted);
      setEndDate(end_date_formatted);
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(
    () => {
      if (registrations) {
        if (startDate) {
          const start_date_conv = parseISO(startDate); // converte e trunca data de inicio
          const end_date = format(
            addDays(
              addMonths(start_date_conv, registrations.Plan.duration),
              -1
            ),
            'yyyy-MM-dd'
          ); // calcula a data de fim de acordo com o plano
          setEndDate(end_date);
        }
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [startDate]
  );

  function handleBack() {
    history.push('/registrations');
  }
  function handleChangeStartDate(date) {
    setStartDate(date);
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
          <Form
            schema={schema}
            id="form"
            initialData={registrations}
            onSubmit={handleSubmit}
          >
            <Input type="hidden" name="id" />
            <div>
              <label htmlFor="student_name">
                <strong>ALUNO</strong>
                <Input
                  type="text"
                  name="student_name"
                  placeholder="Buscar Aluno"
                  readOnly
                />
              </label>
            </div>
            <div>
              <label htmlFor="plan">
                <strong>PLANO</strong>
                <Input
                  type="text"
                  name="plan"
                  placeholder="Selecione o plano"
                  readOnly
                />
              </label>
            </div>
            <div>
              <label htmlFor="start_date">
                <strong>DATA DE INICIO</strong>
                <Input
                  type="date"
                  name="start_date"
                  placeholder="Escolha a data"
                  onChange={event => handleChangeStartDate(event.target.value)}
                />
              </label>
              <label htmlFor="end_date">
                <strong>DATA DE TÉRMINO</strong>
                <Input
                  type="date"
                  name="end_date"
                  value={endDate}
                  placeholder="Campo calculado"
                  readOnly
                />
              </label>
              <label htmlFor="total">
                <strong>VALOR FINAL</strong>
                <Input
                  type="number"
                  step="any"
                  name="price"
                  placeholder="Campo calculado"
                  readOnly
                />
              </label>
            </div>
          </Form>
        </Data>
      </Content>
    </Container>
  );
}

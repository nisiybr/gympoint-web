import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { parseISO, addDays, addMonths, format } from 'date-fns';
import { Container, Header, Data, Content, ASelect } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function CreateRegistration() {
  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [planId, setPlanId] = useState('');
  const [, setInputValue] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [price, setPrice] = useState();

  async function loadStudents() {
    const response = await api.get('students');
    const { data } = response;
    const result = data.map(item => {
      return {
        value: item.id,
        label: `${item.name} - ${item.email}`,
      };
    });
    setStudents(result);
  }
  async function loadPlans() {
    const response = await api.get('plans');
    setPlans(response.data);
  }

  useEffect(() => {
    loadStudents();
    loadPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(
    () => {
      const plan = plans.filter(item => parseInt(item.id) === parseInt(planId));
      if (plan) {
        const result = plan[0];
        if (result && startDate) {
          const { duration, price: planPrice } = result;
          const start_date_conv = parseISO(startDate); // converte e trunca data de inicio
          const end_date = format(
            addDays(addMonths(start_date_conv, duration), -1),
            'yyyy-MM-dd'
          ); // calcula a data de fim de acordo com o plano
          const totalPrice = duration * planPrice;
          setEndDate(end_date);
          setPrice(totalPrice);
        }
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [startDate, planId]
  );

  function filterStudents(inputValue: string) {
    return students.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  function loadOptions(inputValue, callback) {
    setTimeout(() => {
      callback(filterStudents(inputValue));
    }, 1000);
  }

  function handleInputChange(newValue: string) {
    const inputValue = newValue.replace(/\W/g, '');
    setInputValue(inputValue);
    return inputValue;
  }

  function handleBack() {
    history.push('/registrations');
  }

  function handleChangeStudent(object) {
    setStudentId(object.value);
  }
  function handleChangePlan(id) {
    setPlanId(id);
  }
  function handleChangeStartDate(date) {
    setStartDate(date);
  }
  async function handleSubmit({ student_id, plan_id, start_date }) {
    try {
      await api.post('registration', {
        student_id,
        plan_id,
        start_date: parseISO(start_date),
      });
      toast.success('Nova matrícula registrada com sucesso!');
      history.push('/registrations');
    } catch (err) {
      toast.error('Não foi possivel registrar a nova matrícula!');
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
            <div className="field">
              <label htmlFor="student">
                <Input type="hidden" name="student_id" value={studentId} />
                <span>ALUNO</span>
                <ASelect
                  cacheOptions
                  loadOptions={loadOptions}
                  defaultOptions={students}
                  onInputChange={handleInputChange}
                  onChange={handleChangeStudent}
                />
              </label>
            </div>
            <div className="field">
              <label htmlFor="plan">
                <Input type="hidden" name="plan_id" value={planId} />
                <span>PLANO</span>
                <select
                  name="plan"
                  onChange={event => handleChangePlan(event.target.value)}
                >
                  <option value="">-- Selecione um plano --</option>
                  {plans.map(item => (
                    <option
                      key={item.id}
                      value={item.id}
                    >{`${item.title} - ${item.duration} meses - R$ ${item.price}`}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="field">
              <label htmlFor="start_date">
                <span>DATA DE INICIO</span>
                <Input
                  type="date"
                  name="start_date"
                  placeholder="Escolha a data"
                  onChange={event => handleChangeStartDate(event.target.value)}
                />
              </label>
              <label htmlFor="end_date">
                <span>DATA DE TÉRMINO</span>
                <Input type="date" name="end_date" value={endDate} readOnly />
              </label>
              <label htmlFor="total">
                <span>VALOR FINAL</span>
                <Input
                  type="number"
                  step="any"
                  name="total"
                  value={price}
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

import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { parseISO } from 'date-fns';
import AsyncSelect from 'react-select/async';
import { Container, Header, Data, Content } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function CreateRegistration() {
  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [planId, setPlanId] = useState('');

  async function loadStudents() {
    const response = await api.get('students');
    const { data } = response;
    const result = data.map(item => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    setStudents(result);
  }

  async function loadPlans() {
    const response = await api.get('plans');
    setPlans(response.data);
  }

  async function filterColors(inputValue) {
    const response = await api.get('students');
    return response.data.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });

  function handleBack() {
    history.push('/registrations');
    console.tron.log(history);
  }

  function handleChangeStudent(id) {
    setStudentId(id);
  }
  function handleChangePlan(id) {
    setPlanId(id);
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

  useEffect(() => {
    loadStudents();
    loadPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <label htmlFor="student">
                <Input type="hidden" name="student_id" value={studentId} />
                <span>ALUNO</span>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={promiseOptions}
                  loadedOptions
                />
                {/* <select
                  name="student"
                  onChange={event => handleChangeStudent(event.target.value)}
                >
                  <option value="">-- Selecione um aluno --</option>
                  {students.map(item => (
                    <option
                      key={item.value}
                      value={item.value}
                    >{`${item.label}`}</option>
                  ))}
                </select> */}
              </label>
            </div>
            <div>
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

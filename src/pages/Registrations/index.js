import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { toast } from 'react-toastify';
import { Container, Content, Header, Data } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function handleCreateRegistration() {
    history.push('/registrations/create');
  }
  function handleEdit(id) {
    const registration = registrations.filter(item => {
      return id === item.id;
    });
    const result = registration[0];
    history.push('/registrations/edit', { result });
  }
  async function handleDelete(id, name, plan, start, end) {
    // eslint-disable-next-line no-restricted-globals
    const op = confirm(
      `Deseja realmente excluir a matricula do aluno ${name}, com plano ${plan}, com data de inicio ${start} e data de fim ${end}?`
    );

    if (op) {
      try {
        await api.delete(`registration/${id}`);
        toast.success('Matricula excluida com sucesso');
        const data = registrations.filter(item => {
          return item.id !== id;
        });
        setRegistrations(data);
      } catch (err) {
        toast.error(
          'Falha ao excluir matricula, favor entrar em contato com o Administrador do Sistema'
        );
      }
    }
  }

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('registration');

      const data = response.data.map(item => ({
        ...item,
        startDateFormatted: format(
          utcToZonedTime(parseISO(item.start_date), timezone),
          'dd/MM/yyyy'
        ),
        endDateFormatted: format(
          utcToZonedTime(parseISO(item.end_date), timezone),
          'dd/MM/yyyy'
        ),
        student_name: item.Student.student_name,
        plan: item.Plan.title,
      }));
      setRegistrations(data);
    }
    loadRegistrations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Content>
        <Header>
          <span>Gerenciando Matrículas</span>
          <div>
            <button id="ok" onClick={handleCreateRegistration} type="button">
              Cadastrar
            </button>
          </div>
        </Header>
        <Data>
          <table>
            <thead>
              <tr>
                <th>ID DA MATRICULA</th>
                <th>ALUNO</th>
                <th>PLANO</th>
                <th>INÍCIO</th>
                <th>TÉRMINO</th>
                <th>ATIVA</th>
                <th>OPÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={6}>Não existem planos cadastrados</td>
                </tr>
              ) : (
                registrations.map(registration => (
                  <tr key={registration.id}>
                    <td>{registration.id}</td>
                    <td>{registration.Student.student_name}</td>
                    <td>{registration.Plan.title}</td>
                    <td>{registration.startDateFormatted}</td>
                    <td>{registration.endDateFormatted}</td>
                    <td>{registration.active ? 'Sim' : 'Não'}</td>
                    <td>
                      <button
                        type="button"
                        id="editar"
                        onClick={() => handleEdit(registration.id)}
                      >
                        editar
                      </button>
                      <button
                        type="button"
                        id="excluir"
                        onClick={() =>
                          handleDelete(
                            registration.id,
                            registration.Student.student_name,
                            registration.Plan.title,
                            registration.startDateFormatted,
                            registration.endDateFormatted
                          )
                        }
                      >
                        apagar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Data>
      </Content>
    </Container>
  );
}

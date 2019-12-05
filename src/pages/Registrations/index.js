import React, { useState, useEffect } from 'react';
import { Container, Content, Header, Data } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);

  function handleCreateRegistration() {
    history.push('/registrations/create');
  }

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('registration');
      setRegistrations(response.data);
    }
    loadRegistrations();
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
            <input type="text" placeholder="Buscar Plano" />
          </div>
        </Header>
        <Data>
          <table>
            <thead>
              <tr>
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
                    <td>{registration.Student.student_name}</td>
                    <td>{registration.Plan.title}</td>
                    <td>{registration.start_date}</td>
                    <td>{registration.end_date}</td>
                    <td>{registration.active ? 'Sim' : 'Não'}</td>
                    <td>
                      <button type="button" id="editar">
                        editar
                      </button>
                      <button type="button" id="excluir">
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

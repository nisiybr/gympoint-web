import React, { useState, useEffect } from 'react';
import { Container, Content, Header, Data } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  function handleCreatePlan() {
    history.push('/plans/create');
  }

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');
      setPlans(response.data);
    }
    loadPlans();
  }, []);

  return (
    <Container>
      <Content>
        <Header>
          <span>Gerenciando Planos</span>
          <div>
            <button id="ok" onClick={handleCreatePlan} type="button">
              Cadastrar
            </button>
            <input type="text" placeholder="Buscar Plano" />
          </div>
        </Header>
        <Data>
          <table>
            <thead>
              <tr>
                <th>TÍTULO</th>
                <th>DURAÇÃO</th>
                <th>VALOR P/ MÊS</th>
                <th>OPÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {plans.length === 0 ? (
                <tr>
                  <td colSpan={4}>Não existem planos cadastrados</td>
                </tr>
              ) : (
                plans.map(plan => (
                  <tr key={plan.id}>
                    <td>{plan.title}</td>
                    <td>{plan.duration}</td>
                    <td>{plan.price}</td>
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

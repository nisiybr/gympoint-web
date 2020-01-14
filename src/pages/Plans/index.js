import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Container, Content, Header, Data } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  function handleCreatePlan() {
    history.push('/plans/create');
  }
  function handleEdit(id) {
    const plan = plans.filter(item => {
      return id === item.id;
    });
    const data = plan[0];
    history.push('/plans/edit', { data });
  }

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');
      setPlans(response.data);
    }
    loadPlans();
  }, []);

  async function handleDelete(id, name) {
    // eslint-disable-next-line no-restricted-globals
    const op = confirm(`Deseja realmente excluir o plano ${name}?`);

    if (op) {
      try {
        await api.delete(`plans/${id}`);
        toast.success('Plano excluido com sucesso');
        const data = plans.filter(item => {
          return item.id !== id;
        });
        setPlans(data);
      } catch (err) {
        toast.error(
          'Falha ao excluir plano, favor entrar em contato com o Administrador do Sistema'
        );
      }
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <span>Gerenciando Planos</span>
          <div>
            <button id="ok" onClick={handleCreatePlan} type="button">
              Cadastrar
            </button>
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
                      <button
                        type="button"
                        id="editar"
                        onClick={() => handleEdit(plan.id)}
                      >
                        editar
                      </button>
                      <button
                        type="button"
                        id="excluir"
                        onClick={() => handleDelete(plan.id, plan.title)}
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

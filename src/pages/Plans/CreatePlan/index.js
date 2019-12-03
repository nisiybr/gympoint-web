import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { Container, Header, Data, Content } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function CreatePlan() {
  function handleBack() {
    history.push('/plans');
    console.tron.log(history);
  }
  async function handleSubmit({ title, duration, price }) {
    try {
      await api.post('plans', {
        title,
        duration,
        price,
      });
      toast.success('Novo plano incluído com sucesso!');
      history.push('/plans');
    } catch (err) {
      toast.error('Não foi possível incluir um novo plano!');
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <span>Cadastro de Plano</span>
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
              <label htmlFor="title">
                <span>TÍTULO DO PLANO</span>
                <Input
                  type="text"
                  name="title"
                  placeholder="Digite o nome do plano"
                />
              </label>
            </div>
            <div>
              <label htmlFor="duration">
                <span>DURAÇÃO (em meses)</span>
                <Input
                  type="number"
                  name="duration"
                  placeholder="Informe a duração"
                />
              </label>
              <label htmlFor="price">
                <span>PREÇO MENSAL</span>
                <Input
                  type="number"
                  step="any"
                  name="price"
                  placeholder="Informe o preço/mês"
                />
              </label>
              <label htmlFor="total">
                <span>PREÇO TOTAL</span>
                <Input
                  type="number"
                  step="any"
                  name="total"
                  placeholder="Total calculado"
                />
              </label>
            </div>
          </Form>
        </Data>
      </Content>
    </Container>
  );
}

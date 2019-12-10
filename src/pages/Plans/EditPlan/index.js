import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import { Container, Header, Data, Content } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function EditPlans() {
  const [plan, setPlan] = useState({});
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);

  const totalPrice = useMemo(() => duration * price, [duration, price]);

  function handleBack() {
    history.push('/plans');
  }
  async function handleSubmit({ id, title, duration, price }) {
    try {
      await api.put(`plans/${id}`, {
        title,
        duration,
        price,
      });
      toast.success('Dados do Plano alterados com sucesso!');
      history.push('/plans');
    } catch (err) {
      toast.error('Não foi possível alterar os dados do plano!');
    }
  }

  useEffect(() => {
    const { data } = history.location.state;
    setDuration(data.duration);
    setPrice(data.price);
    setPlan(data);
  }, []);

  return (
    <Container>
      <Content>
        <Header>
          <span>Edição de Plano</span>
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
          <Form id="form" initialData={plan} onSubmit={handleSubmit}>
            <Input type="hidden" name="id" />
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
                  onChange={event => setDuration(event.target.value)}
                />
              </label>
              <label htmlFor="price">
                <span>PREÇO MENSAL</span>
                <Input
                  type="number"
                  step="any"
                  name="price"
                  placeholder="Informe o preço/mês"
                  onChange={event => setPrice(event.target.value)}
                />
              </label>
              <label htmlFor="total">
                <span>PREÇO TOTAL</span>
                <Input
                  type="number"
                  step="any"
                  name="total"
                  placeholder="Total calculado"
                  value={totalPrice}
                />
              </label>
            </div>
          </Form>
        </Data>
      </Content>
    </Container>
  );
}

import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Container, Header, Data, Content } from './styles';
import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  id: Yup.number().required('Informar um id e obrigatorio'),
  title: Yup.string().required('Informar um nome do plano e obrigatorio'),
  duration: Yup.number()
    .typeError('Duração deve ser um número')
    .integer('Duração deve ser um número inteiro')
    .required('Duração é obrigatória'),
  price: Yup.number()
    .typeError('Preço Mensal deve ser um número')
    .required('Peso é obrigatório'),
});

export default function EditPlans() {
  const [plan, setPlan] = useState({});
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();

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
          <Form
            schema={schema}
            id="form"
            initialData={plan}
            onSubmit={handleSubmit}
          >
            <div>
              <Input type="hidden" name="id" />
              <label htmlFor="title">
                <strong>TÍTULO DO PLANO</strong>
                <Input
                  type="text"
                  name="title"
                  placeholder="Digite o nome do plano"
                />
              </label>
            </div>
            <div>
              <label htmlFor="duration">
                <strong>DURAÇÃO (em meses)</strong>
                <Input
                  type="number"
                  name="duration"
                  placeholder="Informe a duração"
                  onChange={event => setDuration(event.target.value)}
                />
              </label>
              <label htmlFor="price">
                <strong>PREÇO MENSAL</strong>
                <Input
                  type="number"
                  step="any"
                  name="price"
                  placeholder="Informe o preço/mês"
                  onChange={event => setPrice(event.target.value)}
                />
              </label>
              <label htmlFor="total">
                <strong>PREÇO TOTAL</strong>
                <Input
                  type="number"
                  step="any"
                  name="total"
                  placeholder="Total calculado"
                  readOnly
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

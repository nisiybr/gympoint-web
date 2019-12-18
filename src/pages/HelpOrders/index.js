import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { Container, Content, Header, Data, StyledModal } from './styles';
import api from '~/services/api';

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [helpOrderModal, setHelpOrderModal] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit({ id, answer }) {
    try {
      await api.put(`help-orders/${id}/answer`, {
        answer,
      });
      toast.success('Pedido de Ajuda respondido com sucesso!');

      const data = helpOrders.filter(item => {
        return parseInt(item.id) !== parseInt(id);
      });

      setHelpOrders(data);

      setIsOpen(!isOpen);
    } catch (err) {
      toast.error('Não foi possível responder ao pedido de ajuda!');
    }
  }

  function toggleModal(id) {
    const data = helpOrders.filter(item => {
      return item.id === id;
    });
    setHelpOrderModal(data);

    setIsOpen(!isOpen);
  }

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('help-orders');
      setHelpOrders(response.data);
    }
    loadHelpOrders();
  }, []);

  return (
    <>
      <Container>
        <Content>
          <Header>
            <span>Pedidos de Auxilio</span>
          </Header>
          <Data>
            <table>
              <thead>
                <tr>
                  <th>ALUNO</th>
                  <th>DATA DE CRIAÇÃO</th>
                  <th>OPÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {helpOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6}>Não existem planos cadastrados</td>
                  </tr>
                ) : (
                  helpOrders.map(helpOrder => (
                    <tr key={helpOrder.id}>
                      <td>{helpOrder.Student.name}</td>
                      <td>
                        {format(parseISO(helpOrder.createdAt), 'dd/MM/yyyy')}
                      </td>
                      <td>
                        <button
                          type="button"
                          id="editar"
                          onClick={() => toggleModal(helpOrder.id)}
                        >
                          responder
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
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        {helpOrderModal.map(item => (
          <>
            <strong>PERGUNTA DO ALUNO</strong>
            <p>{item.question}</p>
            <strong>SUA RESPOSTA</strong>
            <Form key={item.id} onSubmit={handleSubmit}>
              <Input type="hidden" name="id" value={item.id} />
              <Input
                multiline
                type="text"
                name="answer"
                placeholder="Escreva sua resposta"
                rows={5}
              />
              <button type="submit">Responder aluno</button>
            </Form>
          </>
        ))}
      </StyledModal>
    </>
  );
}

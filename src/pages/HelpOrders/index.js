import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { FaSpinner } from 'react-icons/fa';
import * as Yup from 'yup';
import {
  Container,
  Content,
  Header,
  Data,
  StyledModal,
  ModalButton,
} from './styles';
import api from '~/services/api';

const schema = Yup.object().shape({
  id: Yup.number().required(),
  answer: Yup.string().required('É necessário informar uma resposta'),
});

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [helpOrderModal, setHelpOrderModal] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit({ id, answer }) {
    try {
      setLoading(true);
      await api.put(`help-orders/${id}/answer`, {
        answer,
      });
      setLoading(false);
      toast.success('Pedido de Ajuda respondido com sucesso!');

      const data = helpOrders.filter(item => {
        return parseInt(item.id) !== parseInt(id);
      });

      setHelpOrders(data);

      setIsOpen(!isOpen);
    } catch (err) {
      toast.error('Não foi possível responder ao pedido de ajuda!');
      setLoading(false);
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
                  <th>ID DE CADASTRO</th>
                  <th>ALUNO</th>
                  <th>DATA DE CRIAÇÃO</th>
                  <th>OPÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {helpOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      Não existem pedidos de auxilio a serem respondidos
                    </td>
                  </tr>
                ) : (
                  helpOrders.map(helpOrder => (
                    <tr key={helpOrder.id}>
                      <td>{helpOrder.student_id}</td>
                      <td>{helpOrder.Student.name}</td>
                      <td>
                        {format(
                          parseISO(helpOrder.createdAt),
                          'dd/MM/yyyy HH:mm:ss'
                        )}
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
            <Form schema={schema} key={item.id} onSubmit={handleSubmit}>
              <Input type="hidden" name="id" value={item.id} />
              <Input
                multiline
                type="text"
                name="answer"
                placeholder="Escreva sua resposta"
                rows={5}
              />
              <ModalButton loading={loading ? 1 : 0}>
                {loading ? (
                  <FaSpinner color="#FFF" size={14} />
                ) : (
                  'Responder aluno'
                )}
              </ModalButton>
            </Form>
          </>
        ))}
      </StyledModal>
    </>
  );
}

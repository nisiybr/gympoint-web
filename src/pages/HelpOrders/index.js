import React, { useState, useEffect } from 'react';
import { Form } from '@rocketseat/unform';
import { Container, Content, Header, Data, StyledModal } from './styles';
import api from '~/services/api';

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
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
                      <td>{helpOrder.createdAt}</td>
                      <td>
                        <button type="button" id="editar" onClick={toggleModal}>
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
        <strong>PERGUNTA DO ALUNO</strong>
        <p>
          Olá pessoal da academia, gostaria de saber se quando acordar devo
          ingerir batata doce e frango logo de primeira, preparar as marmitas e
          lotar a geladeira? Dou um pico de insulina e jogo o hipercalórico?
        </p>
        <strong>SUA RESPOSTA</strong>
        <Form>
          <textarea
            type="textarea"
            name="answer"
            rows={5}
            placeholder="Escreva sua resposta"
          />
          <button type="submit" onClick={toggleModal}>
            Responder aluno
          </button>
        </Form>
      </StyledModal>
    </>
  );
}

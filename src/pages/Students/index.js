import React, { useState, useEffect } from 'react';
import { Container, Content, Header, Data } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function Students() {
  const [students, setStudents] = useState([]);

  function handleCreateStudent() {
    history.push('/students/create');
  }

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');
      setStudents(response.data);
    }
    loadStudents();
  }, []);

  return (
    <Container>
      <Content>
        <Header>
          <span>Gerenciando Alunos</span>
          <div>
            <button id="ok" onClick={handleCreateStudent} type="button">
              Cadastrar
            </button>
            <input type="text" placeholder="Buscar Aluno" />
          </div>
        </Header>
        <Data>
          <table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>E-MAIL</th>
                <th>IDADE</th>
                <th>OPÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={4}>Não existem alunos cadastrados</td>
                </tr>
              ) : (
                students.map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
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

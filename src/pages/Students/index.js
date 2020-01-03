import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Container, Content, Header, Data } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function Students() {
  const [students, setStudents] = useState([]);

  function handleCreateStudent() {
    history.push('/students/create');
  }
  function handleEdit(id) {
    const student = students.filter(item => {
      return id === item.id;
    });
    history.push('/students/edit', { student });
  }

  async function handleDelete(id, name, age) {
    // eslint-disable-next-line no-restricted-globals
    const op = confirm(
      `Deseja realmente excluir o aluno ${name}, com ${age} anos.`
    );

    if (op) {
      try {
        await api.delete(`students/${id}`);
        toast.success('Aluno excluido com sucesso');
        const data = students.filter(item => {
          return item.id !== id;
        });
        setStudents(data);
      } catch (err) {
        toast.error(
          'Falha ao excluir aluno, favor entrar em contato com o Administrador do Sistema'
        );
      }
    }
  }

  async function loadStudents(search) {
    if (!search) {
      const response = await api.get('students');
      setStudents(response.data);
    } else {
      const response = await api.get(`students?q=${search}`);
      setStudents(response.data);
    }
  }
  useEffect(() => {
    loadStudents();
  }, []);
  function handleBlurSearch(event) {
    loadStudents(event.target.value);
  }
  return (
    <Container>
      <Content>
        <Header>
          <span>Gerenciando Alunos</span>
          <div>
            <button id="ok" onClick={handleCreateStudent} type="button">
              Cadastrar
            </button>
            <input
              onChange={handleBlurSearch}
              type="text"
              name="search"
              placeholder="Buscar Aluno"
            />
          </div>
        </Header>
        <Data>
          <table>
            <thead>
              <tr>
                <th>ID DE CADASTRO</th>
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
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>
                      <button
                        type="button"
                        id="editar"
                        onClick={() => handleEdit(student.id)}
                      >
                        editar
                      </button>
                      <button
                        type="button"
                        id="excluir"
                        onClick={() =>
                          handleDelete(student.id, student.name, student.age)
                        }
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

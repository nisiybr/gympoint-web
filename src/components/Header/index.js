import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from './styles';
import logo from '~/assets/images/logo-header.png';

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="header" />
      <nav>
        <NavLink to="students" activeStyle={{ color: '#444' }}>
          ALUNOS
        </NavLink>
        <NavLink to="plans" activeStyle={{ color: '#444' }}>
          PLANOS
        </NavLink>
        <NavLink to="registrations" activeStyle={{ color: '#444' }}>
          MATRICULA
        </NavLink>
        <NavLink to="helpOrders" activeStyle={{ color: '#444' }}>
          PEDIDOS DE AUXILIO
        </NavLink>
      </nav>
      <aside>
        <strong>Guilherme Nisiyama de Jesus</strong>
        <button type="button">Sair do sistema</button>
      </aside>
    </Container>
  );
}

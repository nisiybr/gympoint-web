import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, LinkStyle } from './styles';
import logo from '~/assets/images/logo-header.png';
import { signOut } from '~/store/modules/auth/actions';
import history from '~/services/history';

export default function Header() {
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }

  const { pathname } = history.location;
  const path = pathname.split('/')[1];

  const navs = [
    {
      id: 1,
      to: 'students',
      name: 'ALUNOS',
    },
    {
      id: 2,
      to: 'plans',
      name: 'PLANOS',
    },
    {
      id: 3,
      to: 'registrations',
      name: 'MATRICULA',
    },
    {
      id: 4,
      to: 'helpOrders',
      name: 'PEDIDOS DE AUXILIO',
    },
  ];

  const navs2 = navs.map(nav => {
    if (path !== nav.to) {
      return {
        ...nav,
        active: false,
      };
    }
    return {
      ...nav,
      active: true,
    };
  });

  const { name, email } = useSelector(state => state.user.profile);

  return (
    <Container>
      <img src={logo} alt="header" />
      <nav>
        {navs2.map(nav => (
          <LinkStyle key={nav.id} active={nav.active} to={`/${nav.to}`}>
            {nav.name}
          </LinkStyle>
        ))}
      </nav>
      <aside>
        <strong>{`${name} <${email}>` || 'Usuário'}</strong>
        <button type="button" onClick={handleSignOut}>
          Sair do sistema
        </button>
      </aside>
    </Container>
  );
}

import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';

// tudo que vier dentro das tags AuthLayout vai ser considerado como children nessa desestruturacao
export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}
AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

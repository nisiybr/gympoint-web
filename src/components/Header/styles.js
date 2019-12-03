import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkStyle = styled(Link)`
  color: ${props => (props.active ? '#444' : '#999')};
`;

export const Container = styled.div`
  background: #fff;
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  img {
    padding-right: 20px;
    border-right: 1px solid #ddd;
  }

  nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex: 1;
    a {
      font-size: 15px;
      font-weight: bold;
      margin-left: 20px;
      /* color: #999; */
    }
  }

  aside {
    display: flex;
    flex-direction: column;

    strong {
      color: #666;
      font-size: 14px;
      margin-bottom: 4px;
    }

    button {
      background: none;
      border: none;
      color: #de3b3b;
      font-size: 14px;
      font-weight: normal;
      text-align: right;
    }
  }
`;

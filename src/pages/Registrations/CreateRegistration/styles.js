import AsyncSelect from 'react-select/async';
import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
 from {
  transform: rotate(0deg);
 }
 to {
   transform: rotate(360deg);
 }
`;

export const Button = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading, // pega a props por componetizacao
  form: 'form',
}))`
  border: none;
  background-color: #ee4d64;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  padding: 13px 0;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.7;
  }
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const ASelect = styled(AsyncSelect).attrs({
  placeholder: 'Digite para buscar...',
})`
  width: 100%;
  height: 45px;
  div {
    color: #999999;
    font-size: 16px;
    font-weight: normal;
  }
`;

export const Content = styled.div`
  margin-top: 25px;
  width: 900px;
  padding: 50px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;

  span {
    font-size: 24px;
    font-weight: bold;
  }

  button {
    border: none;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border-radius: 4px;
    padding: 10px 30px;
    margin-right: 16px;

    &#ok {
      background: #ee4d64;
    }
    &#back {
      background: #ccc;
    }
  }
`;

export const Data = styled.div`
  width: 100%;
  background: #fff;
  margin-top: 25px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 30px;

  form {
    width: 100%;
    div.field {
      display: flex;
      flex-direction: row;
    }

    div:not(:last-child) {
      margin-bottom: 8px;
    }
    label {
      width: 100%;
      font-size: 14px;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      margin: 10px 10px;

      strong {
        margin-bottom: 8px;
      }
    }
    input {
      padding: 13px 15px;
      font-size: 16px;
      color: #999999;
      border-radius: 4px;
      border: 1px solid #dddddd;
    }
    select {
      padding: 13px 15px;
      font-size: 16px;
      color: #999999;
      border-radius: 4px;
      border: 1px solid #dddddd;
    }
  }

  table {
    width: 100%;
    text-align: left;
    border: none;
    border-collapse: collapse;
    thead {
      color: #444;
      font-size: 16px;
      line-height: 19px;
      font-weight: bold;
    }
    tbody {
      tr {
        color: #666;
        font-size: 16px;
        text-align: left;
        td {
          padding-top: 20px;
        }
      }
      tr:not(:last-child) {
        border-bottom: 1px solid #ddd;
        td {
          padding-bottom: 20px;
        }
      }
    }
    button {
      background: none;
      border: none;
      font-size: 15px;
      line-height: 18px;

      & + button {
        margin-left: 20px;
      }

      &#editar {
        color: #4d85ee;
      }
      &#excluir {
        color: #de3b3b;
      }
    }
  }
`;

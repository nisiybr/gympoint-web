import styled, { keyframes, css } from 'styled-components';
import Modal from 'styled-react-modal';

export const StyledModal = Modal.styled`
  width: 450px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 30px;

  strong {
    font-size: 14px;
    line-height: 16px;
    color: #444444;
    font-weight: bold;
    margin-bottom: 8px;
  }
  p {
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    color: #666666;
    box-sizing: border-box;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;

    width: 100%;




    textarea {
      resize: none;
      border-radius: 4px;
      margin-bottom: 10px;
      border: 1px solid #DDDDDD;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin-bottom: 25px;
      }

  }
`;

const rotate = keyframes`
 from {
  transform: rotate(0deg);
 }
 to {
   transform: rotate(360deg);
 }
`;

export const ModalButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading, // pega a props por componetizacao
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

export const Content = styled.div`
  margin-top: 25px;
  width: 1200px;
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

  input {
    background: #ffffff;
    border: 1px solid #dddddd;
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 14px;
    padding: 10px 20px;
    width: 300px;
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
      th {
        text-align: center;
      }
      th:first-child {
        text-align: left;
      }
      th:last-child {
        text-align: right;
      }
    }
    tbody {
      tr {
        color: #666;
        font-size: 16px;
        text-align: left;
        td {
          padding-top: 20px;
        }
        td {
          text-align: center;
        }
        td:first-child {
          text-align: left;
        }
        td:last-child {
          text-align: right;
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

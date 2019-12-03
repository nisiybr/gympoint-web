import styled from 'styled-components';

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

import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  background: #ee4d64;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  padding: 50px 30px;
  height: 450px;
  width: 360px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
    }

    strong {
      color: #444;
      font-size: 14px;
      margin-bottom: 8px;
    }
    input {
      padding: 13px 15px;
      border-radius: 4px;
      border: 1px solid #dddddd;
      background: #ffffff;
      margin-bottom: 20px;
    }
    button {
      color: #fff;
      background: #ee4d64;
      border-radius: 4px;
      font-size: 16px;
      line-height: 19px;
      padding: 13px 0;
      border: none;

      &:hover {
        background: ${darken(0.08, '#ee4d64')};
      }
    }
  }
`;

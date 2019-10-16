import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  form {
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    input {
      background: ${darken(0.03, '#003366')};
      color: #fff;
      padding: 15px;
      border: 0;
      border-radius: 4px;
      margin-bottom: 10px;

      &:first-child {
        margin-top: 10px;
      }

      &::placeholder {
        color: #999;
      }
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    > span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      align-self: flex-end;
      display: flex;
      align-items: center;
      padding: 10px;
      background: #f94d6a;
      margin-top: 20px;

      span {
        font-size: 16px;
        font-weight: normal;
        margin-left: 10px;
      }
    }
  }
`;

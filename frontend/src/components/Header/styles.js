import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 92px;
  background: ${darken(0.03, '#003366')};
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 92px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
    }

    aside {
      display: flex;
      align-items: center;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 15px;

    strong {
      display: block;
      color: #eee;
    }

    a {
      display: block;
      margin-top: 2px;
      color: #999;
    }
  }

  button {
    background: #d44059;
    margin: 5px 0 0;
    width: 71px;
    height: 42px;

    &:hover {
      background: ${darken(0.03, '#d44059')};
    }
  }
`;

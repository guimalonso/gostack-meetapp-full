import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  header {
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 30px 0;

    h4 {
      font-size: 32px;
      color: #fff;
      font-weight: normal;
    }

    button {
      background: #f94d6a;
      display: flex;
      align-items: center;
      padding: 10px;

      span {
        font-size: 16px;
        font-weight: normal;
        margin-left: 10px;
      }
    }
  }
`;

export const Meetup = styled.li`
  height: 62px;
  background: ${darken(0.03, '#003366')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;

  strong {
    font-size: 18px;
    color: #fff;
    font-weight: normal;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #999;
    font-size: 16px;
  }
`;

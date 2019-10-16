import styled from 'styled-components';

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

    div {
      display: flex;

      button {
        display: flex;
        align-items: center;
        padding: 10px;
        margin-left: 10px;

        span {
          font-size: 16px;
          font-weight: normal;
          margin-left: 10px;
        }
      }
    }
  }

  article {
    text-align: justify;
    font-size: 18px;
    color: #fff;
    padding: 30px 0;
  }
`;

export const EditButton = styled.button`
  background: #4dbaf9;
`;

export const CancelButton = styled.button`
  background: #d44059;
`;

export const Image = styled.div`
  height: 320px;
  border-radius: 4px;
  background-size: cover;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    margin-right: 20px;

    span {
      margin-left: 10px;
      color: #999;
    }
  }
`;

import styled from 'styled-components/native';

import Button from '../Button';

export const Container = styled.View`
  margin-bottom: 15px;
  border-radius: 4px;
  background: #fff;
`;

export const Banner = styled.Image`
  align-self: stretch;
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Info = styled.View`
  padding: 20px;
`;

export const InfoLine = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const InfoTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

export const InfoText = styled.Text`
  color: #999;
  font-size: 13px;
  margin-top: 4px;
  margin-left: 5px;
`;

export const ApplyButton = styled(Button)`
  margin-top: 10px;
`;

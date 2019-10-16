import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.View`
  padding: 0 15px;
  height: 50px;
  background: ${darken(0.03, '#003366')};
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.8)',
})`
  flex: 1;
  font-size: 18px;
  margin-left: 10px;
  color: #fff;
`;

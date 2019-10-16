import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.View`
  align-items: center;
  background: ${darken(0.03, '#003366')};
  padding: 20px;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 23px;
  height: 24px;
`;

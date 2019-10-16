import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(
    to bottom,
    #003366 0%,
    ${lighten(0.05, '#003366')} 100%
  );
`;

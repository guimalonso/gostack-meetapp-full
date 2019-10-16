import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { lighten } from 'polished';

export default styled(LinearGradient).attrs({
  colors: ['#003366', lighten(0.03, '#003366')],
})`
  flex: 1;
`;

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Banner,
  Info,
  InfoTitle,
  InfoLine,
  InfoText,
  ApplyButton,
} from './styles';

export default function Meetup({ data, type, action }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  const buttonLabel =
    type === 'apply' ? 'Realizar inscrição' : 'Cancelar inscrição';

  return (
    <Container>
      <Banner
        source={{
          uri: data.banner
            ? data.banner.url
            : `https://api.adorable.io/avatar/50/${data.name}.png`,
        }}
      />

      <Info>
        <InfoTitle>{data.name}</InfoTitle>
        <InfoLine>
          <Icon name="today" size={14} color="#999" />
          <InfoText>{dateParsed}</InfoText>
        </InfoLine>
        <InfoLine>
          <Icon name="room" size={14} color="#999" />
          <InfoText>{data.location}</InfoText>
        </InfoLine>
        <InfoLine>
          <Icon name="person" size={14} color="#999" />
          <InfoText>Organizador: {data.promoter.name}</InfoText>
        </InfoLine>

        <ApplyButton onPress={action}>{buttonLabel}</ApplyButton>
      </Info>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    banner: PropTypes.shape({
      url: PropTypes.string,
    }),
    name: PropTypes.string,
    date: PropTypes.string,
    location: PropTypes.string,
    promoter: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  type: PropTypes.string.isRequired,
};

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, List } from './styles';

function Applications({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);
      const response = await api.get('applications');

      setMeetups(response.data);
      setLoading(false);
    }

    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused]);

  function handleCancel(id) {
    Alert.alert(
      'Confirmação',
      'Deseja mesmo cancelar sua inscrição neste evento?',
      [
        {
          text: 'Sim',
          onPress: async () => {
            try {
              await api.delete('applications', { params: { id } });

              setMeetups(meetups.filter(meetup => meetup.id !== id));
            } catch (err) {
              Alert.alert(
                'Falha',
                'Falha ao cancelar inscrição, tente novamente mais tarde.'
              );
            }
          },
        },
        {
          text: 'Não',
        },
      ]
    );
  }

  return (
    <Background>
      <Header />
      <Container>
        {loading ? (
          <ActivityIndicator color="#7159c1" />
        ) : (
          <>
            <List
              data={meetups}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Meetup
                  type="cancel"
                  action={() => handleCancel(item.id)}
                  data={item.meetup}
                />
              )}
            />
          </>
        )}
      </Container>
    </Background>
  );
}

Applications.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Applications);

import React, { useEffect, useState, useMemo } from 'react';
import { TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, DateSelector, SelectedDate, List } from './styles';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);
      const response = await api.get('meetups/available', {
        params: { date },
      });

      setMeetups(response.data);
      setLoading(false);
    }

    if (isFocused) {
      loadMeetups();
    }
  }, [date, isFocused]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  async function loadMore() {
    setLoadingMore(true);

    const nextPage = page + 1;
    const response = await api.get(`meetups/available`, {
      params: { page: nextPage, date },
    });

    if (response.data.length === 0) setCanLoadMore(false);

    setMeetups(meetups.concat(response.data));
    setPage(nextPage);
    setLoadingMore(false);
  }

  async function refreshList() {
    setPage(1);
    setLoading(true);
    setRefreshing(true);

    const response = await api.get('meetups/available', {
      params: { date },
    });

    setMeetups(response.data);
    setLoading(false);
    setRefreshing(false);
    setCanLoadMore(true);
  }

  async function handleApplication(meetup_id) {
    try {
      await api.post('applications', {
        meetup_id,
      });

      Alert.alert('Sucesso', 'Inscrição realizada com sucesso');
    } catch (err) {
      Alert.alert(
        'Falha',
        'Não foi possível efetuar sua inscrição, verifique o horário do evento e se já realizou inscrição no mesmo.'
      );
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateSelector>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
          <SelectedDate>{dateFormatted}</SelectedDate>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </DateSelector>
        {loading ? (
          <ActivityIndicator color="#7159c1" />
        ) : (
          <>
            <List
              data={meetups}
              keyExtractor={item => String(item.id)}
              onEndReachedThreshold={0.2}
              onEndReached={canLoadMore && loadMore}
              onRefresh={refreshList}
              refreshing={refreshing}
              renderItem={({ item }) => (
                <Meetup
                  type="apply"
                  action={() => handleApplication(item.id)}
                  data={item}
                />
              )}
            />
          </>
        )}
        {loadingMore ? <ActivityIndicator color="#7159c1" /> : <></>}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);

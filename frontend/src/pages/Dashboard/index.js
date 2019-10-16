import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';

import { Container, Meetup } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      const data = response.data.map(meetup => {
        const parsedDate = parseISO(meetup.date);

        return {
          time: format(parsedDate, "d 'de' MMMM', às' HH'h'", {
            locale: pt,
          }),
          ...meetup,
        };
      });

      setMeetups(data);
    }

    loadMeetups();
  }, []);

  return (
    <Container>
      <header>
        <h4>Meus meetups</h4>
        <Link to="/form">
          <button type="button">
            <MdAddCircleOutline size={20} color="#fff" />
            <span>Novo meetup</span>
          </button>
        </Link>
      </header>

      <ul>
        {meetups.map(meetup => (
          <Meetup key={meetup.id}>
            <strong>{meetup.name}</strong>
            <span>
              {meetup.time}
              <Link to={`/details/${meetup.id}`}>
                <MdChevronRight size={24} color="#fff" />
              </Link>
            </span>
          </Meetup>
        ))}
      </ul>
    </Container>
  );
}

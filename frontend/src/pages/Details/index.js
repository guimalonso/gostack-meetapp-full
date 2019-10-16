import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdEdit, MdDelete, MdToday, MdRoom } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';

import { Container, EditButton, CancelButton, Image, Info } from './styles';

const Details = ({ match }) => {
  const { id } = match.params;
  const [meetup, setMeetup] = useState({});

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`meetups/${id}`);
      const meetupInfo = response.data;
      const parsedDate = parseISO(meetupInfo.date);
      const data = {
        ...meetupInfo,
        time: format(parsedDate, "d 'de' MMMM', às' HH'h'", {
          locale: pt,
        }),
      };

      setMeetup(data);
    }

    loadMeetup();
  }, [id]);

  async function handleDelete() {
    await api.delete(`meetups/${id}`);

    history.push('/dashboard');
  }

  return (
    <Container>
      <header>
        <h4>{meetup.name}</h4>
        <div>
          <Link to={`/form/${meetup.id}`}>
            <EditButton>
              <MdEdit size={20} color="#fff" />
              <span>Editar</span>
            </EditButton>
          </Link>
          <CancelButton onClick={handleDelete}>
            <MdDelete size={20} color="#fff" />
            <span>Cancelar</span>
          </CancelButton>
        </div>
      </header>

      <Image
        style={{
          backgroundImage: meetup.banner ? `url(${meetup.banner.url})` : '',
        }}
        alt={meetup.name}
      />

      <article>{meetup.description}</article>

      <Info>
        <div>
          <MdToday size={20} color="#fff" />
          <span>{meetup.time}</span>
        </div>
        <div>
          <MdRoom size={20} color="#fff" />
          <span>{meetup.location}</span>
        </div>
      </Info>
    </Container>
  );
};

export default Details;

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

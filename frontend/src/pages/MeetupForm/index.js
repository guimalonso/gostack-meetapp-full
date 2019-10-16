import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { parseISO } from 'date-fns';
import * as Yup from 'yup';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import 'react-datepicker/dist/react-datepicker.css';

import BannerInput from './BannerInput';
import DatePicker from './DatePicker';

import { Container } from './styles';

const schema = Yup.object().shape({
  banner_id: Yup.number()
    .transform(value => (!value ? undefined : value))
    .required('O banner é obrigatório'),
  name: Yup.string().required('O título é obrigatório'),
  description: Yup.string(),
  date: Yup.date().required('A data é obrigatória'),
  location: Yup.string().required('A localização é obrigatória'),
});

export default function MeetupForm({ match }) {
  const { id } = match.params;
  const [meetup, setMeetup] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMeetup() {
      setLoading(true);
      const response = await api.get(`meetups/${id}`);
      const meetupInfo = response.data;
      const parsedDate = parseISO(meetupInfo.date);
      const data = {
        ...meetupInfo,
        date: parsedDate,
      };

      setMeetup(data);
      setLoading(false);
    }

    if (id) loadMeetup();
  }, [id]);

  async function handleSubmit(form) {
    try {
      if (id) await api.put(`meetups/${id}`, form);
      else await api.post('meetups', form);

      history.push('/dashboard');
    } catch (err) {
      toast.error('Erro ao executar ação, favor verificar seus dados!');
    }
  }

  return (
    <Container>
      {id && loading ? (
        <h1>Carregando...</h1>
      ) : (
        <Form initialData={meetup} schema={schema} onSubmit={handleSubmit}>
          <BannerInput name="banner_id" />
          <Input type="text" name="name" placeholder="Título do Meetup" />
          <Input
            multiline
            name="description"
            placeholder="Descrição completa"
            rows="5"
            defaultValue={meetup.description}
          />
          <DatePicker name="date" />
          <Input type="text" name="location" placeholder="Localização" />

          <button type="submit">
            <MdAddCircleOutline size={20} color="#fff" />
            <span>Salvar meetup</span>
          </button>
        </Form>
      )}
    </Container>
  );
}

MeetupForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

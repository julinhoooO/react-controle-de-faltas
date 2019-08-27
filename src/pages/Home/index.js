import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Title,
  EmptyTextContainer,
  EmptyText,
  List,
  FloatingButtonOpenModal,
} from './styles';

import {
  EventContainer,
  EventName,
  EventRowContainer,
  EventButtonsContainer,
  EventAddMissButton,
  EventColumnContainer,
  EventTinyName,
  EventDay,
  EventMonth,
} from '../Events/styles';

import getRealm from '../../services/realm';
import {getStringDate, formatDateBR} from '../../functions';

export default function Home({navigation}) {
  if (navigation.state.params) {
    navigation.navigate(navigation.state.params.page);
  }
  const [events, setEvents] = useState([]);

  const monthsString = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  const weeksString = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  async function getEvents() {
    const realm = await getRealm();
    const data = realm
      .objects('Event')
      .sorted('date')
      .filtered(
        `date >= ${new Date()
          .toISOString()
          .slice(0, -5)} AND date <= ${new Date(
          new Date().setDate(new Date().getDate() + 7),
        )
          .toISOString()
          .slice(0, -5)}`,
      )
      .slice(0, 11);
    if (data.length) setEvents(data);
  }

  async function deleteEvent(id) {
    //(data.id);
    const realm = await getRealm();
    const eventData = realm
      .objects('Event')
      .sorted('name')
      .filtered(`id == ${id}`);
    realm.write(() => {
      realm.delete(eventData[0]);
    });
    getEvents();
  }

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <Container>
      <Title>Próximos eventos</Title>
      {events.length ? (
        <List
          keyboardShouldPersistTaps="handled"
          data={events}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <EventContainer>
              <EventRowContainer>
                <EventColumnContainer>
                  <EventMonth>
                    {weeksString[new Date(item.date).getDay()]}
                  </EventMonth>
                  <EventDay>{new Date(item.date).getDate()}</EventDay>
                  <EventMonth>
                    {monthsString[new Date(item.date).getMonth()]}
                  </EventMonth>
                </EventColumnContainer>
                <EventColumnContainer flex={9}>
                  <EventName>{item.name}</EventName>
                  <EventTinyName>{item.disciplina}</EventTinyName>
                </EventColumnContainer>
              </EventRowContainer>
            </EventContainer>
          )}
        />
      ) : (
        <EmptyTextContainer>
          <EmptyText>
            Que bom, parece que você não tem nenhum evento nos próximo 7 dias!
            =)
          </EmptyText>
        </EmptyTextContainer>
      )}
    </Container>
  );
}

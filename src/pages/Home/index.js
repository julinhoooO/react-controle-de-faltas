import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EventContext from '../../services/EventContext';

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

export default function Home({navigation}) {
  if (navigation.state.params) {
    navigation.navigate(navigation.state.params.page);
  }

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

  return (
    <Container>
      <Title>Próximos eventos</Title>
      <EventContext.Consumer>
        {({nextEvents}) => {
          console.log(nextEvents);
          return nextEvents.length ? (
            <List
              keyboardShouldPersistTaps="handled"
              data={nextEvents}
              keyExtractor={item => String(item.id)}
              renderItem={({item}) => {
                return (
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
                );
              }}
            />
          ) : (
            <EmptyTextContainer>
              <EmptyText>
                Que bom, parece que você não tem nenhum evento nos próximo 7
                dias! =)
              </EmptyText>
            </EmptyTextContainer>
          );
        }}
      </EventContext.Consumer>
    </Container>
  );
}

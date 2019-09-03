import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EventContext from '../../services/EventContext';

import {Container, Title, EmptyTextContainer, EmptyText, List} from './styles';

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
        {({nextEvents}) => (
          <List
            keyboardShouldPersistTaps="handled"
            data={nextEvents}
            keyExtractor={item => String(item.id)}
            ListEmptyComponent={
              <EmptyTextContainer>
                <EmptyText>
                  Que bom, parece que você não tem nenhum evento nos próximo 7
                  dias! =)
                </EmptyText>
              </EmptyTextContainer>
            }
            renderItem={({item}) => {
              const date = new Date(item.date);
              const day = date.getDate();
              const weekDay = date.getDay();
              const month = date.getMonth();
              return (
                <EventContainer key={item.id}>
                  <EventRowContainer>
                    <EventColumnContainer>
                      <EventMonth>{weeksString[weekDay]}</EventMonth>
                      <EventDay>{day > 9 ? day : '0' + day}</EventDay>
                      <EventMonth>{monthsString[month]}</EventMonth>
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
        )}
      </EventContext.Consumer>
    </Container>
  );
}

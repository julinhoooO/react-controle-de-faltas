import React, {useState, useEffect} from 'react';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Title,
  EmptyTextContainer,
  EmptyText,
  List,
  FloatingButtonOpenModal,
  FloatingButtonOpenModalText,
  EventContainer,
  EventName,
  EventRowContainer,
  EventButtonsContainer,
  EventAddMissButton,
  EventColumnContainer,
  EventTinyName,
  EventDay,
  EventMonth,
} from './styles';

import getRealm from '../../services/realm';
import {getStringDate, formatDateBR} from '../../functions';

export default function Home({navigation}) {
  const [allEvents, setAllEvents] = useState([]);

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
      .filtered(`date >= ${new Date().toISOString().slice(0, -5)}`);

    if (data.length !== allEvents.length) {
      setAllEvents(data);
    }
  }

  async function deleteEvent(id) {
    const realm = await getRealm();
    const eventData = realm
      .objects('Event')
      .sorted('name')
      .filtered(`id == ${id}`);
    realm.write(() => {
      realm.delete(eventData[0]);
    });
    navigation.reset(
      [
        NavigationActions.navigate({
          routeName: 'Events',
        }),
      ],
      0,
    );
  }

  useEffect(() => {
    console.log(`useEffect ativado`);
    getEvents();
  }, [allEvents]);
  return (
    <>
      <Container>
        <Title>Eventos</Title>

        {allEvents.length ? (
          <List
            keyboardShouldPersistTaps="handled"
            data={allEvents}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => (
              //--------------
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
                  <EventColumnContainer flex={8}>
                    <EventName>{item.name}</EventName>
                    <EventTinyName>{item.disciplina}</EventTinyName>
                  </EventColumnContainer>
                  <EventButtonsContainer>
                    <EventAddMissButton onPress={() => deleteEvent(item.id)}>
                      <Icon name={'delete'} size={24} color="#fff" />
                    </EventAddMissButton>
                  </EventButtonsContainer>
                </EventRowContainer>
              </EventContainer>
            )}
          />
        ) : (
          <EmptyTextContainer>
            <EmptyText>
              Nada por aqui, comece adicionando um novo evento!
            </EmptyText>
          </EmptyTextContainer>
        )}
      </Container>
      <FloatingButtonOpenModal
        onPress={() => {
          navigation.navigate('FormEvents');
        }}>
        <FloatingButtonOpenModalText>
          <Icon name={'calendar-plus'} size={24} />
        </FloatingButtonOpenModalText>
      </FloatingButtonOpenModal>
    </>
  );
}

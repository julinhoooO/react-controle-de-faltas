import React, {useState, useEffect} from 'react';
import {Searchbar, Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import {NavigationActions, StackActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import EventContext from '../../services/EventContext';

import {
  Container,
  SearchbarContainer,
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

import {TouchableRipple} from 'react-native-paper';

import getRealm from '../../services/realm';
import {getStringDate, formatDateBR} from '../../functions';

export default function Events({navigation}) {
  const [search, setSearch] = useState('');
  const [idDeleteEvent, setIdDeleteEvent] = useState();
  const [visible, setVisible] = useState(false);
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

  async function deleteEvent(id) {
    const realm = await getRealm();
    const eventData = realm.objects('Event').filtered(`id == ${id}`);
    realm.write(() => {
      realm.delete(eventData[0]);
    });
  }
  return (
    <>
      <Container>
        <EventContext.Consumer>
          {({allEvents, getEvents}) => (
            <>
              <Portal>
                <Dialog
                  visible={visible}
                  onDismiss={() => {
                    setVisible(false);
                  }}>
                  <Dialog.Title>Excluir</Dialog.Title>
                  <Dialog.Content>
                    <Paragraph>Tem certeza que deseja excluir?</Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button
                      onPress={() => {
                        setVisible(false);
                      }}>
                      Cancelar
                    </Button>
                    <Button
                      onPress={() => {
                        deleteEvent(idDeleteEvent);
                        getEvents();
                        setVisible(false);
                      }}>
                      Excluir
                    </Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
              <SearchbarContainer>
                <Searchbar
                  placeholder="Pesquisar eventos"
                  onChangeText={value => {
                    setSearch(value);
                    if (value !== '' || value !== false) {
                      getEvents(value);
                    }
                  }}
                  value={search}
                />
              </SearchbarContainer>
              <List
                keyboardShouldPersistTaps="handled"
                data={allEvents}
                extraData={allEvents}
                keyExtractor={item => String(item.id)}
                getItemLayout={(data, index) => ({
                  length: 120,
                  offset: 120 * index,
                  index,
                })}
                ListEmptyComponent={
                  <EmptyTextContainer>
                    <EmptyText>
                      Nada por aqui, comece adicionando um novo evento!
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
                        <EventColumnContainer flex={8}>
                          <EventName>{item.name}</EventName>
                          <EventTinyName>{item.disciplina}</EventTinyName>
                        </EventColumnContainer>
                        <EventButtonsContainer>
                          <EventAddMissButton
                            onPress={() => {
                              setIdDeleteEvent(item.id);
                              setVisible(true);
                            }}>
                            <Icon name={'delete'} size={24} color="#fff" />
                          </EventAddMissButton>
                        </EventButtonsContainer>
                      </EventRowContainer>
                    </EventContainer>
                  );
                }}
              />
            </>
          )}
        </EventContext.Consumer>
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

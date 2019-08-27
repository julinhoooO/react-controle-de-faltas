import React, {useState, useEffect} from 'react';
import {DatePickerAndroid, Keyboard} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextField} from 'react-native-material-textfield';
import {Dropdown} from 'react-native-material-dropdown';

import getRealm from '../../services/realm';
import EventContext from '../../services/EventContext';

import {getStringDate, formatDateBR} from '../../functions';

import {
  Container,
  Title,
  Form,
  EmptyContainer,
  SubmitButton,
  SubmitButtonText,
} from './styles';

export default function FormEvents({navigation}) {
  const [disciplinaList, setDisciplinaList] = useState([]);
  const [disciplina, setDisciplina] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorDisciplina, setErrorDisciplina] = useState('');
  const [errorDate, setErrorDate] = useState('');

  useEffect(() => {
    async function getDisciplinaData() {
      const realm = await getRealm();
      const disciplinaRealm = realm.objects('Disciplina').sorted('name');
      disciplinaRealm.forEach(element => {
        const data = {value: element.name};
        disciplinaList.push(data);
      });
      setDisciplinaList(disciplinaList);
    }
    getDisciplinaData();
  }, []);

  async function handleSaveButton() {
    if (disciplina === false || disciplina === null || disciplina === '') {
      setErrorDisciplina('Não pode ser vazio');
    }

    if (name === false || name === null || name === '') {
      setErrorName('Não pode ser vazio');
    }

    if (date === false || date === null || date === '') {
      setErrorDate('Data inválida');
    }

    if (!errorDisciplina && !errorName && !errorDate) {
      return await saveEvent();
    }
  }

  async function getEvents() {
    const realm = await getRealm();
    const dataAll = realm
      .objects('Event')
      .sorted('date')
      .filtered(`date >= ${new Date().toISOString().slice(0, -5)}`);

    const dataNext = realm
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
      );
    return {dataNext, dataAll};
  }

  async function saveEvent() {
    const realm = await getRealm();
    //Search for all data and sort by id DESC
    const eventRealm = realm.objects('Event').sorted('id', true);
    //Get the maximum id to simulate a Auto_Increment
    const lastIdInserted = eventRealm.length ? eventRealm.slice(0, 1)[0].id : 0;
    const data = {
      id: lastIdInserted ? parseInt(lastIdInserted + 1) : 1,
      disciplina,
      name,
      date,
    };

    realm.write(() => {
      realm.create('Event', data, 'modified');
    });

    return await Promise.resolve(getEvents());
  }

  async function toggleDatePicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        setDate(new Date(year, month, day));
        setDateText(formatDateBR(getStringDate(new Date(year, month, day))));
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
  return (
    <Container>
      <Title>Adicionar Evento</Title>
      <Form>
        <Dropdown
          label={'Disciplina'}
          data={disciplinaList}
          value={disciplina}
          onChangeText={setDisciplina}
          tintColor={'#7159c1'}
          baseColor={'#7159c1'}
        />
        <TextField
          value={name}
          label={'Nome'}
          error={errorName}
          tintColor={'#7159c1'}
          baseColor={'#7159c1'}
          onChangeText={setName}
          title={'Digite o nome do evento'}
        />
        <TextField
          value={dateText}
          label={'Data'}
          error={errorDate}
          tintColor={'#7159c1'}
          baseColor={'#7159c1'}
          title={'Selecione a data do evento'}
          onFocus={() => {
            Keyboard.dismiss();
            toggleDatePicker();
          }}
        />
        <EventContext.Consumer>
          {({setAllEvents, setNextEvents}) => {
            return (
              <SubmitButton
                onPress={async () => {
                  const ret = await handleSaveButton();
                  setAllEvents(ret.dataAll);
                  setNextEvents(ret.dataNext);
                  navigation.goBack();
                }}>
                <Icon name={'content-save'} size={24} color={'#fff'} />
                <SubmitButtonText>Salvar</SubmitButtonText>
                <EmptyContainer />
              </SubmitButton>
            );
          }}
        </EventContext.Consumer>
      </Form>
      <Form />
    </Container>
  );
}

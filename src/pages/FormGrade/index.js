import React, {useState, useEffect} from 'react';
import {DatePickerAndroid, Keyboard} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextField} from 'react-native-material-textfield';

import getRealm from '../../services/realm';

import {getStringDate, formatDateBR} from '../../functions';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Shine,
} from 'rn-placeholder';

import {
  Container,
  Title,
  Form,
  Input,
  EmptyContainer,
  SubmitButton,
  SubmitButtonText,
  ViewDateText,
  TextViewDate,
} from './styles';

export default function FormGrade({navigation}) {
  const {params} = navigation.state;
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [gradeState, setGradeState] = useState([]);
  const [maximumGrade, setMaximumGrade] = useState('');
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorGrade, setErrorGrade] = useState('');
  const [errorMaximumGrade, setErrorMaximumGrade] = useState('');
  const [errorDate, setErrorDate] = useState('');
  const [update, setUpdate] = useState(params.update);
  const [titleName, setTitleName] = useState('');
  const [placeholderDate, setPlaceholderDate] = useState(true);

  useEffect(() => {
    if (update) {
      async function getGradeData() {
        const realm = await getRealm();
        const gradeData = realm
          .objects('Grade')
          .sorted('name')
          .filtered(`id == ${params.grade_id}`);
        setGradeState(gradeData[0]);
        setName(gradeData[0].name);
        setGrade(gradeData[0].grade.toString());
        setMaximumGrade(gradeData[0].maximum_grade.toString());
        setDate(gradeData[0].date);
        setDateText(formatDateBR(getStringDate(new Date(gradeData[0].date))));
        setPlaceholderDate(false);
        setTitleName(gradeData[0].name);
        setUpdate(false);
      }
      getGradeData();
    }
  }, []);

  function handleSaveButton() {
    if (name === false || name === null || name === '') {
      setErrorName('Não pode ser vazio');
    }

    if (grade === false || grade === null || grade === '') {
      setErrorGrade('Não pode ser vazio');
    }

    if (
      maximumGrade === false ||
      maximumGrade === null ||
      maximumGrade === ''
    ) {
      setErrorMaximumGrade('Não pode ser vazio');
    }

    if (date === false || date === null || date === '') {
      setErrorDate('Data inválida');
    }

    if (!errorName && !errorGrade && !errorMaximumGrade && !errorDate) {
      saveGrade(params.update);
    }
  }

  async function saveGrade(update = false) {
    const realm = await getRealm();
    //Search for all data and sort by id DESC
    const gradeRealm = realm.objects('Grade').sorted('id', true);
    //Get the maximum id to simulate a Auto_Increment
    const lastIdInserted = gradeRealm.length ? gradeRealm.slice(0, 1)[0].id : 0;
    const data = {
      id: lastIdInserted ? parseInt(lastIdInserted + 1) : 1,
      id_disciplina: params.data.id,
      name: name,
      grade: parseInt(grade),
      maximum_grade: parseInt(maximumGrade),
      date,
    };
    if (update) {
      data.id = params.grade_id;
    }

    realm.write(() => {
      realm.create('Grade', data, 'modified');
    });

    const navigateToAulas = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({
          routeName: 'Disciplinas',
        }),
        NavigationActions.navigate({
          routeName: 'Details',
          params: {data: params.data},
        }),
      ],
    });
    navigation.dispatch(navigateToAulas);
  }
  async function toggleDatePicker() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date(date),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        setDate(new Date(year, month, day));
        setDateText(formatDateBR(getStringDate(new Date(year, month, day))));
        setPlaceholderDate(false);
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
  return (
    <Container>
      {params.update === true && gradeState.length === 0 ? (
        <Placeholder Animation={Shine}>
          <PlaceholderLine
            height={48}
            width={50}
            style={{borderRadius: 4, marginLeft: 20}}
          />
        </Placeholder>
      ) : (
        <Title>
          {params.update
            ? `Editar ${titleName}`
            : 'Adicionar Novo Trabalho/Prova'}
        </Title>
      )}
      <Form>
        {params.update === true && gradeState.length === 0 ? (
          <Placeholder Animation={Shine}>
            <PlaceholderLine
              height={52}
              noMargin={true}
              style={{borderRadius: 4, marginBottom: 10}}
            />
            <PlaceholderLine
              height={52}
              noMargin={true}
              style={{borderRadius: 4, marginBottom: 10}}
            />
            <PlaceholderLine
              height={52}
              noMargin={true}
              style={{borderRadius: 4, marginBottom: 10}}
            />
            <PlaceholderLine
              height={52}
              noMargin={true}
              style={{borderRadius: 4, marginBottom: 10}}
            />
          </Placeholder>
        ) : (
          <>
            <TextField
              value={name}
              label={'Nome'}
              error={errorName}
              tintColor={'#7159c1'}
              baseColor={'#7159c1'}
              onChangeText={setName}
              title={'Digite o nome do trabalho/prova'}
              autoCompleteType={'off'}
              autoFocus={true}
            />
            <TextField
              value={grade}
              label={'Nota'}
              error={errorGrade}
              tintColor={'#7159c1'}
              baseColor={'#7159c1'}
              onChangeText={setGrade}
              title={'Digite a nota do trabalho/prova'}
              keyboardType={'numeric'}
              autoCompleteType={'off'}
            />
            <TextField
              value={maximumGrade}
              label={'Nota máxima'}
              error={errorMaximumGrade}
              tintColor={'#7159c1'}
              baseColor={'#7159c1'}
              onChangeText={setMaximumGrade}
              title={'Digite a nota máxima para esse trabalho/prova'}
              keyboardType={'numeric'}
              autoCompleteType={'off'}
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
              autoCompleteType={'off'}
            />
            <SubmitButton onPress={handleSaveButton}>
              <Icon name={'content-save'} size={24} color={'#fff'} />
              <SubmitButtonText>Salvar</SubmitButtonText>
              <EmptyContainer />
            </SubmitButton>
          </>
        )}
      </Form>
      <Form />
    </Container>
  );
}

import React, {useState, useEffect} from 'react';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextField} from 'react-native-material-textfield';

import getRealm from '../../services/realm';

import {
  Container,
  Title,
  Form,
  Input,
  EmptyContainer,
  SubmitButton,
  SubmitButtonText,
} from './styles';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Shine,
} from 'rn-placeholder';

export default function FormDisciplina({navigation}) {
  const {params} = navigation.state;
  const [name, setName] = useState('');
  const [miss, setMiss] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorMiss, setErrorMiss] = useState('');
  const [update, setUpdate] = useState(params.update);
  const [titleName, setTitleName] = useState('');
  useEffect(() => {
    if (update) {
      async function getDisciplinaData() {
        const realm = await getRealm();
        const disciplinaData = realm
          .objects('Disciplina')
          .sorted('name')
          .filtered(`id == ${params.id}`);
        setMiss(disciplinaData[0].maximum_miss.toString());
        setName(disciplinaData[0].name);
        setTitleName(disciplinaData[0].name);
        setUpdate(false);
      }
      getDisciplinaData();
    }
  }, [name, miss]);

  function handleSaveButton() {
    if (name === false || name === null || name === '') {
      setErrorName('Não pode ser vazio');
    }

    if (miss === false || miss === null || miss === '') {
      setErrorMiss('Não pode ser vazio');
    }

    if (!errorMiss && !errorName) {
      saveDisciplina(params.update);
    }
  }

  async function saveDisciplina(update = false) {
    const realm = await getRealm();
    //Search for all data and sort by id DESC
    const disciplinaRealm = realm.objects('Disciplina').sorted('id', true);
    //Get the maximum id to simulate a Auto_Increment
    const lastIdInserted = disciplinaRealm.length
      ? disciplinaRealm.slice(0, 1)[0].id
      : 0;
    const data = {
      id: lastIdInserted ? parseInt(lastIdInserted + 1) : 1,
      name: name,
      maximum_miss: parseInt(miss),
      miss_quantity: 0,
    };
    if (update) {
      data.id = params.id;
    }

    realm.write(() => {
      realm.create('Disciplina', data, 'modified');
    });

    navigation.reset(
      [
        NavigationActions.navigate({
          routeName: 'Disciplinas',
        }),
      ],
      0,
    );
  }
  return (
    <Container>
      {params.update && !name ? (
        <Placeholder Animation={Shine}>
          <PlaceholderLine
            height={48}
            width={50}
            style={{borderRadius: 4, marginLeft: 20}}
          />
        </Placeholder>
      ) : (
        <Title>
          {params.update ? `Editar ${titleName}` : 'Adicionar Disciplina'}
        </Title>
      )}
      <Form>
        {params.update && !name ? (
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
          </Placeholder>
        ) : (
          <>
            <TextField
              value={name}
              label={'Disciplina'}
              error={errorName}
              tintColor={'#7159c1'}
              baseColor={'#7159c1'}
              onChangeText={setName}
              title={'Digite o nome da disciplina'}
            />
            <TextField
              value={miss}
              label={'Faltas'}
              error={errorMiss}
              tintColor={'#7159c1'}
              baseColor={'#7159c1'}
              onChangeText={setMiss}
              title={'Digite a quantidade máxima de faltas'}
              keyboardType={'numeric'}
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

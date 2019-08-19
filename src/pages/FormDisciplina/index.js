import React, {useState} from 'react';

import getRealm from '../../services/realm';

import {
  Container,
  Title,
  Form,
  Input,
  ButtonsContainer,
  SubmitButton,
  SubmitButtonText,
} from './styles';

export default function FormDisciplina({navigation}) {
  const [name, setName] = useState('');
  const [miss, setMiss] = useState('');
  async function saveDisciplina() {
    const realm = await getRealm();
    //Search for all data and sort by id DESC
    const disciplinaRealm = realm.objects('Disciplina').sorted('id', true);
    //Get the maximum id to simulate a Auto_Increment
    const lastIdInserted = disciplinaRealm.slice(0, 1)[0].id;
    const data = {
      id: lastIdInserted ? parseInt(lastIdInserted + 1) : 1,
      name: name,
      maximum_miss: miss,
      miss_quantity: '0',
    };

    realm.write(() => {
      realm.create('Disciplina', data);
    });
    navigation.navigate('Home');
  }
  return (
    <Container>
      <Title>Adicionar Disciplina</Title>
      <Form>
        <Input
          autoFocus={true}
          autoCorrect={false}
          autoCompleteType="off"
          onChangeText={setName}
          placeholder="Digite o nome da disciplina"
        />
        <Input
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          onChangeText={setMiss}
          keyboardType="number-pad"
          placeholder="Digite a quantidade de faltas"
        />
      </Form>
      <ButtonsContainer>
        <SubmitButton onPress={saveDisciplina}>
          <SubmitButtonText>Salvar</SubmitButtonText>
        </SubmitButton>
      </ButtonsContainer>
    </Container>
  );
}

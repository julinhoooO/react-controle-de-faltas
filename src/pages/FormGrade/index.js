import React, {useState} from 'react';

import {
  Container,
  Title,
  Form,
  Input,
  ButtonsContainer,
  SubmitButton,
  SubmitButtonText,
} from './styles';

export default function FormGrade({navigation}) {
  const {params} = navigation.state;
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [maximumGrade, setMaximumGrade] = useState('');
  const [date, setDate] = useState('');
  return (
    <Container>
      <Title>Adicionar Novo Trabalho/Prova</Title>
      <Form>
        <Input
          value={name}
          onChangeText={setName}
          autoCorrect={false}
          autoCompleteType="off"
          placeholder="Digite o nome do Trabalho/Prova"
        />
        <Input
          value={grade}
          onChangeText={setGrade}
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          keyboardType="number-pad"
          placeholder="Digite sua nota"
        />
        <Input
          value={maximumGrade}
          onChangeText={setMaximumGrade}
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          keyboardType="number-pad"
          placeholder="Digite o peso do Trabalho/Prova"
        />
        <Input
          value={date}
          onChangeText={text => {
            setDate(text.replace(/(\d\d)(\d\d)(\d\d\d\d)/, '$1/$2/$3'));
          }}
          autoCapitalize="none"
          autoCompleteType="off"
          autoCorrect={false}
          keyboardType="number-pad"
          placeholder="Digite a Data do Trabalho/Prova"
          maxLength={10}
        />
      </Form>
      <ButtonsContainer>
        <SubmitButton onPress={() => {}}>
          <SubmitButtonText>Salvar</SubmitButtonText>
        </SubmitButton>
      </ButtonsContainer>
    </Container>
  );
}

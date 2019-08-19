import React, {useState, useEffect} from 'react';

import {
  Container,
  Title,
  EmptyText,
  List,
  FloatingButtonOpenModal,
  FloatingButtonOpenModalText,
} from './styles';

import Disciplinas from '../../components/Disciplinas';
import getRealm from '../../services/realm';

export default function Home({navigation}) {
  const [disciplinas, setdisciplinas] = useState([]);
  useEffect(() => {
    async function getDisciplinas() {
      const realm = await getRealm();
      const data = realm.objects('Disciplina').sorted('name');
      if (data.length) setdisciplinas(data);
    }
    getDisciplinas();
  }, []);
  return (
    <>
      <Container>
        <Title>Disciplinas</Title>

        {disciplinas.length ? (
          <List
            keyboardShouldPersistTaps="handled"
            data={disciplinas}
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => <Disciplinas data={item} />}
          />
        ) : (
          <EmptyText>
            Nada por aqui, comece adicionando uma disciplina nova!
          </EmptyText>
        )}
      </Container>
      <FloatingButtonOpenModal
        onPress={() => {
          navigation.navigate('FormDisciplina');
        }}>
        <FloatingButtonOpenModalText>+</FloatingButtonOpenModalText>
      </FloatingButtonOpenModal>
    </>
  );
}

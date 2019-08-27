import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Title,
  EmptyTextContainer,
  EmptyText,
  List,
  FloatingButtonOpenModal,
  FloatingButtonOpenModalText,
} from './styles';

import DisciplinasComponent from '../../components/Disciplinas';
import getRealm from '../../services/realm';

export default function Disciplinas({navigation}) {
  const [disciplinas, setDisciplinas] = useState([]);
  useEffect(() => {
    async function getDisciplinas() {
      const realm = await getRealm();
      const data = realm.objects('Disciplina').sorted('name');
      if (data.length) setDisciplinas(data);
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
            renderItem={({item}) => <DisciplinasComponent data={item} />}
          />
        ) : (
          <EmptyTextContainer>
            <EmptyText>
              Nada por aqui, comece adicionando uma nova disciplina!
            </EmptyText>
          </EmptyTextContainer>
        )}
      </Container>
      <FloatingButtonOpenModal
        onPress={() => {
          navigation.navigate('FormDisciplina', {update: false});
        }}>
        <FloatingButtonOpenModalText>
          <Icon name={'book-plus'} size={24} />
        </FloatingButtonOpenModalText>
      </FloatingButtonOpenModal>
    </>
  );
}

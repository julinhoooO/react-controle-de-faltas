import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Searchbar, ActivityIndicator, Snackbar} from 'react-native-paper';

import {
  Container,
  SearchbarContainer,
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
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [visibleSnackbarDelete, setVisibleSnackbarDelete] = useState(false);
  const [actived, setActived] = useState(false);

  console.log(navigation);

  async function getDisciplinas(s = search) {
    setLoading(true);
    const realm = await getRealm();
    const data = realm.objects('Disciplina').sorted('name');
    let ret = data;
    if (s !== '' || s !== false || s !== undefined) {
      ret = data.filtered(`name CONTAINS[c] "${s}"`);
    }
    setDisciplinas(ret);
    setLoading(false);
  }

  useEffect(() => {
    if (navigation.state.hasOwnProperty('params')) {
      if (navigation.state.params) {
        if (navigation.state.params.hasOwnProperty('delete')) {
          if (!actived) {
            setVisibleSnackbarDelete(navigation.state.params.delete);
            setActived(true);
          }
        }
      }
    }
    getDisciplinas();
  }, [search]);
  return (
    <>
      <Snackbar
        visible={visibleSnackbarDelete}
        onDismiss={() => {
          setTimeout(() => {
            setVisibleSnackbarDelete(false);
          }, 6000);
        }}
        duration={6000}>
        {`Disciplina excluída`}
      </Snackbar>
      <Container>
        <SearchbarContainer>
          <Searchbar
            placeholder="Pesquisar disciplinas"
            onChangeText={value => {
              setSearch(value);
              getDisciplinas();
            }}
            value={search}
          />
        </SearchbarContainer>
        <List
          keyboardShouldPersistTaps="handled"
          data={disciplinas}
          removeClippedSubviews={true}
          keyExtractor={item => String(item.id)}
          onRefresh={() => getDisciplinas()}
          refreshing={loading}
          renderItem={({item}) => <DisciplinasComponent data={item} />}
          ListEmptyComponent={
            <EmptyTextContainer>
              <EmptyText>
                Nada por aqui, comece adicionando uma nova disciplina!
              </EmptyText>
            </EmptyTextContainer>
          }
          ListHeaderComponent={
            loading && (
              <ActivityIndicator
                size="large"
                color="#7159c1"
                style={{
                  height: 100,
                  padding: 20,
                }}
              />
            )
          }
        />
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

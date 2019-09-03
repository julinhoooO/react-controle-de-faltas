import React, {useState} from 'react';
import {
  withNavigation,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import {Vibration} from 'react-native';
import {
  TouchableRipple,
  Modal,
  Portal,
  List,
  Dialog,
  Paragraph,
  Button,
  Snackbar,
  Divider,
} from 'react-native-paper';

import getRealm from '../../services/realm';

import {Container, Name, RowContainer} from './styles';

function DisciplinasComponent({data, navigation}) {
  const [visibleDisciplinaDialog, setVisibleDisciplinaDialog] = useState(false);
  const [visibleConfirmation, setVisibleConfirmation] = useState(false);

  async function deleteDisciplina() {
    setVisibleDisciplinaDialog(false);
    setVisibleConfirmation(false);
    const realm = await getRealm();
    const disciplinaData = realm
      .objects('Disciplina')
      .filtered(`id == ${data.id}`);
    realm.write(() => {
      realm.delete(disciplinaData[0]);
    });
    const navigateToAulas = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'Disciplinas',
          params: {
            delete: true,
          },
        }),
      ],
    });
    navigation.dispatch(navigateToAulas);
  }

  return (
    <>
      <Portal>
        <Modal
          visible={visibleDisciplinaDialog}
          onDismiss={() => {
            setVisibleDisciplinaDialog(false);
          }}>
          <List.Section
            title={data.name}
            titleStyle={{
              fontWeight: 'bold',
              color: '#000',
              fontSize: 18,
            }}
            style={{
              marginHorizontal: 18,
              borderRadius: 2,
              backgroundColor: '#fff',
            }}>
            <Divider />
            <List.Item
              title="Excluir"
              left={props => (
                <List.Icon {...props} color={'#000'} icon="delete" />
              )}
              onPress={() => {
                setVisibleDisciplinaDialog(false);
                setVisibleConfirmation(true);
              }}
              titleStyle={{
                color: '#000',
              }}
              style={{height: 56}}
            />
            <List.Item
              title="Editar"
              left={props => (
                <List.Icon {...props} color={'#000'} icon="edit" />
              )}
              onPress={() => {
                setVisibleDisciplinaDialog(false);
                setVisibleConfirmation(false);
                setTimeout(() => {
                  navigation.navigate('FormDisciplina', {
                    update: true,
                    id: data.id,
                  });
                }, 180);
              }}
              titleStyle={{
                color: '#000',
              }}
            />
          </List.Section>
        </Modal>
        <Dialog
          style={{borderRadius: 2}}
          visible={visibleConfirmation}
          onDismiss={() => {
            setVisibleConfirmation(false);
          }}
          style={{elevation: 4}}>
          <Dialog.Title>Excluir</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={{fontSize: 16}}>
              Tem certeza que deseja excluir a disciplina {data.name}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setVisibleConfirmation(false);
              }}>
              Cancelar
            </Button>
            <Button onPress={deleteDisciplina}>Excluir</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <TouchableRipple
        underlayColor={'rgba(113, 89, 193, .16)'}
        borderless={true}
        rippleColor={'rgba(113, 89, 193, .16)'}
        onPress={() => {
          navigation.navigate('Aulas', {data});
        }}
        onLongPress={() => {
          Vibration.vibrate([1, 50, 30, 50]);
          setVisibleDisciplinaDialog(true);
        }}>
        <Container key={data.id}>
          <RowContainer>
            <Name>{data.name}</Name>
          </RowContainer>
        </Container>
      </TouchableRipple>
    </>
  );
}

export default withNavigation(DisciplinasComponent);

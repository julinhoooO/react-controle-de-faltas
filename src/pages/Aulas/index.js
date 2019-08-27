import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationActions} from 'react-navigation';

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
  HeaderDisciplina,
  Title,
  DeleteButton,
  Card,
  RowContainer,
  ColumnContainer,
  Name,
  NameTiny,
  ButtonsContainer,
  AddMissButton,
  DataContainer,
  GradeData,
  FloatingButtonOpenModal,
  FloatingButtonOpenModalText,
  GradeDay,
  GradeMonth,
  GradeYear,
} from './styles';

export default function Aulas({navigation}) {
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

  const [isFocused, setIsFocused] = useState(navigation.isFocused());
  const [disciplinaData, setDisciplinaData] = useState([]);
  const [gradesData, setGradesData] = useState([]);
  const {params} = navigation.state;
  async function increaseMisses() {
    const realm = await getRealm();
    const data = realm
      .objects('Disciplina')
      .sorted('name')
      .filtered(`id == ${params.data.id}`);
    const updatedData = {
      id: params.data.id,
      miss_quantity: data[0].miss_quantity + 1,
    };
    if (data[0].miss_quantity + 1 > data[0].maximum_miss) {
      updatedData.miss_quantity = data[0].maximum_miss;
    }
    realm.write(() => {
      realm.create('Disciplina', updatedData, 'modified');
    });
    const newData = realm
      .objects('Disciplina')
      .sorted('name')
      .filtered(`id == ${params.data.id}`);
    setDisciplinaData(newData[0]);
  }

  async function decreaseMisses(t) {
    const realm = await getRealm();
    const data = realm
      .objects('Disciplina')
      .sorted('name')
      .filtered(`id == ${params.data.id}`);
    const updatedData = {
      id: params.data.id,
      miss_quantity: data[0].miss_quantity - 1,
    };
    if (data[0].miss_quantity - 1 < 0) {
      updatedData.miss_quantity = 0;
    }
    realm.write(() => {
      realm.create('Disciplina', updatedData, 'modified');
    });
    const newData = realm
      .objects('Disciplina')
      .sorted('name')
      .filtered(`id == ${params.data.id}`);
    setDisciplinaData(newData[0]);
  }

  async function deleteDisciplina() {
    const realm = await getRealm();
    const disciplinaData = realm
      .objects('Disciplina')
      .sorted('name')
      .filtered(`id == ${params.data.id}`);
    realm.write(() => {
      realm.delete(disciplinaData[0]);
    });

    navigation.reset(
      [
        NavigationActions.navigate({
          routeName: 'DashBoard',
          params: {page: 'Disciplinas'},
        }),
      ],
      0,
    );
  }

  useEffect(() => {
    let isSubscribed = true;
    async function getDisciplinaData() {
      const realm = await getRealm();
      const disciplinaDataMiss = realm
        .objects('Disciplina')
        .sorted('name')
        .filtered(`id == ${params.data.id}`);
      const gradeData = realm
        .objects('Grade')
        .sorted('name', true)
        .filtered(`id_disciplina == ${params.data.id}`);
      if (gradeData.length && isSubscribed) {
        setGradesData(gradeData);
      }
      if (disciplinaDataMiss.length && isSubscribed) {
        setDisciplinaData(disciplinaDataMiss[0]);
      }
    }
    getDisciplinaData();
    return () => (isSubscribed = false);
  }, [isFocused]);
  return (
    <Container>
      {disciplinaData.id ? (
        <>
          <HeaderDisciplina>
            <Title>{disciplinaData.name}</Title>
            <DeleteButton onPress={deleteDisciplina}>
              <Icon name={'delete'} size={24} color="#7159c1" />
            </DeleteButton>
          </HeaderDisciplina>
          <Card>
            <RowContainer>
              <ColumnContainer>
                <Name>Faltas: {disciplinaData.miss_quantity}</Name>
                <NameTiny>
                  Faltas Restantes:{' '}
                  {disciplinaData.maximum_miss - disciplinaData.miss_quantity}
                </NameTiny>
              </ColumnContainer>
              <ButtonsContainer>
                <AddMissButton onPress={increaseMisses}>
                  <Icon name={'plus'} size={24} color="#fff" />
                </AddMissButton>
                <AddMissButton onPress={decreaseMisses}>
                  <Icon name={'minus'} size={24} color="#fff" />
                </AddMissButton>
              </ButtonsContainer>
            </RowContainer>
          </Card>
          <HeaderDisciplina>
            <Title>Provas/Trabalhos</Title>
          </HeaderDisciplina>
          {gradesData.map(grade => (
            <Card key={grade.id}>
              <RowContainer>
                <DataContainer>
                  <GradeMonth>
                    {weeksString[new Date(grade.date).getDay()]}
                  </GradeMonth>
                  <GradeDay>{new Date(grade.date).getDate()}</GradeDay>
                  <GradeMonth>
                    {monthsString[new Date(grade.date).getMonth()]}
                  </GradeMonth>
                </DataContainer>
                <DataContainer flex={8}>
                  <Name>{grade.name}</Name>
                  <NameTiny>
                    Nota: {grade.grade}/{grade.maximum_grade}
                  </NameTiny>
                </DataContainer>
                <ButtonsContainer>
                  <RowContainer>
                    <AddMissButton
                      onPress={() => {
                        navigation.navigate('FormGrade', {
                          update: true,
                          data: params.data,
                          grade_id: grade.id,
                        });
                      }}>
                      <Icon name={'pencil'} size={24} color="#fff" />
                    </AddMissButton>
                    <AddMissButton onPress={() => {}}>
                      <Icon name={'delete'} size={24} color="#fff" />
                    </AddMissButton>
                  </RowContainer>
                </ButtonsContainer>
              </RowContainer>
            </Card>
          ))}
          <FloatingButtonOpenModal
            onPress={() => {
              navigation.navigate('FormGrade', {
                data: params.data,
                update: false,
              });
            }}>
            <FloatingButtonOpenModalText>
              <Icon name={'bookmark-plus'} size={24} />
            </FloatingButtonOpenModalText>
          </FloatingButtonOpenModal>
        </>
      ) : (
        <>
          <Placeholder Animation={Shine}>
            <PlaceholderLine height={48} width={50} style={{borderRadius: 4}} />
          </Placeholder>
          <Card transparent>
            <Placeholder
              Animation={Shine}
              Left={props => (
                <PlaceholderMedia
                  style={[
                    {borderRadius: 4, width: 68, height: 68},
                    props.style,
                  ]}
                />
              )}
              Right={props => (
                <PlaceholderMedia
                  style={[
                    {borderRadius: 4, width: 68, height: 68},
                    props.style,
                  ]}
                />
              )}>
              <PlaceholderLine height={68} style={{borderRadius: 4}} />
            </Placeholder>
          </Card>
        </>
      )}
    </Container>
  );
}

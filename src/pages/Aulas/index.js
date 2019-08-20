import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import getRealm from '../../services/realm';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Shine,
} from 'rn-placeholder';

import {
  Container,
  Title,
  Card,
  RowContainer,
  Name,
  ButtonsContainer,
  AddMissButton,
  GradesContainer,
  GradeData,
  AddGradeButton,
  AddGradeButtonText,
} from './styles';

export default function Aulas({navigation}) {
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
    console.log(newData[0], updatedData);
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
    console.log(newData[0], updatedData);
    setDisciplinaData(newData[0]);
  }

  useEffect(() => {
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
      if (gradeData.length) {
        setGradesData(gradeData);
      }
      if (disciplinaDataMiss.length) {
        setDisciplinaData(disciplinaDataMiss[0]);
      }
    }
    getDisciplinaData();
  }, [disciplinaData]);
  return (
    <Container>
      {disciplinaData.length ? (
        <>
          <Title>{disciplinaData.name}</Title>
          <Card>
            <RowContainer>
              <Name>
                Faltas Restantes:{' '}
                {disciplinaData.maximum_miss - disciplinaData.miss_quantity}
              </Name>
              <AddMissButton onPress={increaseMisses}>
                <Icon name={'add'} size={24} />
              </AddMissButton>
              <AddMissButton onPress={decreaseMisses}>
                <Icon name={'remove'} size={24} />
              </AddMissButton>
            </RowContainer>
          </Card>
          {gradesData.map(grade => (
            <Card key={grade.id}>
              <RowContainer>
                <Name>{grade.name}</Name>
                <GradesContainer>
                  <GradeData>
                    Nota: {grade.grade}/{grade.maximum_grade}
                  </GradeData>
                  {/* <GradeData>
                {grade.date
                  .split('-')
                  .reverse()
                  .join('/')}
              </GradeData> */}
                </GradesContainer>
              </RowContainer>
            </Card>
          ))}
          <AddGradeButton
            onPress={() => {
              navigation.navigate('FormGrade', params.data);
            }}>
            <AddGradeButtonText>Adicionar Trabalho/Prova</AddGradeButtonText>
          </AddGradeButton>
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

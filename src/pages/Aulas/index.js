import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  Container,
  Title,
  Card,
  RowContainer,
  Name,
  AddMissButton,
  GradesContainer,
  GradeData,
  AddGradeButton,
  AddGradeButtonText,
} from './styles';

export default function Aulas({navigation}) {
  const [disciplinaData, setDisciplinaData] = useState([]);
  const {params} = navigation.state;
  useEffect(() => {
    async function getDisciplinaData() {
      const realm = await getRealm();
      const data = realm
        .objects('Grade')
        .sorted('name', true)
        .filtered(`id_disciplina == ${params.data.id}`);
      if (data.length) {
        console.log(data);
        setDisciplinaData(data);
      }
    }
    getDisciplinaData();
    console.log(disciplinaData);
  }, []);
  return (
    <Container>
      <Title>{params.data.name}</Title>
      <Card>
        <RowContainer>
          <Name>
            Faltas Restantes:{' '}
            {params.data.maximum_miss - params.data.miss_quantity}
          </Name>
          <AddMissButton>
            <Icon name="plus" size={22} />
          </AddMissButton>
        </RowContainer>
      </Card>
      {disciplinaData.map(grade => (
        <Card key={grade.id}>
          <RowContainer>
            <Name>{grade.name}</Name>
            <GradesContainer>
              <GradeData>
                Nota: {grade.grade}/{grade.maximum_grade}
              </GradeData>
              <GradeData>
                {grade.date
                  .split('-')
                  .reverse()
                  .join('/')}
              </GradeData>
            </GradesContainer>
          </RowContainer>
        </Card>
      ))}
      <AddGradeButton
        onPress={() => {
          navigation.navigate('FormGrade', {id: params.data.id});
        }}>
        <AddGradeButtonText>Adicionar Trabalho/Prova</AddGradeButtonText>
      </AddGradeButton>
    </Container>
  );
}

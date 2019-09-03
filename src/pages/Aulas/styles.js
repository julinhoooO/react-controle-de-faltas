import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import * as themes from '../../themes';

export const Container = styled.View`
  flex: 1;
  background-color: ${themes.light.container.backgroundColor};
  padding-top: ${30 + getStatusBarHeight(true)}px;
`;

export const HeaderDisciplina = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 16px;
`;

export const ColumnContainer = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  color: ${themes.light.title.color};
  padding: 10px 20px 0;
`;

export const Card = styled.View`
  background-color: ${props =>
    props.missesLeft >= 3 ? themes.light.card.backgroundColor : '#ff4a4a'};
  border-bottom-width: 1px;
  border-bottom-color: ${themes.light.card.borderColor};
  padding: 8px 4px;
  justify-content: center;
  align-items: center;
`;

export const GradeCard = styled.View`
  background-color: ${props =>
    props.transparent ? 'transparent' : themes.light.card.backgroundColor};
  border-bottom-width: 1px;
  border-bottom-color: ${themes.light.card.borderColor};
  padding: 8px 4px;
  justify-content: center;
  align-items: center;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const Name = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #090909;
`;

export const NameTiny = styled.Text`
  font-size: 16px;
  color: #666;
`;
export const ButtonsContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const DataContainer = styled.View`
  flex: ${props => (props.flex ? props.flex : 1)};
  flex-direction: column;
  justify-content: center;
  align-items: ${props => (props.alignItens ? props.alignItens : 'flex-start')};
  padding: 8px;
`;
export const AddMissButton = styled.TouchableOpacity`
  padding: 8px;
  margin: 8px;
  border-radius: 4px;
  background-color: #7159c1;
  color: #fff;
  shadowColor: #000;
  shadowOffset: { width: 0, height: 2 };
  shadowOpacity: 0.8;
  shadowRadius: 2;
  elevation: 2;
`;
export const DeleteButton = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 4px;
`;
export const GradesContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;
export const GradeData = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const FloatingButtonOpenModal = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  right: 10px;
  height: 64px;
  width: 64px;
  border-radius: 32px;
  padding: 8px;
  background-color: ${themes.light.button.backgroundColor};
  justify-content: center;
  align-items: center;
  shadowColor: #000;
  shadowOffset: { width: 0, height: 2 };
  shadowOpacity: 0.8;
  shadowRadius: 2;
  elevation: 2;
`;

export const FloatingButtonOpenModalText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${themes.light.button.color};
`;

export const GradeDay = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${themes.light.title.color};
`;

export const GradeMonth = styled.Text`
  font-size: 16px;
  color: ${themes.light.title.color};
  text-transform: uppercase;
`;

export const GradeYear = styled.Text`
  font-size: 14px;
  color: ${themes.light.title.color};
  font-weight: bold;
  text-transform: uppercase;
`;

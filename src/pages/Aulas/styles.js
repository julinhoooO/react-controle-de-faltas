import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const Container = styled.View`
  flex: 1;
  background-color: #7159c1;
  padding: ${30 + getStatusBarHeight(true)}px 16px 16px;
`;

export const Title = styled.Text`
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  padding: 0 20px;
`;

export const Card = styled.View`
  flex: 1;
  border-radius: 4px;
  background-color: #fff;
  margin: 8px 0;
  padding: 16px;
  justify-content: center;
  align-items: center;
  max-height: 100px;
  shadowColor: #000;
  shadowOffset: { width: 0, height: 2 };
  shadowOpacity: 0.8;
  shadowRadius: 2;
  elevation: 2;
`;

export const RowContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const Name = styled.Text`
  flex: 1;
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
`;

export const AddMissButton = styled.TouchableOpacity`
  padding: 16px;
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

export const AddGradeButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 16px;
  left: 16px;
  bottom: 16px;
  width: 100%;
  background-color: #6bd4c1;
  align-items: center;
  border-radius: 4px;
  padding: 16px;
  shadowColor: #000;
  shadowOffset: { width: 0, height: 2 };
  shadowOpacity: 0.8;
  shadowRadius: 2;
  elevation: 2;
`;
export const AddGradeButtonText = styled.Text`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
`;

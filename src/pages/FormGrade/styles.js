import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const Container = styled.View`
  flex: 1;
  background-color: #7159c1;
  padding-top: ${30 + getStatusBarHeight(true)}px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  padding: 0 20px;
`;

export const Form = styled.View`
  padding: 30px;
`;

export const Input = styled.TextInput.attrs({
  placeHolderTextColor: '#999',
})`
  padding: 12px 15px;
  border-radius: 4px;
  background-color: #f1f1f1;
  color: #333;
  font-size: 16px;
  margin-bottom: 10px;
`;
export const ButtonsContainer = styled.View`
  flex-direction: row;
  padding: 8px;
`;

export const SubmitButton = styled.TouchableOpacity`
  flex: 1;
  height: 48px;
  background-color: #00bbff;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 8px;
  margin-left: 4px;
  shadowColor: #000;
  shadowOffset: { width: 0, height: 2 };
  shadowOpacity: 0.8;
  shadowRadius: 2;
  elevation: 2;
`;

export const SubmitButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

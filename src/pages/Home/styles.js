import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const Container = styled.View`
  flex: 1;
  background-color: #7159c1;
  padding-top: ${30 + getStatusBarHeight(true)}px;
`;

export const Title = styled.Text`
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  padding: 0 20px;
`;

export const EmptyText = styled.Text`
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  padding: 0 20px;
`;

export const Form = styled.View`
  flex-direction: row;
  padding: 30px;
`;

export const AddButton = styled.TouchableNativeFeedback`
  flex: 1;
  background-color: #6bd4c1;
  justify-content: center;
  border-radius: 4px;
  padding: 16px;
`;

export const TextAddButton = styled.Text`
  font-size: 24px;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {paddingHorizontal: 20},
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const FloatingButtonOpenModal = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  right: 10px;
  height: 64px;
  width: 64px;
  border-radius: 32px;
  padding: 8px;
  background-color: #fff;
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
  color: #999;
`;

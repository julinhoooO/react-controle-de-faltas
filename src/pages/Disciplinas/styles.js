import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import * as themes from '../../themes';

export const Container = styled.View`
  flex: 1;
  background-color: ${themes.light.container.backgroundColor};
  padding-top: ${30 + getStatusBarHeight(true)}px;
`;

export const SearchbarContainer = styled.View`
  padding: 10px 10px 0;
`;

export const Title = styled.Text`
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  color: ${themes.light.title.color};
  padding: 10px 20px 0;
  background-color: transparent;
`;

export const EmptyTextContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${themes.light.title.color};
  padding: 0 20px;
`;

export const Form = styled.View`
  flex-direction: row;
  padding: 30px;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingBottom: 84,
  },
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

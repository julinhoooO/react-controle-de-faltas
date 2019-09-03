import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import * as themes from '../../themes';

export const Container = styled.View`
  flex: 1;
  background-color: ${themes.light.container.backgroundColor};
  padding-top: ${30 + getStatusBarHeight(true)}px;
`;

export const Title = styled.Text`
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  color: ${themes.light.title.color};
  padding: 10px 20px 7.5px;
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
})`
  margin-top: 20px;
`;

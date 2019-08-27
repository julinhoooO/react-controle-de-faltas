import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import * as themes from '../../themes';

export const Container = styled.View`
  flex: 1;
  background-color: ${themes.light.card.backgroundColor};
  padding-top: ${30 + getStatusBarHeight(true)}px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
  color: ${themes.light.title.color};
  padding: 10px 20px 0;
`;

export const Form = styled.View`
  padding: 30px;
`;

export const SubmitButton = styled.TouchableOpacity`
  flex-direction: row;
  height: 52px;
  background-color: ${themes.light.button.backgroundColor};
  color: ${themes.light.button.color};
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  padding: 8px;
  shadowColor: #000;
  shadowOffset: { width: 0, height: 2 };
  shadowOpacity: 0.8;
  shadowRadius: 2;
  elevation: 2;
`;

export const SubmitButtonText = styled.Text`
  margin-left: -24px;
  align-self: center;
  font-size: 20px;
  font-weight: bold;
  color: ${themes.light.button.color};
`;

export const EmptyContainer = styled.View``;

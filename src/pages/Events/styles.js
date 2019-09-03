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

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#FFF',
})`
  margin: 30px 0;
`;

export const EventContainer = styled.View`
  background-color: ${themes.light.card.backgroundColor};
  padding: 4px;
  height: 100px;
  min-height: 100px;
  max-height: 100px;
  border-bottom-width: 1px;
  border-bottom-color: ${themes.light.card.borderColor};
`;
export const EventRowContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: ${props => (props.alignItens ? props.alignItens : 'center')};
`;
export const EventName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${themes.light.card.color};
`;
export const EventButtonsContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-right: 12px;
`;
export const EventAddMissButton = styled.TouchableOpacity`
  padding: 8px;
  margin: 4px;
  border-radius: 4px;
  background-color: ${themes.light.button.backgroundColor};
  color: ${themes.light.button.color};
  shadowColor: #000;
  shadowOffset: { width: 0, height: 2 };
  shadowOpacity: 0.8;
  shadowRadius: 2;
  elevation: 2;
`;

export const EventColumnContainer = styled.View`
  flex: ${props => (props.flex ? props.flex : 1)};
  flex-direction: column;
  justify-content: center;
  align-items: ${props => (props.alignItens ? props.alignItens : 'flex-start')};
  padding: 8px;
`;

export const EventTinyName = styled.Text`
  font-size: 16px;
  color: #999;
`;

export const EventDay = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${themes.light.title.color};
`;

export const EventMonth = styled.Text`
  font-size: 16px;
  color: ${themes.light.title.color};
  text-transform: uppercase;
`;

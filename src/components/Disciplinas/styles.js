import styled from 'styled-components/native';

import * as themes from '../../themes';

export const Container = styled.View`
  background-color: ${themes.light.card.backgroundColor};
  padding: 4px;
  height: 100px;
  min-height: 100px;
  max-height: 100px;
  border-bottom-width: 1px;
  border-bottom-color: ${themes.light.card.borderColor};
`;
export const RowContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
export const Name = styled.Text`
  flex: 1;
  font-size: 24px;
  font-weight: bold;
  padding: 16px;
  color: ${themes.light.card.color};
`;
export const ButtonsContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-right: 12px;
`;
export const AddMissButton = styled.TouchableOpacity`
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

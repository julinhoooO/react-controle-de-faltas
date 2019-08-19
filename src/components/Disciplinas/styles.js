import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  border-radius: 4px;
  background-color: #fff;
  margin-bottom: 15px;
`;
export const ToggleCollapsibleContainer = styled.TouchableOpacity`
  flex: 1;
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
export const Data = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;
export const CollapsibleContainer = styled.View`
  flex: 1;
  padding: 20px;
`;
export const Hours = styled.View`
  flex: 1;
`;
export const MissedHours = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;
export const RamainingHours = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;
export const GradesContainer = styled.View`
  flex: 1;
`;
export const Grades = styled.View`
  flex: 1;
`;
export const GradesData = styled.Text`
  flex: 1;
  flex-direction: row;
`;

import React from 'react';
import {withNavigation} from 'react-navigation';

import {Container, Name, ToggleCollapsibleContainer} from './styles';

function Disciplinas({data, navigation}) {
  return (
    <Container>
      <ToggleCollapsibleContainer
        onPress={() => {
          navigation.navigate('Aulas', {data});
        }}>
        <Name>{data.name}</Name>
      </ToggleCollapsibleContainer>
    </Container>
  );
}

export default withNavigation(Disciplinas);

import {createAppContainer, createStackNavigator} from 'react-navigation';

import Home from './pages/Home';
import Aulas from './pages/Aulas';
import FormDisciplina from './pages/FormDisciplina';
import FormGrade from './pages/FormGrade';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Home,
      Aulas,
      FormDisciplina,
      FormGrade,
    },
    {
      headerMode: 'none',
    },
  ),
);

export default Routes;

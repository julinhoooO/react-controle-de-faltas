import React from 'react';
import {Text, Dimensions} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as themes from './themes';

import Home from './pages/Home';
import Disciplinas from './pages/Disciplinas';
import Aulas from './pages/Aulas';
import FormDisciplina from './pages/FormDisciplina';
import FormGrade from './pages/FormGrade';
import FormEvents from './pages/FormEvents';
import Events from './pages/Events';

const StackDetails = createStackNavigator(
  {
    Aulas,
    FormGrade,
  },
  {
    initialRouteName: 'Aulas',
    mode: 'modal',
    headerMode: 'none',
  },
);
const StackDisciplinas = createStackNavigator(
  {
    Disciplinas,
    FormDisciplina,
    Details: {
      screen: StackDetails,
    },
  },
  {
    initialRouteName: 'Disciplinas',
    mode: 'modal',
    headerMode: 'none',
  },
);
const StackEvents = createStackNavigator(
  {
    Events,
    FormEvents,
  },
  {
    initialRouteName: 'Events',
    mode: 'modal',
    headerMode: 'none',
  },
);

const BottomTabBar = createMaterialTopTabNavigator(
  {
    Home: {
      screen: Home,
    },
    Disciplinas: {
      screen: StackDisciplinas,
    },
    Events: {
      screen: StackEvents,
      title: 'Eventos',
    },
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    keyboardHidesTabBar: true,
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Disciplinas') {
          iconName = `book${focused ? '' : '-outline'}`;
        } else if (routeName === 'Events') {
          iconName = `calendar-text${focused ? '' : '-outline'}`;
        }
        // You can return any component that you like here!
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
      tabBarLabel: ({focused, tintColor}) => {
        const {routeName} = navigation.state;
        let labelName;
        let color = focused ? '#7159c1' : '#999';
        if (routeName === 'Home' || 'Disciplinas') {
          labelName = routeName;
        } else if (routeName === 'Events') {
          labelName = 'Eventos';
        }
        // You can return any component that you like here!
        return <Text style={{color: color}}>{labelName}</Text>;
      },
    }),
    lazy: true,
    swipeEnabled: true,
    initialLayout: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    },
    tabBarOptions: {
      activeTintColor: themes.light.tab.activeTintColor,
      inactiveTintColor: themes.light.tab.inactiveTintColor,
      labelStyle: {
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 9,
        textTransform: 'uppercase',
      },
      style: {
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: themes.light.tab.backgroundColor,
        borderTopColor: themes.light.tab.borderTopColor,
        height: 54,
        elevation: themes.light.tab.elevation,
      },
      indicatorStyle: {
        position: 'absolute',
        top: 0,
        backgroundColor: themes.light.tab.indicatorStyle.backgroundColor,
        height: themes.light.tab.indicatorStyle.heigth,
      },
      pressColor: themes.light.tab.pressColor,
      pressOpacity: themes.light.tab.pressOpacity,
      showIcon: true,
      showLabel: true,
    },
  },
);

const Routes = createAppContainer(BottomTabBar);

export default Routes;

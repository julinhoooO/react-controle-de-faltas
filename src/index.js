import React from 'react';
import {StatusBar} from 'react-native';

import Routes from './routes';

export default function src() {
  return (
    <>
      <StatusBar
        barStyle="light-contet"
        translucent
        backgroundColor="transparent"
      />
      <Routes />
    </>
  );
}

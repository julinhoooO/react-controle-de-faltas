import React, {Component, createContext} from 'react';
import {StatusBar} from 'react-native';

import getRealm from './services/realm';
import EventContext from './services/EventContext';

import Routes from './routes';

class src extends Component {
  setNextEvents = dados => {
    this.setState({nextEvents: dados});
  };

  setAllEvents = dados => {
    this.setState({allEvents: dados});
  };

  state = {
    nextEvents: [],
    allEvents: [],
    setNextEvents: this.setNextEvents,
    setAllEvents: this.setAllEvents,
  };

  async getEvents() {
    const realm = await getRealm();
    const dataAll = realm
      .objects('Event')
      .sorted('date')
      .filtered(`date >= ${new Date().toISOString().slice(0, -5)}`);

    const dataNext = realm
      .objects('Event')
      .sorted('date')
      .filtered(
        `date >= ${new Date()
          .toISOString()
          .slice(0, -5)} AND date <= ${new Date(
          new Date().setDate(new Date().getDate() + 7),
        )
          .toISOString()
          .slice(0, -5)}`,
      );
    if (dataNext.length) {
      this.setNextEvents(dataNext);
    }
    if (dataAll.length) {
      this.setAllEvents(dataAll);
    }
  }

  componentDidMount() {
    this.getEvents();
  }

  render() {
    return (
      <>
        <StatusBar
          barStyle="light-contet"
          translucent
          backgroundColor="#7159c1"
        />
        <EventContext.Provider value={this.state}>
          <Routes />
        </EventContext.Provider>
      </>
    );
  }
}

export default src;

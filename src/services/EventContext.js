import {createContext} from 'react';

export default EventContext = createContext({
  nextEvents: [],
  allEvents: [],
  setNextEvents: () => {},
  setAllEvents: () => {},
});

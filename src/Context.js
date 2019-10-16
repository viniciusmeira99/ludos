import React from 'react';
import { getSavedUser, getSavedSelectedGame } from 'localStorage';

const Context = React.createContext({
  user: getSavedUser(),
  setUser: () => undefined,
  selectedGame: getSavedSelectedGame(),
  setSelectedGame: () => undefined,
});


export default Context;


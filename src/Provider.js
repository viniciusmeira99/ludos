import React, { useEffect, useState } from 'react';
import Proptype from 'prop-types';
import Context from 'Context';
import { getSavedUser, saveUser, getSavedSelectedGame, saveSelectedGame } from 'localStorage';

const Provider = ({
  children,
}) => {
  const [user, setUser] = useState(getSavedUser());
  const [selectedGame, setSelectedGame] = useState(getSavedSelectedGame());

  useEffect(() => saveUser(user), [user]);
  useEffect(() => saveSelectedGame(selectedGame), [selectedGame]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        selectedGame,
        setSelectedGame,
      }}
    >
      {children}
    </Context.Provider>
  )
};

Provider.propTypes = {
  children: Proptype.node.isRequired,
};

export default Provider;


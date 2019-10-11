import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { GamesToolbar, GamesTable } from './components';
import api from 'api';
import { Context } from 'context';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const GameList = () => {
  const classes = useStyles();
  const { user } = useContext(Context);

  const [games, setGames] = useState([]);

  useEffect(() => {
    api.get('/games', {
      params: { companyId: user.company.id },
    })
      .then(response => setGames(response.data))
  }, [user.company.id]);

  return (
    <div className={classes.root}>
      <GamesToolbar />
      <div className={classes.content}>
        <GamesTable games={games} />
      </div>
    </div>
  );
};

export default GameList;

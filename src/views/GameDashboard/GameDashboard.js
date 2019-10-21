import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import api from 'api';
import Context from 'Context';

import { GameCard } from './components';
import { EmptyList } from 'components';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const GameDashboard = () => {
  const classes = useStyles();

  const { user } = useContext(Context);

  const [games, setGames] = useState(null);

  useEffect(() => {
    api.get(`/users/${user.id}/games`)
      .then(response => setGames(response.data))
  }, [user.id]);

  if (!games) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {games.length === 0
          ? (
            <EmptyList
              subtitle="Entre em contato com o administrador da sua empresa para disponibilizar os jogos."
              title="Nenhum jogo disponível."
            />
          ) : (
            <Grid
              container
              spacing={3}
            >
              {games && games.map(game => (
                <Grid
                  item
                  key={game.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <GameCard game={game} />
                </Grid>
              ))}
            </Grid>
          )}
      </div>
    </div>
  );
};


export default GameDashboard;

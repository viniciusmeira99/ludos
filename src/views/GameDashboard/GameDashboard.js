import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import api from 'api';
import { Context } from 'context';

import { GameCard } from './components';


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

  const [userGames, setGames] = useState([]);

  useEffect(() => {
    api.get('/user-games', {
      params: { userId: user.id },
    })
      .then(response => setGames(response.data))
  }, [user.id]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {userGames.map(game => (
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
      </div>
    </div>
  );
};


export default GameDashboard;

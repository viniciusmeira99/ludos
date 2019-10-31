import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {
  GameRanking,
} from './components';
import Context from 'Context';
import { LEVEL_USER } from 'consts';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();

  const { user, selectedGame } = useContext(Context);

  useEffect(() => {
    if (user.level === LEVEL_USER && !selectedGame) {
      history.push('/game-select');
      return;
    }
  }, [history, selectedGame, user])

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          xs={12}
        >
          <GameRanking />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

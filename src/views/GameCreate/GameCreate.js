import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { GameDetails } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const GameCreate = () => {
  const classes = useStyles();
  const { gameId } = useParams();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          md={3}
          xl={3}
        />
        <Grid
          item
          lg={6}
          md={6}
          xl={6}
          xs={12}
        >
          <GameDetails gameId={gameId} />
        </Grid>
      </Grid>
    </div>
  );
};

export default GameCreate;

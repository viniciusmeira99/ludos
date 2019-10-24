import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
} from '@material-ui/core';
import useGameRanking from './useGameRanking';
import GameRankingTable from './GameRankingTable';

const useStyles = makeStyles(() => ({
  root: {},
  inner: {
    height: 415,
  },
  classificacao: {
    width: 20,
  },
}));

const GameRanking = props => {
  const { gameId } = props;

  const classes = useStyles();

  const gameRaking = useGameRanking(gameId);

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Ranking"
      />
      <Divider />
      <CardContent>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <GameRankingTable gameRaking={gameRaking} />
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

GameRanking.propTypes = {
  className: PropTypes.string,
  gameId: PropTypes.number.isRequired,
};

export default GameRanking;

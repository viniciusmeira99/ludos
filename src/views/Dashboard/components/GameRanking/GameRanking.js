import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import useGameRanking from './useGameRanking';

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
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.classificacao} />
                  <TableCell>Usuário</TableCell>
                  <TableCell>Pontuação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gameRaking.map(({ score, user }, index) => (
                  <TableRow
                    hover
                    key={user.id}
                  >
                    <TableCell>{index <= 2 ? `${index + 1}°` : ''}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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

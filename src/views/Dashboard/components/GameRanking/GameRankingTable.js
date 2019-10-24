import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  classificacao: {
    width: 20,
  },
}));

const GameRankingTable = props => {
  const { gameRaking } = props;

  const classes = useStyles();

  return (
    <Table>
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
            key={user.name}
          >
            <TableCell>{index <= 2 ? `${index + 1}°` : ''}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

GameRankingTable.propTypes = {
  className: PropTypes.string,
  gameRaking: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
};

export default GameRankingTable;

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
import { UserTableCell } from 'components';

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
        {gameRaking.map(({ score, name, image, id }, index) => (
          <TableRow
            hover
            key={id}
          >
            <TableCell>{index <= 2 ? `${index + 1}°` : ''}</TableCell>
            <UserTableCell
              image={image}
              name={name}
            />
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number,
  })).isRequired,
};

export default GameRankingTable;

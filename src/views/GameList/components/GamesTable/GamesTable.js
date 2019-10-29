import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const GamesTable = props => {
  const { className, deleteGame, games, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Data inicial</TableCell>
                  <TableCell>Data final</TableCell>
                  <TableCell>Data do cadastro</TableCell>
                  <TableCell>Opções</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {games.slice(0, rowsPerPage).map(game => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={game.id}
                  >
                    <TableCell>{game.name}</TableCell>
                    <TableCell>{game.description}</TableCell>
                    <TableCell>
                      {moment(game.startDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      {moment(game.endDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      {moment(game.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <Link to={`/games/${game.id}/edit`}>
                        <IconButton
                          aria-label="edit"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Link>
                      <IconButton
                        aria-label="delete"
                        onClick={() => deleteGame(game.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={games.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

GamesTable.propTypes = {
  className: PropTypes.string,
  deleteGame: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
};

export default GamesTable;

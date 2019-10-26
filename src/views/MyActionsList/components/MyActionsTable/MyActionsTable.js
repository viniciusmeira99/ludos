import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/pt-br';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
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
} from '@material-ui/core';
import { EmptyList } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const MyActionsTable = props => {
  const { className, userActions, ...rest } = props;

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
            {userActions.length === 0 && (
              <EmptyList title="Nenhuma ação lançada no jogo selecionado" />
            )}
            {userActions.length > 0 && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ação</TableCell>
                    <TableCell>Pontuação</TableCell>
                    <TableCell>Data de lançamento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userActions.slice(0, rowsPerPage).map(userAction => (
                    <TableRow
                      hover
                      key={userAction.id}
                    >
                      <TableCell>{userAction.action.name}</TableCell>
                      <TableCell>{userAction.score}</TableCell>
                      <TableCell>
                        {moment(userActions.createdAt).format('LLL')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={userActions.length}
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

MyActionsTable.propTypes = {
  className: PropTypes.string,
  userActions: PropTypes.array.isRequired
};

export default MyActionsTable;

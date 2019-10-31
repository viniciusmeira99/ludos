import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { SpanTruncate } from '../index';

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

const QuestionsTable = props => {
  const { className, deleteQuestion, questions, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(5);
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
                  <TableCell>Descrição</TableCell>
                  <TableCell>Alternativas</TableCell>
                  <TableCell>Data do cadastro</TableCell>
                  <TableCell>Opções</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.slice(0, rowsPerPage).map(question => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={question.id}
                  >
                    <TableCell>
                      <SpanTruncate length={100}>
                        {question.description}
                      </SpanTruncate>
                    </TableCell>
                    <TableCell size="small">
                      <List dense>
                        {question.alternatives.map(alternative => (
                          <ListItem key={alternative.id}>
                            <ListItemIcon>
                              {alternative.isCorrect ? <CheckIcon /> : <CloseIcon />}
                            </ListItemIcon>
                            <ListItemText primary={alternative.description} />
                          </ListItem>
                        ))}
                      </List>
                    </TableCell>
                    <TableCell>
                      {moment(question.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        onClick={() => deleteQuestion(question.id)}
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
          count={questions.length}
          labelRowsPerPage="Linhas por páginas"
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

QuestionsTable.propTypes = {
  className: PropTypes.string,
  deleteQuestion: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
};

export default QuestionsTable;

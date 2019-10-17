import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import api from 'api';

const useStyles = makeStyles(theme => ({
  root: {},
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
}));

const QuestionSelectionTable = props => {
  const { companyId, onChange } = props;
  const classes = useStyles();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    api.get('/questions', {
      params: { companyId },
    })
      .then(response => setQuestions(response.data))
  }, [companyId]);

  const [selectedQuestions, setSelectedUsers] = useState([]);

  useEffect(() => {
    onChange(selectedQuestions)
  }, [selectedQuestions]);

  const handleSelectAll = event => {
    setSelectedUsers(
      event.target.checked
        ? questions.map(question => ({
          questionId: question.id,
          score: 0,
        }))
        : []
    );
  };

  const handleSelectOne = (event, id) => {
    setSelectedUsers(
      event.target.checked
        ? selectedQuestions.concat({ questionId: id, score: 0 })
        : selectedQuestions.filter(({ questionId }) => questionId !== id),
    );
  };

  const getQuestion = id => selectedQuestions.find(({ questionId }) => questionId === id);
  const isSelected = id => !!getQuestion(id);

  const getError = (id) => {
    const question = getQuestion(id);
    return question && !question.score ? 'A pontuação é obrigatória' : '';
  };

  const hasError = id => !!getError(id);

  const setScore = (id, score) => {
    setSelectedUsers(selectedQuestions.map((selectedQuestion) => {
      if (selectedQuestion.questionId !== id) {
        return selectedQuestion;
      }

      return { questionId: id, score };
    }));
  };

  const getScore = id => getQuestion(id).score || '';

  return (
    <PerfectScrollbar>
      <div className={classes.inner}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedQuestions.length === questions.length}
                  color="primary"
                  indeterminate={
                    selectedQuestions.length > 0 &&
                    selectedQuestions.length < questions.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Pontuação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map(question => (
              <TableRow
                className={classes.tableRow}
                hover
                key={question.id}
                selected={isSelected(question.id)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(question.id)}
                    color="primary"
                    onChange={event => handleSelectOne(event, question.id)}
                    value="true"
                  />
                </TableCell>
                <TableCell>
                  {question.description}
                </TableCell>
                <TableCell>
                  {isSelected(question.id) && (
                    <TextField
                      error={hasError(question.id)}
                      fullWidth
                      helperText={getError(question.id)}
                      margin="dense"
                      max="10"
                      name="pontuacao"
                      onChange={event => setScore(question.id, Number(event.target.value))}
                      required
                      step="0.01"
                      type="number"
                      value={getScore(question.id)}
                      variant="outlined"
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </PerfectScrollbar>
  );
};

QuestionSelectionTable.propTypes = {
  companyId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default QuestionSelectionTable;

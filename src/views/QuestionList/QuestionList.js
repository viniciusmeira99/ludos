import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { QuestionsToolbar, QuestionsTable } from './components';
import api from 'api';
import Context from 'Context';
import { useSnackbar } from 'notistack';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const QuestionList = () => {
  const classes = useStyles();
  const { user } = useContext(Context);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    api
      .get('/questions', {
        params: { companyId: user.company.id },
      })
      .then(response => setQuestions(response.data));
  }, [user.company.id]);

  const deleteQuestion = (questions) => {
    const snack = enqueueSnackbar('Deletar a pergunta?', {
      autoHideDuration: 6000,
      action: (
        <Button
          color="secondary"
          onClick={() => {
            closeSnackbar(snack);

            api
              .delete(`/questions/${questions}`)
              .then(() => {
                enqueueSnackbar('Pergunta deletada!', {
                  autoHideDuration: 6000,
                  variant: 'success',
                });

                api
                  .get('/questions', {
                    params: { companyId: user.company.id },
                  })
                  .then(response => setQuestions(response.data));
              })
              .catch(() => {
                enqueueSnackbar('Não foi possível deletar a pergunta', {
                  autoHideDuration: 6000,
                  variant: 'error',
                });
              });
          }}
          variant="text"
        >
          Deletar
        </Button>
      ),
    })

  };

  return (
    <div className={classes.root}>
      <QuestionsToolbar />
      <div className={classes.content}>
        <QuestionsTable
          deleteQuestion={deleteQuestion}
          questions={questions}
        />
      </div>
    </div>
  );
};

export default QuestionList;

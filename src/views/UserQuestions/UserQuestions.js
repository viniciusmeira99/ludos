import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Context from 'Context';
import {
  Button,
} from '@material-ui/core';
import { EmptyList } from 'components';
import { QuestionList } from './components/index';
import api from 'api';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
}));

const UserQuestions = () => {
  const classes = useStyles();
  const [gameQuestions, setGameQuestions] = useState([]);
  const { selectedGame, user } = useContext(Context);

  useEffect(() => {
    if (!selectedGame) {
      setGameQuestions([]);
      return;
    }

    api.get(`/games/${selectedGame.id}/questions`)
      .then(response => setGameQuestions(response.data));
  }, [selectedGame])

  if (!selectedGame) {
    return (
      <EmptyList
        subtitle={(
          <>
            Você precisa selecionar um jogo para continuar.
            <br />
            <Link to="/game-select">
              <Button
                variant="text"
              >
                Selecionar jogo
              </Button>
            </Link>
          </>
        )}
        title="Nenhum jogo selecionado."
      />
    );
  }

  const onAnswer = ({
    gameQuestionId,
    score,
    alternativeId,
  }) => {
    const answer = {
      gameQuestionId,
      score,
      alternativeId,
      gameId: selectedGame.id,
      companyId: user.companyId,
      userId: user.id,
    };

    const newGameQuestions = gameQuestions.map(question => question.id === gameQuestionId
      ? ({ ...question, answer })
      : question);

    api.post('/answers', answer).then(() => {
      setGameQuestions(newGameQuestions);
    });
  };

  return (
    <div className={classes.root}>
      <QuestionList
        onAnswer={onAnswer}
        questions={gameQuestions}
      />
    </div>
  );
};

export default UserQuestions;

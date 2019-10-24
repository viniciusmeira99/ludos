import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
} from '@material-ui/core';
import { EmptyList } from 'components';
import { QuestionCard } from './';

const QuestionList = props => {
  const { questions, onAnswer } = props;

  if (questions.length === 0) {
    return (
      <EmptyList
        subtitle="Entre em contato com o administrador da sua empresa para disponibilizar as perguntas."
        title="Nenhuma pergunta disponível no jogo selecionado."
      />
    )
  }

  return (
    <Grid
      container
      spacing={4}
    >
      {questions.map((question) => (
        <Grid
          item
          key={question.id}
          xs={12}
        >
          <QuestionCard
            alternatives={question.question.alternatives}
            answer={question.answer}
            description={question.question.description}
            id={question.id}
            onAnswer={onAnswer}
            score={question.score}
          />
        </Grid>
      ))}
    </Grid>
  );
};

QuestionList.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
};

export default QuestionList;

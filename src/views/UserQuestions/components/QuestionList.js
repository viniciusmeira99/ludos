import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
} from '@material-ui/core';
import { EmptyList } from 'components';
import { QuestionCard } from './';

const QuestionList = props => {
  const { questions } = props;

  if (questions.length === 0) {
    return (
      <EmptyList
        subtitle="Entre em contato com o administrador da sua empresa para disponibilizar as perguntas."
        title="Nenhuma questão disponível no jogo selecionado."
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
          lg={3}
          md={4}
          sm={6}
          xl={3}
          xs={12}
        >
          <QuestionCard
            alternatives={question.question.alternatives}
            description={question.question.description}
            id={question.id}
            key={question.id}
          />
        </Grid>
      ))}
    </Grid>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default QuestionList;

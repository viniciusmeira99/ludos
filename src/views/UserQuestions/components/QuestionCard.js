import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  CardActions,
  Chip,
} from '@material-ui/core';
import { AnswerIcon } from './index';

const QuestionCard = props => {
  const { answer, description, alternatives, onAnswer, id, score } = props;
  const [checked, setChecked] = useState(null);

  const isCorrect = () => {
    const alternative = alternatives.find(alternative => alternative.id === checked);
    if (!alternative) {
      return false;
    }

    return alternative.isCorrect;
  }

  return (
    <Card>
      <CardHeader
        title={(
          <>
            <Chip
              color="primary"
              label={`${score}`}
              size="small"
            />
            {' '}
            {description}
          </>
        )}
      />
      <CardContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">Alternativas:</FormLabel>
          {alternatives.map((alternative) => (
            <FormControlLabel
              control={(
                answer
                  ? (
                    <Radio
                      checked={answer.alternativeId === alternative.id}
                      disabled
                      name={`question-${id}-alternative`}
                      value={alternative.id}
                    />
                  ) : (
                    <Radio
                      checked={alternative.id === checked}
                      name={`question-${id}-alternative`}
                      onChange={event => event.target.checked && setChecked(alternative.id)}
                      value={alternative.id}
                    />
                  )
              )}
              key={alternative.id}
              label={(
                <>
                  {alternative.description}
                  {answer && alternative.isCorrect && <AnswerIcon isCorrect />}
                  {answer && !alternative.isCorrect && answer.alternativeId === alternative.id && (
                    <AnswerIcon isCorrect={false} />
                  )}
                </>
              )}
            />
          ))}
        </FormControl>
      </CardContent>
      <CardActions>
        {!answer && (
          <Button
            color="primary"
            disabled={!checked}
            onClick={() => onAnswer({
              score: isCorrect() ? score : 0,
              questionsGameId: id,
              alternativeId: checked,
            })}
            size="small"
          >
            Responder
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

QuestionCard.propTypes = {
  alternatives: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
  })).isRequired,
  answer: PropTypes.shape({
    alternativeId: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
  }),
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default QuestionCard;

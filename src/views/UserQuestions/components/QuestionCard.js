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
} from '@material-ui/core';


const QuestionCard = props => {
  const { description, alternatives, id } = props;
  const [checked, setChecked] = useState(null);
  return (
    <Card>
      <CardHeader title={description} />
      <CardContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">Alternativas:</FormLabel>
          {alternatives.map((alternative) => (
            <FormControlLabel
              control={
                <Radio
                  checked={alternative.id === checked}
                  name={`question-${id}-alternative`}
                  onChange={event => event.target.checked && setChecked(alternative.id)}
                  value={alternative.id}
                />
              }
              key={alternative.id}
              label={alternative.description}
            />
          ))}
        </FormControl>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          size="small"
        >
          Responder
        </Button>
      </CardActions>
    </Card>
  );
};

QuestionCard.propTypes = {
  alternatives: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default QuestionCard;

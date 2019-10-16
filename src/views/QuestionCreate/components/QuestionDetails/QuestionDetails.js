import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from '@material-ui/core';
import Context from 'Context';
import api from 'api';
import { BackButton } from 'components';
import { useSnackbar } from 'notistack';

const QuestionDetails = props => {
  const { history } = props;
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useContext(Context);

  const [errors, setErrors] = useState({});
  const [description, setDescription] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/questions', {
      description,
      answers: [
        {
          isCorrect: true,
          description: correctAnswer,
        },
        ...wrongAnswers.map((wrongAnswer) => ({
          isCorrect: false,
          description: wrongAnswer,
        }))
      ],
      companyId: user.companyId,
    })
      .then(() => {
        setDescription('');
        enqueueSnackbar('Pergunta cadastrada!', { variant: 'success', });
        history.goBack();
      }).catch((err) => {
        if (err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      });
  };

  const hasError = name => Boolean(errors[name]);
  const getError = name => hasError(name) ? errors[name][0] : '';

  const onChangeWrongAnswer = (index, value) => {
    const newWrongAnsers = [...wrongAnswers];
    newWrongAnsers[index] = value;
    setWrongAnswers(newWrongAnsers);
  };

  return (
    <Card>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <CardHeader
          subheader="Digite os dados da nova pergunta"
          title="Cadastro de perguntas"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                error={hasError('description')}
                fullWidth
                helperText={getError('description')}
                label="Pergunta:"
                margin="dense"
                name="description"
                onChange={event => setDescription(event.target.value)}
                required
                value={description}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={hasError('answers')}
                fullWidth
                helperText={getError('answers')}
                label="Resposta correta:"
                margin="dense"
                name="correctAnswer"
                onChange={event => setCorrectAnswer(event.target.value)}
                required
                value={correctAnswer}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={hasError('answers')}
                fullWidth
                helperText={getError('answers')}
                label="Resposta errada #1"
                margin="dense"
                name="wrongAnswer[]"
                onChange={event => onChangeWrongAnswer(0, event.target.value)}
                required
                value={wrongAnswers[0] || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={hasError('answers')}
                fullWidth
                helperText={getError('answers')}
                label="Resposta errada #2"
                margin="dense"
                name="wrongAnswer[]"
                onChange={event => onChangeWrongAnswer(1, event.target.value)}
                required
                value={wrongAnswers[1] || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={hasError('answers')}
                fullWidth
                helperText={getError('answers')}
                label="Resposta errada #3"
                margin="dense"
                name="wrongAnswer[]"
                onChange={event => onChangeWrongAnswer(2, event.target.value)}
                required
                value={wrongAnswers[2] || ''}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            type="submit"
            variant="contained"
          >
            Criar pergunta
          </Button>
          <BackButton />
        </CardActions>
      </form>
    </Card>
  );
};

QuestionDetails.propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(QuestionDetails);

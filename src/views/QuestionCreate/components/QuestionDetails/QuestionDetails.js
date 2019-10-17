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
  const [correctAlternative, setCorrectAlternative] = useState('');
  const [wrongAlternatives, setWrongAlternatives] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/questions', {
      description,
      alternatives: [
        {
          isCorrect: true,
          description: correctAlternative,
        },
        ...wrongAlternatives.map((wrongAlternative) => ({
          isCorrect: false,
          description: wrongAlternative,
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

  const onChangeWrongAlternative = (index, value) => {
    const newWrongAnsers = [...wrongAlternatives];
    newWrongAnsers[index] = value;
    setWrongAlternatives(newWrongAnsers);
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
                error={hasError('alternatives')}
                fullWidth
                helperText={getError('alternatives')}
                label="Alternativa correta:"
                margin="dense"
                name="correctAlternative"
                onChange={event => setCorrectAlternative(event.target.value)}
                required
                value={correctAlternative}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={hasError('alternatives')}
                fullWidth
                helperText={getError('alternatives')}
                label="Alternativa errada #1"
                margin="dense"
                name="wrongAlternative[]"
                onChange={event => onChangeWrongAlternative(0, event.target.value)}
                required
                value={wrongAlternatives[0] || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={hasError('alternatives')}
                fullWidth
                helperText={getError('alternatives')}
                label="Alternativa errada #2"
                margin="dense"
                name="wrongAlternative[]"
                onChange={event => onChangeWrongAlternative(1, event.target.value)}
                required
                value={wrongAlternatives[1] || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={hasError('alternatives')}
                fullWidth
                helperText={getError('alternatives')}
                label="Alternativa errada #3"
                margin="dense"
                name="wrongAlternative[]"
                onChange={event => onChangeWrongAlternative(2, event.target.value)}
                required
                value={wrongAlternatives[2] || ''}
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

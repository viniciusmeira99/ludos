import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  FormLabel,
  FormGroup,
  FormHelperText,
} from '@material-ui/core';
import Context from 'Context';
import api from 'api';
import { BackButton } from 'components';
import { useSnackbar } from 'notistack';
import { PlayerSelectionTable, QuestionSelectionTable } from '..';

const useStyles = makeStyles(() => ({
  root: {}
}));

const GameDetails = props => {
  const { history } = props;
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const { user } = useContext(Context);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});

  const handleChange = event => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value
    };

    setValues(newValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/games', {
      ...values,
      companyId: user.companyId,
    })
      .then(() => {
        setValues({});
        enqueueSnackbar('Jogo cadastrado', { variant: 'success', });
        history.goBack();
      }).catch((err) => {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
      });
  };

  const hasError = name => Boolean(errors[name]);
  const getError = name => hasError(name) ? errors[name][0] : '';

  return (
    <Card className={classes.root}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <CardHeader
          subheader="Digite os dados do novo jogo"
          title="Cadastro de jogos"
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
                error={hasError('name')}
                fullWidth
                helperText={getError('name')}
                label="Nome"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={hasError('description')}
                fullWidth
                helperText={getError('description')}
                label="Descrição"
                margin="dense"
                name="description"
                onChange={handleChange}
                required
                value={values.description || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <TextField
                error={hasError('startDate')}
                fullWidth
                helperText={getError('startDate')}
                // eslint-disable-next-line react/jsx-sort-props
                InputLabelProps={{
                  shrink: true,
                }}
                label="Data inicial"
                margin="dense"
                name="startDate"
                onChange={handleChange}
                required
                type="date"
                value={values.startDate || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <TextField
                error={hasError('endDate')}
                fullWidth
                helperText={getError('endDate')}
                // eslint-disable-next-line react/jsx-sort-props
                InputLabelProps={{
                  shrink: true,
                }}
                label="Data inicial"
                margin="dense"
                name="endDate"
                onChange={handleChange}
                required
                type="date"
                value={values.endDate || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <FormGroup>
                <FormLabel
                  error={hasError('playersIds')}
                >
                  Disponibilizar para os usuários:
                </FormLabel>
                <br />
                <PlayerSelectionTable
                  companyId={user.company.id}
                  playersIds={values.playersIds || []}
                  setPlayersIds={playersIds => setValues(values => ({ ...values, playersIds }))}
                />
                {hasError('playersIds') && (
                  <FormHelperText error>
                    {getError('playersIds')}
                  </FormHelperText>
                )}
              </FormGroup>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <FormGroup>
                <FormLabel
                  error={hasError('questions')}
                >
                  Selecione as perguntas do jogo:
                </FormLabel>
                <br />
                <QuestionSelectionTable
                  companyId={user.company.id}
                  questions={values.questions || []}
                  setQuestions={questions => setValues(values => ({ ...values, questions }))}
                />
                {hasError('questions') && (
                  <FormHelperText error>
                    {getError('questions')}
                  </FormHelperText>
                )}
              </FormGroup>
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
            Criar jogo
          </Button>
          <BackButton />
        </CardActions>
      </form>
    </Card>
  );
};

GameDetails.propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(GameDetails);

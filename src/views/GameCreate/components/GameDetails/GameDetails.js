import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
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
import { BackButton, PlayerSelectionTable } from 'components';
import { useSnackbar } from 'notistack';
import { QuestionSelectionTable } from '..';
import { LEVEL_USER } from 'consts';


const useStyles = makeStyles(() => ({
  root: {}
}));

const GameDetails = props => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const { user } = useContext(Context);

  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});

  useEffect(() => {
    api.get('/users', {
      params: { companyId: user.companyId },
    })
      .then(response => setUsers(response.data.filter(user => user.level === LEVEL_USER)))
  }, [user.companyId]);

  useEffect(() => {
    if (!props.gameId) {
      return;
    }
    
    api.get(`/games/${props.gameId}`)
      .then(({ data: { startDate, endDate, players, ...game } }) => setValues({
        ...game,
        playersIds: players.map(player => player.id),
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
      }))
  }, [props.gameId]);

  const handleChange = event => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value
    };

    setValues(newValues);
  };

  const setResponseError = (err) => {
    if (err.response && err.response.data && err.response.data.errors) {
      setErrors(err.response.data.errors);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.gameId) {
      api.put(`/games/${props.gameId}`, {
        ...values,
        companyId: user.companyId,
      })
        .then(() => {
          setValues({});
          enqueueSnackbar('Jogo editado', { variant: 'success', });
          history.goBack();
        })
        .catch(setResponseError);
      return;
    }

    api.post('/games', {
      ...values,
      companyId: user.companyId,
    })
      .then(() => {
        setValues({});
        enqueueSnackbar('Jogo cadastrado', { variant: 'success', });
        history.goBack();
      })
      .catch(setResponseError);
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
                  playersIds={values.playersIds || []}
                  setPlayersIds={playersIds => setValues(values => ({ ...values, playersIds }))}
                  users={users}
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
                  error={hasError('gameQuestions')}
                >
                  Selecione as perguntas do jogo:
                </FormLabel>
                <br />
                <QuestionSelectionTable
                  companyId={user.company.id}
                  gameQuestions={values.gameQuestions || []}
                  setGameQuestions={gameQuestions => setValues(values => ({ ...values, gameQuestions }))}
                />
                {hasError('gameQuestions') && (
                  <FormHelperText error>
                    {getError('gameQuestions')}
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
            {props.gameId ? 'Editar jogo' : 'Criar jogo'}
          </Button>
          <BackButton />
        </CardActions>
      </form>
    </Card>
  );
};

GameDetails.propTypes = {
  className: PropTypes.string,
  gameId: PropTypes.string,
};

export default GameDetails;

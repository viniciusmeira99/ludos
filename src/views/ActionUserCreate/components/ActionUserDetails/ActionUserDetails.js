import React, { useState, useContext, useEffect } from 'react';
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
  FormLabel,
  FormGroup,
  FormHelperText,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';
import Context from 'Context';
import api from 'api';
import { BackButton, PlayerSelectionTable } from 'components';
import { useSnackbar } from 'notistack';
import { LEVEL_USER } from 'consts';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ActionUserDetails = props => {
  const { history } = props;
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const { user } = useContext(Context);
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});

  const [gameId, setGameId] = useState({});

  useEffect(() => {
    api
      .get('/games', {
        params: { companyId: user.company.id },
      })
      .then(response => setGames(response.data));
  }, [user.company.id]);

  useEffect(() => {
    api.get(`/users/${gameId}/game`)
      .then(response => setUsers(response.data))
  }, [gameId]);

  const handleChange = event => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value
    };
    setValues(newValues);
    setGameId(event.target.value);
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
          subheader="Preencha o formulário para lançar ações com pontuação"
          title="Lançamento de ação"
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
              <Select
                fullWidth
                label="Nível"
                margin="dense"
                name="game"
                onChange={handleChange}
                required
                type="string"
                value={values.game || ''}
                variant="outlined"
              >
                {games.map(game => (
                  <MenuItem value={game.id}>{game.name}</MenuItem>
                ))}
              </Select>
              <Typography variant="body1">
                Selecione o jogo para disponibilizar os usuários
              </Typography>
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

ActionUserDetails.propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ActionUserDetails);

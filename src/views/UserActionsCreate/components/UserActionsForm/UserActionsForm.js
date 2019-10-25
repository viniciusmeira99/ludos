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
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';
import Context from 'Context';
import api from 'api';
import { BackButton } from 'components';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(() => ({
  root: {}
}));

const UserActionsForm = props => {
  const { history } = props;
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const { user: { companyId } } = useContext(Context);
  const [games, setGames] = useState([]);
  const [actions, setActions] = useState([]);
  const [users, setUsers] = useState([]);

  const [values, setValues] = useState({});

  useEffect(() => {
    api
      .get('/games', {
        params: { companyId },
      })
      .then(response => setGames(response.data));

    api
      .get('/actions', {
        params: { companyId },
      })
      .then(response => setActions(response.data));
  }, [companyId]);

  useEffect(() => {
    if (values.gameId) {
      api.get(`/users/${values.gameId}/game`)
        .then(response => setUsers(response.data))
    } else {
      setUsers([]);
    }
  }, [values.gameId]);

  const handleChange = event => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value
    };
    setValues(newValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/user-actions', {
      ...values,
      companyId,
    })
      .then(() => {
        setValues({});
        enqueueSnackbar('Ação lançada!', { variant: 'success', });
        history.goBack();
      });
  };

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
                name="actionId"
                onChange={handleChange}
                required
                type="string"
                value={values.actionId || ''}
                variant="outlined"
              >
                {actions.map(action => (
                  <MenuItem value={action.id}>{action.name}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Select
                fullWidth
                label="Nível"
                margin="dense"
                name="gameId"
                onChange={handleChange}
                required
                type="string"
                value={values.gameId || ''}
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
              <Select
                fullWidth
                label="Nível"
                margin="dense"
                name="userId"
                onChange={handleChange}
                required
                type="string"
                value={values.userId || ''}
                variant="outlined"
              >
                {users.map(user => (
                  <MenuItem value={user.id}>{user.name}</MenuItem>
                ))}
              </Select>
              <Typography variant="body1">
                Selecione o jogo para disponibilizar os usuários
              </Typography>
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
            Lançar ação
          </Button>
          <BackButton />
        </CardActions>
      </form>
    </Card>
  );
};

UserActionsForm.propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(UserActionsForm);

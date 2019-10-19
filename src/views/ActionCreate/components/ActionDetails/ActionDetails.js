import React, { useState, useEffect, useContext } from 'react';
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
  Select,
  MenuItem,
  Typography
} from '@material-ui/core';
import Context from 'Context';
import api from 'api';
import { BackButton } from 'components';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(() => ({
  root: {}
}));


const ActionDetails = props => {
  const { history } = props;
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const { user } = useContext(Context);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const [userGames, setGames] = useState([]);

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

  useEffect(() => {
    api.get('/games', {
      params: { companyId: user.company.id },
    })
      .then(response => setGames(response.data))
  }, [user.company.id]);

  return (
    <Card className={classes.root}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <CardHeader
          subheader="Digite os dados da nova ação"
          title="Cadastro de ação"
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
                error={!!errors && errors.name}
                fullWidth
                helperText={errors && errors.name && errors.name[0]}
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
                error={!!errors && errors.description}
                fullWidth
                helperText={errors && errors.description && errors.description[0]}
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
              xs={12}
            >
              <TextField
                error={!!errors && errors.identifier}
                fullWidth
                helperText={errors && errors.identifier && errors.identifier[0]}
                label="Identificador"
                margin="dense"
                name="identifier"
                onChange={handleChange}
                value={values.identifier || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              <TextField
                error={!!errors && errors.points}
                fullWidth
                helperText={errors && errors.points && errors.points[0]}
                label="Pontuação"
                margin="dense"
                name="points"
                onChange={handleChange}
                required
                value={values.points || ''}
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
            Criar ação
          </Button>
          <BackButton />
        </CardActions>
      </form>
    </Card>
  );
};

ActionDetails.propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ActionDetails);

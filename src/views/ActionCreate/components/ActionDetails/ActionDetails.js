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

  const hasError = name => Boolean(errors[name]);
  const getError = name => hasError(name) ? errors[name][0] : '';

  const handleChange = event => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value
    };

    setValues(newValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/action', {
      ...values,
      companyId: user.companyId,
    })
      .then(() => {
        setValues({});
        enqueueSnackbar('Ação cadastrada', { variant: 'success', });
        history.goBack();
      }).catch((err) => {
        if (err.response.data.errors) {
          setErrors(err.response.data.errors);
        }
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
              xs={12}
            >
              <TextField
                error={hasError('identifier')}
                fullWidth
                helperText={getError('identifier')}
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
                error={hasError('points')}
                fullWidth
                helperText={getError('points')}
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

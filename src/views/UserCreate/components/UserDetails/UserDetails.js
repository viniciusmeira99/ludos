import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
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
  Typography,
} from '@material-ui/core';
import { Context } from 'context';
import api from 'api';
import { LEVEL_ADMIN, LEVEL_USER, ADMIN_PRIVILEGES_TEXT, USER_PRIVILEGES_TEXT } from 'consts';
import { BackButton } from 'components';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(() => ({
  root: {}
}));

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'Nome é obrigatório' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'E-mail é obrigatório' },
    email: { message: 'Não é um email válido' },
    length: {
      maximum: 64
    }
  },
  phone: {
    phone: { message: 'Telefone inválido' },
    length: {
      minimun: 10,
      maximum: 11,
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'A senha é obrigatória' },
    length: {
      minimun: 8,
      maximum: 128,
    }
  },
  confirmPassword: {
    presence: { allowEmpty: false, message: 'A confirmação da senha é obrigatória' },
    equality: 'password',
    length: {
      minimun: 8,
      maximum: 128
    }
  },
  level: {
    presence: { allowEmpty: false, message: 'A senha é obrigatória' },
    inclusion: [LEVEL_ADMIN, LEVEL_USER],
  },
};

const UserDetails = props => {
  const { history } = props;
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const { user } = useContext(Context);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({ level: LEVEL_USER });

  const handleChange = event => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value
    };

    setValues(newValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(values, schema);
    setErrors(errors);
    if (errors) {
      return;
    }
    api.post('/users', {
      ...values,
      company: user.company.name,
    })
      .then(() => {
        setValues({ level: LEVEL_USER });
        enqueueSnackbar('Usuário cadastrado', { variant: 'success',  });
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
          subheader="Digite os dados do novo usuário  "
          title="Cadastro de usuário"
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
                error={!!errors && errors.email}
                fullWidth
                helperText={errors && errors.email && errors.email[0]}
                label="E-mail"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={!!errors && errors.phone}
                fullWidth
                helperText={errors && errors.phone && errors.phone[0]}
                label="Telefone"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="string"
                value={values.phone || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Select
                fullWidth
                label="Nível"
                margin="dense"
                name="level"
                onChange={handleChange}
                required
                type="string"
                value={values.level || ''}
                variant="outlined"
              >
                <MenuItem value={LEVEL_USER}>Usuário</MenuItem>
                <MenuItem value={LEVEL_ADMIN}>Administrador</MenuItem>
              </Select>
              <Typography variant="body1">
                {values.level === LEVEL_ADMIN ? ADMIN_PRIVILEGES_TEXT : USER_PRIVILEGES_TEXT}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={!!errors && errors.password}
                fullWidth
                helperText={errors && errors.password && errors.password[0]}
                label="Senha"
                margin="dense"
                name="password"
                onChange={handleChange}
                required
                type="password"
                value={values.password || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={!!errors && errors.confirmPassword}
                fullWidth
                helperText={errors && errors.confirmPassword && errors.confirmPassword[0]}
                label="Confirme a senha do usuário"
                margin="dense"
                name="confirmPassword"
                onChange={handleChange}
                required
                type="password"
                value={values.confirmPassword || ''}
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
            Criar usuário
          </Button>
          <BackButton />
        </CardActions>
      </form>
    </Card>
  );
};

UserDetails.propTypes = {
  className: PropTypes.string,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(UserDetails);
